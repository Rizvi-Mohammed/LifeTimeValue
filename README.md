# LifeTimeValue
AI for personalized emails to increase ecommerce customer ltv.

![alt text](https://github.com/Rizvi-Mohammed/LifeTimeValue/blob/main/ltv.PNG?raw=true)

# LTV-AI

LTV-AI is a personalized e-commerce email solution leveraging Next.js, NestJS, Retrieval-Augmented Generation (RAG), and Large Language Models (LLMs).

## Features
- AI-powered personalized email generation
- Next.js for frontend
- NestJS for backend
- Supports OpenAI, Ollama, and other LLM providers

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version recommended)
- npm or yarn
- An AI LLM provider (e.g., OpenAI API key, Ollama, etc.)

### Installation

```sh
# Clone the repository
git clone https://github.com/your-repo/ltv-ai.git
cd ltv-ai
```

### Configure AI LLM Provider

Set up your AI provider tokens (OpenAI, Ollama, etc.) and configure it in:
```sh
ltv-ai-backend/src/personalization/personalization.controller.ts
```

### Running the Backend

```sh
# Navigate to backend
dcd ltv-ai-backend

# Install dependencies
npm install

# Start the backend in development mode
npm run start:dev
```

- Ensure the backend runs on port `3000` by default.
- If using a different port, update the frontend configuration accordingly.

### Running the Frontend

```sh
# Navigate to frontend
cd ../ltv-ai-frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

## Enjoy 🎉
Once both backend and frontend are running, experience AI-powered personalized e-commerce emails with LTV-AI!

---

## Contributing
Feel free to submit issues or open pull requests to improve LTV-AI.

## License
MIT License


