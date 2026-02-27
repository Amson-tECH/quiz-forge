import { motion } from 'framer-motion'

const dotVariants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 0.9,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
}

const LoadingAI = () => {
  return (
    <div className="glass neon-border p-8 text-center">
      <p className="font-display text-xl text-cyan-200">QuizForge AI is building your quiz...</p>
      <div className="mt-5 flex justify-center gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            variants={dotVariants}
            animate="animate"
            transition={{ delay: dot * 0.16 }}
            className="h-3 w-3 rounded-full bg-cyan-300 shadow-neon"
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingAI