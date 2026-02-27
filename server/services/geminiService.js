import { geminiModel } from '../config/gemini.js'
import { buildQuizPrompt } from './promptService.js'
import { parseQuizJson } from '../utils/jsonParser.js'
import { enforceQuizShape, shuffleQuiz } from './quizService.js'

export const generateQuizFromContent = async (payload) => {
  if (!payload.content || !payload.content.trim()) {
    const error = new Error('Quiz content is required.')
    error.statusCode = 400
    throw error
  }

  const prompt = buildQuizPrompt(payload)
  const result = await geminiModel.generateContent(prompt)
  const rawText = result.response.text()

  const parsed = parseQuizJson(rawText)
  const sanitized = enforceQuizShape(parsed, payload)
  return shuffleQuiz(sanitized)
}