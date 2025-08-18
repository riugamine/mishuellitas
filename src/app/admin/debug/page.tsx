/**
 * Simple debug page to test middleware protection
 * This should be blocked by middleware if no session exists
 */
export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔒 Protected Debug Page</h1>
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
        <p className="text-green-800 dark:text-green-200">
          ✅ If you can see this page, you have a valid session!
        </p>
        <p className="text-green-700 dark:text-green-300 mt-2">
          This page should only be accessible through the middleware protection.
        </p>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Route: /admin/debug</p>
        <p>Should be protected by middleware</p>
      </div>
    </div>
  )
}
