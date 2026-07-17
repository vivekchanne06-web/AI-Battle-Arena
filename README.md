# ⚔️ AI Battle Arena

An AI-powered web application that compares responses from multiple Large Language Models (LLMs) and uses an AI Judge to determine the best answer.

The application generates answers from **Mistral AI** and **Cohere**, then uses **Google Gemini** as an intelligent evaluator to score both responses based on quality, correctness, and reasoning.

---

## 🚀 Live Demo

### Frontend
https://ai-battle-arena-teal.vercel.app

---

# 📸 Preview

<img width="100%" alt="AI Battle Arena" src="https://github.com/vivekchanne06-web/AI-Battle-Arena/blob/main/Screenshot%202026-07-17%20141826.png">
<img width="100%" alt="AI Battle Arena" src="https://github.com/vivekchanne06-web/AI-Battle-Arena/blob/main/Screenshot%202026-07-17%20141917.png">
---

# ✨ Features

- 🤖 Compare responses from multiple AI models
- ⚡ Parallel execution using LangGraph
- 🧠 AI-powered response evaluation
- 🏆 Automatic winner selection
- 🎨 Modern responsive UI
- ⚙️ TypeScript Backend
- 🌐 REST API with Express.js
- 🔒 Environment variable support
- 🚀 Deployed using Vercel & Render

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- TypeScript

## AI Framework

- LangChain
- LangGraph

## AI Models

- Google Gemini
- Mistral AI
- Cohere AI

## Deployment

- Vercel
- Render

---

# 🧠 What I Learned

This project helped me gain practical experience with modern AI orchestration and backend development.

### LangChain

- Model abstraction
- Prompt engineering
- Chat Models
- HumanMessage
- AIMessage
- Agent creation
- Structured Outputs

---

### LangGraph

- StateGraph
- Graph Nodes
- Graph State
- START & END Nodes
- Parallel AI execution
- State management
- Reducers
- Graph orchestration

---

### TypeScript

- Interfaces
- Types
- Async/Await
- Generics
- Error Handling
- Modular Architecture

---

### AI Integrations

Successfully integrated multiple LLM providers:

- Google Gemini
- Mistral AI
- Cohere AI

Learned how to:

- Authenticate using API Keys
- Invoke multiple models simultaneously
- Handle API responses
- Compare AI outputs
- Build AI evaluation pipelines

---

# 🏗 Architecture

```text
                User Prompt
                     │
                     ▼
             Express API (TypeScript)
                     │
                     ▼
               LangGraph Workflow
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   Mistral AI               Cohere AI
        │                         │
        └────────────┬────────────┘
                     ▼
              Google Gemini Judge
                     │
                     ▼
           Score & Best Response
                     │
                     ▼
                 React Frontend
```

---

# 📂 Project Structure

```text
AI-Battle-Arena
│
├── Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── Backend
│   ├── src
│   │   ├── routes
│   │   ├── services
│   │   ├── middlewares
│   │   ├── config
│   │   └── controllers
│   ├── server.ts
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/vivekchanne06-web/AI-Battle-Arena.git
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the Backend folder.

```env
GEMINI_API_KEY=YOUR_API_KEY

MISTRALAI_API_KEY=YOUR_API_KEY

COHERE_API_KEY=YOUR_API_KEY
```

---

# 📡 API Endpoint

### Generate AI Battle

```http
POST /api/use-graph
```

### Request

```json
{
  "question": "Explain LangGraph."
}
```

---

### Response

```json
{
  "solution_1": "...",
  "solution_2": "...",
  "judge": {
    "solution_1_score": 9,
    "solution_2_score": 8
  }
}
```

---

# 🚀 Future Improvements

- Streaming AI responses
- Conversation history
- User authentication
- Battle history
- More AI providers (Claude, GPT, Grok)
- Response voting
- Markdown rendering
- Export results
- Performance analytics

---

# 👨‍💻 Developer

**Vivek Channe**

GitHub:
https://github.com/vivekchanne06-web

LinkedIn:
https://www.linkedin.com/in/vivek-channe/

---

# ⭐ If you like this project

Give it a ⭐ on GitHub.
