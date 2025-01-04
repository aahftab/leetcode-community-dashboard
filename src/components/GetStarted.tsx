import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GetStarted() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Get Started with LeetCode Community Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Install Chrome Extension</h2>
          <ol className="list-decimal list-inside space-y-3 text-neutral-600">
            <li>Download the extension from <a 
              href="https://github.com/aahftab/leetcode-chrome-extension/releases" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Releases
            </a></li>
            <li>Unzip the downloaded file</li>
            <li>Open Chrome and navigate to <code className="bg-neutral-100 px-2 py-1 rounded">chrome://extensions</code></li>
            <li>Enable "Developer mode" in the top right corner</li>
            <li>Click "Load unpacked" and select the unzipped extension folder</li>
            <li>The extension icon should appear in your Chrome toolbar</li>
          </ol>
          
          <Alert className="mt-4 bg-blue-50">
            <AlertDescription>
              Make sure the extension is properly installed by checking for the icon in your Chrome toolbar
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Using the Dashboard</h2>
          <ol className="list-decimal list-inside space-y-3 text-neutral-600">
            <li>Go to Dashboard</li>
            <li>Solve the daily problem</li>
            <li>After successful submission, click the "Mark as Solved" button added by our extension</li>
            <li>Visit our dashboard to see your submission along with your community</li>
          </ol>

          <Alert className="mt-4 bg-green-50">
            <AlertDescription>
              Your submission will automatically appear on the dashboard once you click "Mark as Solved"
            </AlertDescription>
          </Alert>
        </section>

        <section className="mt-6 pt-6 border-t">
          <p className="text-sm text-neutral-500">
            Having issues? Contact us on{' '}
            <a 
              href="https://github.com/aahftab/leetcode-community-dashboard/issues" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </section>
      </CardContent>
    </Card>
  )
}