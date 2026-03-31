# QuizForge

QuizForge is a fullstack AI quiz generation platform that converts slide text or PDF content into interactive quizzes using Google's Gemini API. Designed for learners, educators, and teams who want fast quiz creation without authentication.

## Tech Stack

### Frontend (`client/`)
- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- canvas-confetti

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
      pages/        # Route-level screens (Landing, Setup, Quiz, Results)
      context/      # Global quiz state management
      components/   # Reusable visual/UX components
      services/     # API integration layer (Axios)
      utils/        # Quiz evaluation and formatting helpers
  server/
    config/         # Environment and Gemini model configuration
    controllers/    # Request/response handlers
    routes/         # API route definitions
    services/       # Business logic (AI prompt, parsing, quiz shaping)
    utils/          # Helpers (validation, shuffle, PDF extract, JSON parsing)
    data/           # Built-in static datasets (Java quiz)
    app.js
    server.js
```

## Features

- No-auth workflow
- Paste slide content or upload PDF
- Difficulty selection: Easy / Medium / Hard
- Question type: Objective (MCQ) or Theory
- Question count with server-side max validation (`<= 20`)
- Optional timer per question (5–600 seconds)
- Built-in Java quiz endpoint and one-click launch button
- AI quiz generation using Gemini with strict JSON response template
- Question and option shuffling
- Animated quiz flow, timers, progress bar, and result reveal
- Score breakdown, answer review, retry flow
- Confetti for high scores

## User Flow

**Landing (`/`)** — Hero with "Start Building Quiz" and "Start Java Quiz" actions.

**Setup (`/setup`)** — Paste content or upload PDF → select difficulty, question type, count, and optional timer → generate quiz.

**Quiz (`/quiz`)** — One question at a time with progress bar. MCQ selection or text input for theory. Auto-submits at timer expiry if enabled.

**Results (`/results`)** — Score summary with percentage ring, correct/incorrect breakdown, full answer review, confetti for high scores, retry and back-home actions.

## API Endpoints

### `GET /api/health`
Returns `{ ok: true, service: "quizforge-api" }`.

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
Returns a static Java fundamentals quiz set (shuffled questions and options).

### `POST /api/extract-pdf`
Multipart form-data with `file` field (PDF). Returns `{ text: "...extracted content..." }`.

## Scoring

- **Objective mode** — strict answer equality (case-insensitive normalization).
- **Theory mode** — heuristic token overlap/contains strategy.
- Final result includes correct count, incorrect count, total, and percentage.

## Environment Setup

### Server (`server/.env`)

```env
NODE_ENV=development
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_real_key
GEMINI_MODEL=gemini-1.5-flash-preview
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

Copy the `.env.example` files in each directory and fill in the values.

## Install & Run

From the project root:

```bash
npm install
npm --prefix server install
npm --prefix client install
npm run dev
```

This runs:
- server on `http://localhost:5000`
- client on `http://localhost:5173`

Individual starts:

```bash
npm run dev:server
npm run dev:client
```

## Production

Build frontend:

```bash
npm run build
```

Run backend:

```bash
npm run start
```

## Gemini Integration

Prompt logic → `server/services/promptService.js`
Gemini call + parsing flow → `server/services/geminiService.js`, `server/utils/jsonParser.js`, `server/services/quizService.js`

The backend enforces schema and validates question constraints before returning data to the client. Invalid or malformed AI output is rejected with a 502-level error.

## Design System

Dark neon theme with glassmorphism cards, indigo/violet/cyan gradient accents, rounded shapes, and glow effects. Animations cover page transitions, question transitions, progress, loading states, and results reveal.

## Current Scope

- No authentication (by design)
- No database persistence (session-based usage)
- Quiz and results state live in frontend runtime state
