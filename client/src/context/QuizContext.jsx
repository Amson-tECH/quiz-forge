import { createContext, useContext, useMemo, useState } from 'react'

const QuizContext = createContext(null)

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null)
  const [settings, setSettings] = useState(null)
  const [answers, setAnswers] = useState([])
  const [results, setResults] = useState(null)

  const startQuiz = ({ quizData, quizSettings }) => {
    setQuiz(quizData)
    setSettings(quizSettings)
    setAnswers([])
    setResults(null)
  }

  const recordAnswer = (payload) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[payload.questionIndex] = payload
      return next
    })
  }

  const finalizeQuiz = (overrideAnswers) => {
    if (!quiz) return null

    const sourceAnswers = Array.isArray(overrideAnswers) ? overrideAnswers : answers
    if (Array.isArray(overrideAnswers)) {
      setAnswers(overrideAnswers)
    }

    const correct = sourceAnswers.filter((item) => item?.isCorrect).length
    const total = quiz.questions.length
    const incorrect = total - correct
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

    const nextResults = { correct, incorrect, total, percentage }
    setResults(nextResults)
    return nextResults
  }

  const resetQuiz = () => {
    setQuiz(null)
    setSettings(null)
    setAnswers([])
    setResults(null)
  }

  const value = useMemo(
    () => ({
      quiz,
      settings,
      answers,
      results,
      startQuiz,
      recordAnswer,
      finalizeQuiz,
      resetQuiz,
    }),
    [quiz, settings, answers, results],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used inside QuizProvider')
  }
  return context
}
