import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar.jsx'
import { useQuiz } from '../context/QuizContext.jsx'
import { evaluateAnswer, formatSeconds } from '../utils/quiz.js'

const QuizPage = () => {
  const navigate = useNavigate()
  const { quiz, settings, answers, recordAnswer, finalizeQuiz } = useQuiz()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [theoryAnswer, setTheoryAnswer] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(settings?.timerPerQuestion || 0)

  const question = quiz?.questions[currentIndex]
  const total = quiz?.questions.length || 0
  const isObjective = settings?.questionType === 'objective'

  const hasAnswer = isObjective ? Boolean(selectedOption) : theoryAnswer.trim().length > 0

  useEffect(() => {
    if (!settings?.timeBound) return undefined
    setSecondsLeft(settings.timerPerQuestion)
  }, [currentIndex, settings?.timeBound, settings?.timerPerQuestion])

  useEffect(() => {
    if (!settings?.timeBound || !secondsLeft) return undefined

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft, settings?.timeBound])

  useEffect(() => {
    if (!settings?.timeBound || secondsLeft !== 0 || !question) return
    // Auto-submit blank answer when timer expires.
    handleSubmitCurrentAnswer('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, settings?.timeBound, question])

  const progress = useMemo(() => {
    if (!total) return 0
    return ((currentIndex + 1) / total) * 100
  }, [currentIndex, total])

  if (!quiz || !settings) {
    return <Navigate to="/setup" replace />
  }

  const handleSubmitCurrentAnswer = (forcedAnswer) => {
    const userAnswer = forcedAnswer !== undefined ? forcedAnswer : isObjective ? selectedOption : theoryAnswer
    const { isCorrect } = evaluateAnswer(question, userAnswer)

    const payload = {
      questionIndex: currentIndex,
      question,
      userAnswer,
      isCorrect,
    }

    const nextAnswers = [...answers]
    nextAnswers[currentIndex] = payload
    recordAnswer(payload)

    const isLast = currentIndex === total - 1
    if (isLast) {
      finalizeQuiz(nextAnswers)
      navigate('/results')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedOption('')
    setTheoryAnswer('')
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
        <span>
          Question {currentIndex + 1} of {total}
        </span>
        {settings.timeBound && <span className="font-semibold text-cyan-300">{formatSeconds(secondsLeft)}</span>}
      </div>

      <ProgressBar progress={progress} />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
          className="glass space-y-5 p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold text-cyan-100 sm:text-2xl">{question.question}</h2>

          {isObjective ? (
            <div className="grid gap-3">
              {question.options.map((option) => {
                const active = option === selectedOption
                return (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-neon'
                        : 'border-indigo-300/25 bg-slate-900/50 text-slate-200'
                    }`}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <textarea
              rows={8}
              value={theoryAnswer}
              onChange={(event) => setTheoryAnswer(event.target.value)}
              placeholder="Write your answer..."
              className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-4 outline-none focus:border-cyan-300"
            />
          )}

          <button
            type="button"
            disabled={!hasAnswer}
            onClick={() => handleSubmitCurrentAnswer()}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            {currentIndex === total - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default QuizPage
