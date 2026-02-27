const normalize = (value) => String(value || '').trim().toLowerCase()

export const evaluateAnswer = (question, userAnswer) => {
  if (question.options?.length) {
    const isCorrect = normalize(userAnswer) === normalize(question.correctAnswer)
    return { isCorrect }
  }

  const target = normalize(question.correctAnswer)
  const candidate = normalize(userAnswer)

  if (!candidate) return { isCorrect: false }
  if (candidate.includes(target) || target.includes(candidate)) return { isCorrect: true }

  const targetTokens = new Set(target.split(/\s+/).filter(Boolean))
  const candidateTokens = candidate.split(/\s+/).filter(Boolean)
  const overlap = candidateTokens.filter((t) => targetTokens.has(t)).length
  const ratio = targetTokens.size ? overlap / targetTokens.size : 0

  return { isCorrect: ratio >= 0.45 }
}

export const formatSeconds = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}