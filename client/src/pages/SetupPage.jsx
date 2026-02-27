import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LoadingAI from '../components/LoadingAI.jsx'
import { generateQuiz, extractPdfText } from '../services/api.js'
import { useQuiz } from '../context/QuizContext.jsx'

const SetupPage = () => {
  const navigate = useNavigate()
  const { startQuiz } = useQuiz()

  const [content, setContent] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [questionType, setQuestionType] = useState('objective')
  const [questionCount, setQuestionCount] = useState(10)
  const [timeBound, setTimeBound] = useState(false)
  const [timerPerQuestion, setTimerPerQuestion] = useState(30)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const maxQuestionCount = 20

  const isDisabled = useMemo(() => {
    if (!content.trim()) return true
    if (loading || uploading) return true
    if (timeBound && timerPerQuestion < 5) return true
    return false
  }, [content, loading, uploading, timeBound, timerPerQuestion])

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError('')
      const text = await extractPdfText(file)
      setContent(text)
    } catch (uploadError) {
      setError(uploadError?.response?.data?.error || 'Failed to extract text from PDF.')
    } finally {
      setUploading(false)
    }
  }

  const handleGenerateQuiz = async () => {
    try {
      setLoading(true)
      setError('')

      const payload = {
        content,
        difficulty,
        questionType,
        questionCount: Number(questionCount),
        ...(timeBound ? { timerPerQuestion: Number(timerPerQuestion) } : {}),
      }

      const quiz = await generateQuiz(payload)
      startQuiz({
        quizData: quiz,
        quizSettings: {
          ...payload,
          timeBound,
        },
      })
      navigate('/quiz')
    } catch (generateError) {
      setError(generateError?.response?.data?.error || 'Quiz generation failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl">
      <h2 className="font-display text-3xl font-bold text-cyan-100">Quiz Setup</h2>

      <div className="glass mt-6 space-y-6 p-6 sm:p-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Paste slide content</label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
            placeholder="Paste your lecture slides, notes, or transcript..."
            className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-4 text-slate-100 outline-none transition focus:border-cyan-300"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Or upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="block w-full cursor-pointer rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-3 text-sm"
          />
          {uploading && <p className="mt-2 text-sm text-cyan-200">Extracting text from PDF...</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-3"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Question Type</label>
            <select
              value={questionType}
              onChange={(event) => setQuestionType(event.target.value)}
              className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-3"
            >
              <option value="objective">Objective (MCQ)</option>
              <option value="theory">Theory (Long Answer)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Number of Questions (max 20)</label>
            <input
              type="number"
              min={1}
              max={maxQuestionCount}
              value={questionCount}
              onChange={(event) => setQuestionCount(Math.min(maxQuestionCount, Number(event.target.value) || 1))}
              className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-3"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4">
          <label className="flex items-center justify-between gap-4">
            <span className="font-medium text-slate-200">Time bound quiz?</span>
            <input
              type="checkbox"
              checked={timeBound}
              onChange={(event) => setTimeBound(event.target.checked)}
              className="h-5 w-5 accent-cyan-400"
            />
          </label>

          {timeBound && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <label className="mb-2 block text-sm text-slate-300">Timer per question (seconds)</label>
              <input
                type="number"
                min={5}
                value={timerPerQuestion}
                onChange={(event) => setTimerPerQuestion(Number(event.target.value) || 5)}
                className="w-full rounded-2xl border border-indigo-300/25 bg-slate-950/50 p-3 sm:w-56"
              />
            </motion.div>
          )}
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isDisabled}
          onClick={handleGenerateQuiz}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Generate Quiz
        </motion.button>
      </div>

      {loading && (
        <div className="mt-6">
          <LoadingAI />
        </div>
      )}
    </section>
  )
}

export default SetupPage