import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Dashboard from "@/pages/Dashboard"
import GetStarted from "@/pages/GetStarted"
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import ContestsPage from './pages/ContestsPage'
import ContestResultsPage from './pages/ContestResultsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm mb-8">
            <div className="flex space-x-1 p-2">
              <NavLink 
                to="/"
                className={({ isActive }) => `px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500 text-white font-medium shadow-md' 
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                Dashboard
              </NavLink>
              
              <NavLink 
                to="/contests"
                className={({ isActive }) => `px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500 text-white font-medium shadow-md' 
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                Contests
              </NavLink>
              
              <NavLink 
                to="/get-started"
                className={({ isActive }) => `px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500 text-white font-medium shadow-md' 
                    : 'text-gray-600 hover:bg-indigo-50'
                }`}
              >
                Get Started
              </NavLink>
            </div>
          </nav>

          <main className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-sm p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/contests" element={<ContestsPage />} />
              <Route path="/contests/:contestId" element={<ContestResultsPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App

