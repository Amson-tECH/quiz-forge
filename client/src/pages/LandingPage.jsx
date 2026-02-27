import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fetchBuiltInJavaQuiz } from '../services/api.js'
import { useQuiz } from '../context/QuizContext.jsx'
import { useState } from 'react'

const LandingPage = () => {
  const navigate = useNavigate()
  const { startQuiz, resetQuiz } = useQuiz()
  const [loadingJava, setLoadingJava] = useState(false)

  const handleStartJavaQuiz = async () => {
    try {
      setLoadingJava(true)
      const quiz = await fetchBuiltInJavaQuiz()
      startQuiz({
        quizData: quiz,
        quizSettings: {
          content: 'Built-in Java quiz',
          difficulty: quiz.difficulty,
          questionType: quiz.questionType,
          questionCount: quiz.questions.length,
          timeBound: false,
        },
      })
      navigate('/quiz')
    } finally {
      setLoadingJava(false)
    }
  }

  return (
    <section className="relative pt-16 sm:pt-24">
      <div className="glass neon-border mx-auto max-w-4xl p-8 sm:p-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
        >
          QuizForge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mt-5 max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          Turn Your Slides Into Smart Interactive Quizzes
        </motion.p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-neon transition"
            onClick={() => {
              resetQuiz()
              navigate('/setup')
            }}
          >
            Start Building Quiz
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl border border-cyan-300/40 bg-slate-900/70 px-6 py-3 font-semibold text-cyan-200"
            onClick={handleStartJavaQuiz}
            disabled={loadingJava}
          >
            {loadingJava ? 'Loading Java Quiz...' : 'Start Java Quiz'}
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default LandingPage