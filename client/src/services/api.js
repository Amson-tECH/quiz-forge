import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const generateQuiz = async (payload) => {
  const { data } = await api.post('/generate-quiz', payload)
  return data
}

export const fetchBuiltInJavaQuiz = async () => {
  const { data } = await api.get('/builtin/java')
  return data
}

export const extractPdfText = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post('/extract-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data.text
}