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
            <li>Pin the extension by clicking the puzzle piece icon in Chrome toolbar and clicking the pin icon</li>
          </ol>
          
          <img 
            src="/pin-extension.png" 
            alt="Pin Extension" 
            className="rounded-lg border border-neutral-200 my-4 max-w-md max-h-96"
          />
          <Alert className="mt-4 bg-blue-50">
            <AlertDescription>
              Make sure the extension is properly installed and pinned for easy access
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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Case: For problems you have solved before</h2>
          <Alert className="mt-4 bg-red-100">
            <AlertDescription>
              If your submission don't appear on Recent Submissions Sections on your profile 
            </AlertDescription>
          </Alert>
          <ol className="list-decimal list-inside space-y-3 text-neutral-600">
            <li>Submit the old solution again</li>
            <li>Click "Submit" to resubmit your solution</li>
            <li>After successful submission, click "Mark as Solved"</li>
            <li>Your submission will appear on the dashboard</li>
          </ol>

            <>
            <img 
              src="/problem.png" 
              alt="Problem Page" 
              className="rounded-lg border border-neutral-200 my-4 max-w-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={(_e) => {
              const modal = document.createElement('div');
              modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
              modal.onclick = () => document.body.removeChild(modal);
              
              const img = document.createElement('img');
              img.src = '/problem.png';
              img.className = 'max-w-[90vw] max-h-[90vh] object-contain';
              
              modal.appendChild(img);
              document.body.appendChild(modal);
              }}
            />
            </>

            <Alert className="mt-4 bg-red-100">
            <AlertDescription>
              All the submissions will submitted from problem page
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