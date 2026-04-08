import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
// We'll add more pages as we create them
import About from './components/pages/About'
import Consult from './components/pages/Consult'
import Contracts from './components/pages/Contracts'
import Calculators from './components/pages/Calculators'
import Lawyers from './components/pages/Lawyers'
import LatestUpdates from './components/pages/LatestUpdates'
import Terms from './components/pages/Terms'
import Simplify from './components/pages/Simplify'
import Library from './components/pages/Library'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <main style={{ paddingTop: 'var(--navbar-height)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/consult" element={<Consult />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/latest-updates" element={<LatestUpdates />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/simplify" element={<Simplify />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  )
}

export default App
