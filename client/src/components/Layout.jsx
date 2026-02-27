import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const Layout = () => {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div
      className={`mx-auto w-full max-w-6xl px-4 pt-3 sm:px-8 ${
        isLanding ? 'pb-0' : 'pb-12'
      }`}
    >
      <Navbar />
      <main className={isLanding ? 'pt-2' : 'pt-4'}>
        {/* <AnimatePresence mode="wait"> */}
          {/* <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="min-h-[calc(100vh-7rem)]"
          > */}
            <Outlet />
          {/* </motion.div> */}
        {/* </AnimatePresence> */}
      </main>
    </div>
  )
}

export default Layout
