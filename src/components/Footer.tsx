import { Card } from "@/components/ui/card"
import * as SimpleIcons from 'simple-icons'

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-lg border-t border-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} LeetCode Community Dashboard</span>
            <span className="hidden md:inline">•</span>
            <span>Made with ❤️ by 
              <a 
                href="https://github.com/aahftab"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-gray-700 hover:text-gray-900 font-medium inline-flex items-baseline"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1 fill-current">
                  <path d={SimpleIcons.siGithub.path} />
                </svg>
                aahftab
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}