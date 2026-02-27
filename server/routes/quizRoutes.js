import { Router } from 'express'
import multer from 'multer'
import {
  extractPdfController,
  generateQuizController,
  getBuiltinJavaQuizController,
} from '../controllers/quizController.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
})

const router = Router()

router.post('/generate-quiz', generateQuizController)
router.get('/builtin/java', getBuiltinJavaQuizController)
router.post('/extract-pdf', upload.single('file'), extractPdfController)

export default router