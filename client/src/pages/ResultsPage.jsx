import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext.jsx'

const circleRadius = 56
const circleLength = 2 * Math.PI * circleRadius

const ResultsPage = () => {
  const navigate = useNavigate()
  const { quiz, answers, results, resetQuiz } = useQuiz()

  useEffect(() => {
    if (!results) return
    if (results.percentage >= 80) {
      confetti({
        particleCount: 140,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [results])

  if (!results || !quiz) {
    return <Navigate to="/" replace />
  }

  const dashOffset = circleLength - (results.percentage / 100) * circleLength

  return (
    <section className="mx-auto mt-10 max-w-4xl space-y-6">
      <div className="glass p-6 text-center sm:p-8">
        <h2 className="font-display text-3xl font-bold text-cyan-100">Your Results</h2>

        <div className="relative mx-auto mt-8 flex w-fit items-center justify-center">
          <svg width="140" height="140" className="-rotate-90">
            <circle cx="70" cy="70" r={circleRadius} stroke="rgba(148, 163, 184, 0.3)" strokeWidth="12" fill="none" />
            <motion.circle
              cx="70"
              cy="70"
              r={circleRadius}
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circleLength}
              initial={{ strokeDashoffset: circleLength }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7d6bff" />
                <stop offset="100%" stopColor="#3dd8ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-2xl font-bold text-white">{results.percentage}%</div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-200">Correct</p>
            <p className="text-2xl font-bold">{results.correct}</p>
          </div>
          <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4">
            <p className="text-sm text-rose-200">Incorrect</p>
            <p className="text-2xl font-bold">{results.incorrect}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-4">
            <p className="text-sm text-cyan-200">Total</p>
            <p className="text-2xl font-bold">{results.total}</p>
          </div>
        </div>
      </div>

      <div className="glass p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-cyan-100">Review Answers</h3>
        <div className="mt-4 space-y-4">
          {answers.map((entry, index) => (
            <article
              key={`${entry?.question?.id || 'missing'}-${index}`}
              className={`rounded-2xl border p-4 ${
                entry?.isCorrect
                  ? 'border-emerald-300/35 bg-emerald-500/10'
                  : 'border-rose-300/35 bg-rose-500/10'
              }`}
            >
              <p className="font-medium text-slate-100">Q{index + 1}. {entry?.question?.question}</p>
              <p className="mt-2 text-sm text-slate-200">Your answer: {entry?.userAnswer || 'No answer'}</p>
              <p className="mt-1 text-sm text-cyan-200">Correct answer: {entry?.question?.correctAnswer}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => navigate('/setup')}
          className="rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 py-3 font-semibold"
        >
          Retry
        </button>
        <button
          onClick={() => {
            resetQuiz()
            navigate('/')
          }}
          className="rounded-2xl border border-cyan-300/35 bg-slate-950/40 px-6 py-3 font-semibold text-cyan-100"
        >
          Back Home
        </button>
      </div>
    </section>
  )
}

export default ResultsPage
