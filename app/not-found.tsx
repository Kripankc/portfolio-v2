import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <h1 className="text-3xl font-semibold text-stone-900">Page not found</h1>
      <p className="mt-3 text-stone-600">The page may have moved.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-stone-900 underline underline-offset-4">Back to the home page</Link>
    </div>
  );
}
