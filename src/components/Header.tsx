import { Link } from 'react-router-dom'
import * as SimpleIcons from 'simple-icons'

export default function Header() {
  return (
    <header className="bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/CSSLeetcodeCommunity.png"
              alt="LeetCode Community Dashboard" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              LeetCode Community
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/aahftab/leetcode-community-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                <path d={SimpleIcons.siGithub.path} />
              </svg>
              Source
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}