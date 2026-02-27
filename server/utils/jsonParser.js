const parseQuizJson = (rawText) => {
  const text = String(rawText || '').trim()

  // Gemini occasionally wraps JSON in markdown fences; unwrap if present.
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i)
  const candidate = fencedMatch?.[1] || text

  // Extract the first valid-looking JSON object from the response text.
  const first = candidate.indexOf('{')
  const last = candidate.lastIndexOf('}')
  if (first === -1 || last === -1 || last <= first) {
    const error = new Error('Could not find JSON object in AI response.')
    error.statusCode = 502
    throw error
  }

  const objectText = candidate.slice(first, last + 1)

  try {
    return JSON.parse(objectText)
  } catch {
    const error = new Error('AI response JSON could not be parsed.')
    error.statusCode = 502
    throw error
  }
}

export { parseQuizJson }