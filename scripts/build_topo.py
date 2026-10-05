"""
Build the hero background: contour lines of Nepal from a real elevation model.

Data
- Elevation: Copernicus DEM GLO-90 (ESA / Copernicus Programme), 90 m, read from the
  public AWS Open Data bucket (s3://copernicus-dem-90m, no key). The COG overviews
  are read at reduced resolution, so only a few MB are downloaded.
- Border: Natural Earth 1:10m admin-0 countries (public domain).

Output: public/data/nepal-topo.svg (contours, border, Kathmandu and Everest)

Run: python scripts/build_topo.py   (GitHub Action "Build Nepal topography")
"""
import io
import json
import math
import os
import zipfile

import numpy as np
import rasterio
import requests
import shapefile  # pyshp
from matplotlib.figure import Figure
from rasterio.enums import Resampling
from scipy.ndimage import gaussian_filter
from shapely.geometry import LineString, MultiLineString, shape
from shapely.ops import unary_union

LON0, LON1, LAT0, LAT1 = 80.0, 88.3, 26.3, 30.5
RES = 1 / 120            # 30 arc-seconds (~0.9 km): smooth lines, small file
INTERVAL = 500           # m
INDEX = 2000             # m, drawn darker
WIDTH = 1600             # SVG units
TILE = "https://copernicus-dem-90m.s3.amazonaws.com/Copernicus_DSM_COG_30_{ns}{lat:02d}_00_{ew}{lon:03d}_00_DEM/Copernicus_DSM_COG_30_{ns}{lat:02d}_00_{ew}{lon:03d}_00_DEM.tif"
NE_URL = "https://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_0_countries.zip"
PLACES = {"Kathmandu": (85.324, 27.717), "Everest": (86.925, 27.988)}
SOURCE = "Contours every 500 m (darker every 2000 m) from Copernicus DEM GLO-90 (ESA, Copernicus Programme), resampled to 30 arc-seconds. Border: Natural Earth 1:10m."

KX = math.cos(math.radians((LAT0 + LAT1) / 2))   # equirectangular, true scale at mid-latitude
HEIGHT = WIDTH * (LAT1 - LAT0) / ((LON1 - LON0) * KX)


def to_xy(lon, lat):
    return ((lon - LON0) / (LON1 - LON0) * WIDTH, (LAT1 - lat) / (LAT1 - LAT0) * HEIGHT)


def read_dem():
    ny = round((LAT1 - LAT0) / RES)
    nx = round((LON1 - LON0) / RES)
    dem = np.full((ny, nx), np.nan, dtype="float32")
    per = round(1 / RES)  # cells per 1-degree tile
    for lat in range(math.floor(LAT0), math.ceil(LAT1)):
        for lon in range(math.floor(LON0), math.ceil(LON1)):
            url = TILE.format(ns="N", lat=lat, ew="E", lon=lon)
            try:
                with rasterio.open(url) as src:
                    a = src.read(1, out_shape=(per, per), resampling=Resampling.average).astype("float32")
            except rasterio.errors.RasterioIOError:
                print("no tile", lat, lon)
                continue
            # place tile (rows north->south) into the grid
            r0 = round((LAT1 - (lat + 1)) / RES)
            c0 = round((lon - LON0) / RES)
            rs, cs = max(0, r0), max(0, c0)
            re, ce = min(ny, r0 + per), min(nx, c0 + per)
            if re > rs and ce > cs:
                dem[rs:re, cs:ce] = a[rs - r0:re - r0, cs - c0:ce - c0]
            print("tile", lat, lon)
    return dem


