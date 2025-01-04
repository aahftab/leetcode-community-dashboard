import { Card } from "@/components/ui/card"
import * as SimpleIcons from 'simple-icons'

export default function Footer() {
  return (
    <Card className="w-full mt-4 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500 gap-4">
        <div className="flex items-baseline space-x-2">
          <span>© {new Date().getFullYear()} LeetCode Community Dashboard</span>
          <span className="hidden md:inline">•</span>
          <span>Made with ❤️ by 
            <a 
              href="https://github.com/aahftab"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-neutral-700 hover:text-neutral-900 font-medium inline-flex items-baseline"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-4 w-4 mr-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={SimpleIcons.siGithub.path} />
              </svg>
              aahftab
            </a>
          </span>
        </div>
        <div className="flex space-x-4">
          <a 
            href="https://github.com/aahftab/leetcode-community-dashboard" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-600 transition-colors inline-flex items-center"
          >
            <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-4 w-4 mr-1 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={SimpleIcons.siGithub.path} />
              </svg>
            Source
          </a>
        </div>
      </div>
    </Card>
  )
}