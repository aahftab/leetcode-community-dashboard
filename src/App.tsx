import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Dashboard from "@/components/Dashboard"
import GetStarted from "@/components/GetStarted"
import { Card } from "@/components/ui/card"

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'getStarted'>('dashboard')

  return (
    <div className="min-h-screen p-4 bg-neutral-50">
      <div className="container mx-auto">
        <Header />
        <Card className="w-full mb-4 px-6 py-2">
          <nav className="flex space-x-4">
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className={`px-3 py-2 rounded-md ${
                currentPage === 'dashboard' 
                  ? 'bg-neutral-200 font-medium' 
                  : 'hover:bg-neutral-100'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentPage('getStarted')}
              className={`px-3 py-2 rounded-md ${
                currentPage === 'getStarted' 
                  ? 'bg-neutral-200 font-medium' 
                  : 'hover:bg-neutral-100'
              }`}
            >
              Get Started
            </button>
          </nav>
        </Card>
        {currentPage === 'dashboard' ? <Dashboard /> : <GetStarted />}
        <Footer />
      </div>
    </div>
  )
}

export default App

