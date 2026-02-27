export const buildQuizPrompt = ({ content, difficulty, questionType, questionCount }) => {
  return `You are QuizForge AI.
Create a ${difficulty} ${questionType} quiz from the provided slide text.

Rules:
1) Return strict JSON only. No markdown, no commentary.
2) questionType must be "${questionType}".
3) Generate exactly ${questionCount} questions.
4) Maximum questions is 20.
5) Keep each question clear and non-repetitive.
6) If questionType is "objective":
   - Include exactly 4 options per question.
   - Include one correctAnswer that matches one option exactly.
7) If questionType is "theory":
   - Use an empty options array [].
   - correctAnswer should be a concise ideal answer.

Required JSON shape:
{
  "title": "string",
  "questionType": "objective|theory",
  "difficulty": "easy|medium|hard",
  "questions": [
    {
      "id": 1,
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}

Slide content:
"""
${content}
"""`
}