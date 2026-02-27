import { shuffleArray } from '../utils/shuffle.js'

const normalizeDifficulty = (difficulty) => {
  const normalized = String(difficulty || '').toLowerCase()
  if (['easy', 'medium', 'hard'].includes(normalized)) return normalized
  return 'medium'
}

const normalizeQuestionType = (questionType) => {
  const normalized = String(questionType || '').toLowerCase()
  if (normalized === 'objective' || normalized === 'theory') return normalized
  return 'objective'
}

export const enforceQuizShape = (parsed, payload) => {
  const questionType = normalizeQuestionType(payload.questionType)
  const difficulty = normalizeDifficulty(payload.difficulty)

  const questions = Array.isArray(parsed?.questions) ? parsed.questions : []
  if (questions.length === 0) {
    const error = new Error('AI did not return any questions.')
    error.statusCode = 502
    throw error
  }

  const limited = questions.slice(0, payload.questionCount).map((question, index) => {
    const normalizedQuestion = {
      id: index + 1,
      question: String(question.question || '').trim(),
      options: Array.isArray(question.options) ? question.options.map((o) => String(o)) : [],
      correctAnswer: String(question.correctAnswer || '').trim(),
      explanation: String(question.explanation || '').trim(),
    }

    if (!normalizedQuestion.question || !normalizedQuestion.correctAnswer) {
      const error = new Error('AI returned malformed question data.')
      error.statusCode = 502
      throw error
    }

    if (questionType === 'objective') {
      normalizedQuestion.options = normalizedQuestion.options.slice(0, 4)
      if (normalizedQuestion.options.length < 4) {
        const error = new Error('AI returned objective questions without 4 options.')
        error.statusCode = 502
        throw error
      }
      if (!normalizedQuestion.options.includes(normalizedQuestion.correctAnswer)) {
        normalizedQuestion.options[0] = normalizedQuestion.correctAnswer
      }
    } else {
      normalizedQuestion.options = []
    }

    return normalizedQuestion
  })

  return {
    title: String(parsed?.title || 'Generated Quiz'),
    questionType,
    difficulty,
    questions: limited,
  }
}

export const shuffleQuiz = (quiz) => {
  const shuffledQuestions = shuffleArray(quiz.questions).map((q, index) => ({
    ...q,
    id: index + 1,
    options: quiz.questionType === 'objective' ? shuffleArray(q.options) : [],
  }))

  return {
    ...quiz,
    questions: shuffledQuestions,
  }
}