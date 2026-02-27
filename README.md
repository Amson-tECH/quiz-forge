# QuizForge

QuizForge is a fullstack quiz generation platform that turns slide text or PDF content into interactive quizzes using Gemini.

## Tech Stack

### Frontend (`client/`)
- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend (`server/`)
- Node.js
- Express.js
- Gemini API (`@google/generative-ai`)
- dotenv
- CORS
- body-parser
- multer (file upload)
- pdf-parse (PDF text extraction)

## Architecture

```text
quizforge/
  client/
    src/
      components/
      context/
      pages/
      services/
      utils/
  server/
    config/
    controllers/
    routes/
    services/
    utils/
    data/
    app.js
    server.js
```

## Features

- No-auth workflow
- Paste slide content or upload PDF
- Difficulty selection: Easy / Medium / Hard
- Question type: Objective (MCQ) or Theory
- Question count with server-side max validation (`<= 20`)
- Optional timer per question
- Built-in Java quiz endpoint and one-click launch button
- AI quiz generation using Gemini with strict JSON response template
- Question and option shuffling
- Animated quiz flow, timers, progress bar, and result reveal
- Score breakdown, answer review, retry flow
- Confetti for high scores

## API Endpoints

### `POST /api/generate-quiz`
Request:

```json
{
  "content": "string",
  "difficulty": "easy|medium|hard",
  "questionType": "objective|theory",
  "questionCount": 10,
  "timerPerQuestion": 30
}
```

Response (shape):

```json
{
  "title": "Generated Quiz",
  "questionType": "objective",
  "difficulty": "medium",
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "..."
    }
  ]
}
```

### `GET /api/builtin/java`
Returns a static Java quiz set (shuffled questions/options).

### `POST /api/extract-pdf`
Multipart form-data with `file` (PDF). Returns extracted text.

## Environment Setup

### Server
1. Copy:
   - `server/.env.example` -> `server/.env`
2. Set your Gemini key:
   - `GEMINI_API_KEY=your_real_key`
3. Optional:
   - `GEMINI_MODEL=gemini-1.5-flash`

### Client
1. Copy:
   - `client/.env.example` -> `client/.env`
2. Configure API base URL if needed:
   - `VITE_API_URL=http://localhost:5000/api`

## Install & Run

From project root:

```bash
npm install
npm --prefix server install
npm --prefix client install
npm run dev
```

This runs:
- server on `http://localhost:5000`
- client on `http://localhost:5173`

## Production

Build frontend:

```bash
npm run build
```

Run backend:

```bash
npm run start
```

## Gemini Prompt Integration Example

Prompt logic is in:
- `server/services/promptService.js`

Gemini call + parsing flow is in:
- `server/services/geminiService.js`
- `server/utils/jsonParser.js`
- `server/services/quizService.js`

The backend enforces schema and validates question constraints before returning data to the client.