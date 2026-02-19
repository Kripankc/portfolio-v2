# Troubleshooting Log - Build Errors (Feb 2026)

This document records the issues encountered during the build process and their resolutions.

## 1. JSON Parsing Error in `education.json`

**Issue:**
The build failed with a JSON parsing error. Upon inspection, `data/education.json` was found to be truncated, missing closing brackets for the last object and the array itself.

**Resolution:**
Manually corrected the JSON structure by adding the missing closing brackets.

## 2. `TypeError: G.map is not a function`

**Issue:**
The build failed with `TypeError: G.map is not a function` when processing `skills.json` in `app/page.tsx`.
- `skills.json` structure: An object `{ "categories": [...] }`.
- `app/page.tsx` code: Assumed `skillsData` was directly an array and called `.map()` on it.

**Resolution:**
Updated `app/page.tsx` to correctly access the array via `skillsData.categories.map(...)`.

## 3. Git Lock File Issue

**Issue:**
Git commands (`commit`, `push`) were failing because of a stale index lock file (`.git/index.lock`), likely due to an interrupted git process.

**Resolution:**
Manually deleted the `.git/index.lock` file to unlock the repository.

## 4. Missing Icon Imports

**Issue:**
After modifications to `app/page.tsx`, some Lucide icon imports were accidentally removed, causing build errors.

**Resolution:**
Restored the necessary icon imports (`Menu`, `X`, `ChevronRight`, `ExternalLink`, `Github`, `Mail`, `MapPin`, `Calendar`, `Briefcase`, `GraduationCap`, `Code2`, `Database`, `Terminal`, `Globe`, `Cpu`, `Layers`, `GitBranch`).

## Best Practices for Future

- **Verify JSON Structure:** Ensure that data files match the expected structure in the code (array vs object).
- **Check All Imports:** When refactoring, ensure no necessary imports are removed.
- **Clear Stale Locks:** If git commands hang or fail with lock errors, check for `.git/index.lock`.
