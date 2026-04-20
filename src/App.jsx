import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './components/Home'
import Knowledge from './components/Knowledge'
import LiteratureReport from './components/LiteratureReport'
import ResearchDesign from './components/ResearchDesign'
import PolicyReport from './components/PolicyReport'
import LiteratureSearch from './components/LiteratureSearch'
import MyLibrary from './components/MyLibrary'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'knowledge':
        return <Knowledge />
      case 'literature':
        return <LiteratureReport />
      case 'research':
        return <ResearchDesign />
      case 'policy':
        return <PolicyReport />
      case 'search':
        return <LiteratureSearch />
      case 'library':
        return <MyLibrary />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
