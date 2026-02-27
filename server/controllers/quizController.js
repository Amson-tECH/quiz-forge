import { generateQuizFromContent } from '../services/geminiService.js'
import { getBuiltInJavaQuiz } from '../services/builtinQuizService.js'
import { extractTextFromPdfBuffer } from '../utils/pdfExtractor.js'
import { validateQuizGenerationRequest } from '../utils/validators.js'

export const generateQuizController = async (req, res, next) => {
  try {
    const payload = validateQuizGenerationRequest(req.body)
    const quiz = await generateQuizFromContent(payload)
    res.json(quiz)
  } catch (error) {
    next(error)
  }
}

export const getBuiltinJavaQuizController = (_req, res) => {
  const quiz = getBuiltInJavaQuiz()
  res.json(quiz)
}

export const extractPdfController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded.' })
    }

    const text = await extractTextFromPdfBuffer(req.file.buffer)
    if (!text.trim()) {
      return res.status(422).json({ error: 'Could not extract readable text from this PDF.' })
    }

    res.json({ text })
  } catch (error) {
    next(error)
  }
}