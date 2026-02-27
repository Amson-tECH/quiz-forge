const allowedDifficulties = new Set(['easy', 'medium', 'hard'])
const allowedTypes = new Set(['objective', 'theory'])

export const validateQuizGenerationRequest = (body) => {
  const content = String(body.content || '')
  const difficulty = String(body.difficulty || '').toLowerCase()
  const questionType = String(body.questionType || '').toLowerCase()
  const questionCount = Number(body.questionCount)
  const timerPerQuestion = body.timerPerQuestion === undefined ? undefined : Number(body.timerPerQuestion)

  if (!content.trim()) {
    const error = new Error('content is required.')
    error.statusCode = 400
    throw error
  }

  if (!allowedDifficulties.has(difficulty)) {
    const error = new Error('difficulty must be easy, medium, or hard.')
    error.statusCode = 400
    throw error
  }

  if (!allowedTypes.has(questionType)) {
    const error = new Error('questionType must be objective or theory.')
    error.statusCode = 400
    throw error
  }

  if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 20) {
    const error = new Error('questionCount must be an integer between 1 and 20.')
    error.statusCode = 400
    throw error
  }

  if (
    timerPerQuestion !== undefined &&
    (!Number.isInteger(timerPerQuestion) || timerPerQuestion < 5 || timerPerQuestion > 600)
  ) {
    const error = new Error('timerPerQuestion must be an integer between 5 and 600 seconds.')
    error.statusCode = 400
    throw error
  }

  return {
    content,
    difficulty,
    questionType,
    questionCount,
    timerPerQuestion,
  }
}