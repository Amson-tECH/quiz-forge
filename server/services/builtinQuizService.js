import { builtInJavaQuiz } from '../data/javaQuiz.js'
import { shuffleArray } from '../utils/shuffle.js'

export const getBuiltInJavaQuiz = () => {
  const questions = shuffleArray(builtInJavaQuiz.questions).map((q, index) => ({
    ...q,
    id: index + 1,
    options: shuffleArray(q.options),
  }))

  return {
    ...builtInJavaQuiz,
    questions,
  }
}