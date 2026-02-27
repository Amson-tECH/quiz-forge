import { motion } from 'framer-motion'

const ProgressBar = ({ progress }) => {
  return (
    <div className="glass p-3">
      <div className="h-2 w-full rounded-full bg-slate-800/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default ProgressBar