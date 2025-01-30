# HAL 9000 API

An experimental API built to explore AI capabilities and patterns using modern technologies. This project serves as a playground for testing various AI features and integrations.

## Overview 🔍

This API serves as a Proof of Concept (PoC) designed to explore and experiment with:
- Advanced invoice analysis and data extraction
- Intelligent data formatting and mapping
- AI pattern orchestration and workflow automation
- Integration with multiple AI providers and models
- Experimental features in AI processing

## Tech Stack 🛠️

### Core Technologies
- **Runtime**: Deno
- **Framework**: Hono
- **Validation**: Zod
- **AI Integration**: Vercel AI SDK

### AI Providers
- Google AI
- OpenAI
- Anthropic
- Ollama (local deployment)

## Project Status 🚧

**Work in Progress**

This project is under active development. Features and documentation are regularly updated as the project evolves.

## Prerequisites ✅

Before you begin, ensure you have the following:

### Required Software
- Deno runtime environment

### AI Provider Requirements
1. API Keys for:
   - Google AI
   - OpenAI
   - Anthropic

2. Local Ollama Setup with Models:
   - `llama3.2:latest`
   - `llama2:13b`
   - `deepseek-r1:14b`
   - `nomic-embed-text:latest`

> **Note**: Missing some AI providers? You can customize the model selection by updating the `getAiModel` function parameters to match your available resources.

## Quick Start 🚀

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd hal9000-api
   ```
2. Set up environment variables:
    ```
    cp .env.sample .env
    ```
    Edit .env with your API keys and configuration

3. Start the development server:
    ```
    deno run dev
    ```

## Contributing 🤝
As this is a PoC project, please reach out to the maintainers before making contributions.

## Disclaimer 🚨
This API is a proof of concept and is not intended for production use (yet). While it won't lock you out of your spaceship, please use it responsibly and be aware of its experimental nature.
