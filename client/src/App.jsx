import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import SetupPage from './pages/SetupPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-8">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="/setup"
            element={
              <PageTransition>
                <SetupPage />
              </PageTransition>
            }
          />
          <Route
            path="/quiz"
            element={
              <PageTransition>
                <QuizPage />
              </PageTransition>
            }
          />
          <Route
            path="/results"
            element={
              <PageTransition>
                <ResultsPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App