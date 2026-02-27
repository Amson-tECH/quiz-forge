import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from './env.js'

if (!env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY missing. /api/generate-quiz will fail until configured.')
}

const client = new GoogleGenerativeAI(env.GEMINI_API_KEY || '')

export const geminiModel = client.getGenerativeModel({
  model: env.GEMINI_MODEL,
})