def nepal_border():
    z = zipfile.ZipFile(io.BytesIO(requests.get(NE_URL, timeout=120).content))
    base = [n[:-4] for n in z.namelist() if n.endswith(".shp")][0]
    r = shapefile.Reader(shp=io.BytesIO(z.read(base + ".shp")), dbf=io.BytesIO(z.read(base + ".dbf")), shx=io.BytesIO(z.read(base + ".shx")))
    fields = [f[0] for f in r.fields[1:]]
    for sr in r.iterShapeRecords():
        rec = dict(zip(fields, sr.record))
        if rec.get("ADM0_A3") == "NPL":
            return shape(sr.shape.__geo_interface__)
    raise SystemExit("Nepal not found in Natural Earth")


def path_d(lines, tol):
    out = []
    for ln in lines:
        ln = ln.simplify(tol)
        pts = [to_xy(x, y) for x, y in ln.coords]
        if len(pts) < 3:
            continue
        out.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts))
    return "".join(out)


def main():
    dem = read_dem()
    dem = np.where(np.isnan(dem), 0, dem)
    dem = gaussian_filter(dem, 1.2)
    lons = LON0 + (np.arange(dem.shape[1]) + 0.5) * RES
    lats = LAT1 - (np.arange(dem.shape[0]) + 0.5) * RES
    border = nepal_border()
    clip = border.buffer(0)

    fig = Figure()
    ax = fig.add_subplot()
    levels = list(range(INTERVAL, 9000, INTERVAL))
    cs = ax.contour(lons, lats, dem, levels=levels)
    out = []
    tol = RES * 0.8
    for z, segs in zip(levels, cs.allsegs):
        lines = [LineString(s) for s in segs if len(s) >= 4]
        if not lines:
            continue
        inside = MultiLineString(lines).intersection(clip)
        geoms = getattr(inside, "geoms", [inside])
        geoms = [g for g in geoms if isinstance(g, LineString) and g.length > RES * 6]
        d = path_d(geoms, tol)
        if d:
            out.append({"z": z, "d": d})
            print(z, len(geoms))

    poly = unary_union(clip)
    rings = [poly.exterior] if poly.geom_type == "Polygon" else [p.exterior for p in poly.geoms]
    border_d = "".join(path_d([LineString(r.coords)], tol) + "Z" for r in rings)
    W, H = WIDTH, round(HEIGHT, 1)
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke-linejoin="round" stroke-linecap="round">',
             f"<!-- {SOURCE} -->"]
    for lv in out:
        major = lv["z"] % INDEX == 0
        parts.append(f'<path d="{lv["d"]}" stroke="{"#78716c" if major else "#a8a29e"}" stroke-width="{1.1 if major else 0.6}" stroke-opacity="{0.75 if major else 0.55}"/>')
    parts.append(f'<path d="{border_d}" stroke="#57534e" stroke-width="1.4" stroke-opacity="0.5"/>')
    kx, ky = to_xy(*PLACES["Kathmandu"])
    ex, ey = to_xy(*PLACES["Everest"])
    font = 'font-family="Inter, system-ui, sans-serif" font-size="17" fill="#44403c" stroke="none"'
    parts.append(f'<circle cx="{kx:.1f}" cy="{ky:.1f}" r="5" fill="#047857" stroke="#fafaf9" stroke-width="2"/>')
    parts.append(f'<text x="{kx + 12:.1f}" y="{ky + 6:.1f}" {font}>Kathmandu</text>')
    parts.append(f'<path d="M{ex:.1f},{ey - 8:.1f}L{ex + 7:.1f},{ey + 5:.1f}L{ex - 7:.1f},{ey + 5:.1f}Z" fill="#292524" stroke="#fafaf9" stroke-width="1.5"/>')
    parts.append(f'<text x="{ex + 12:.1f}" y="{ey + 6:.1f}" {font}>Everest 8,849 m</text>')
    parts.append("</svg>")
    os.makedirs("public/data", exist_ok=True)
    with open("public/data/nepal-topo.svg", "w") as f:
        f.write("\n".join(parts))
    print("written", os.path.getsize("public/data/nepal-topo.svg") // 1024, "KB")


if __name__ == "__main__":
    main()
