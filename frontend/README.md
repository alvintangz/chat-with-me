# Chat with Alvin - Frontend

This is the frontend for **Chat with Alvin**, an app that allows others to interact with an AI version of me, Alvin. It is written in React, and built with Vite.

<a href="https://github.com/nvm-sh/nvm">
    <img alt="Node v20" src="https://img.shields.io/badge/node-v20-green.svg" /></a>
<a href="https://prettier.io/">
    <img alt="Code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" /></a>
<a href="https://eslint.org/">
    <img alt="Code linter: eslint" src="https://img.shields.io/badge/code%20linter-eslint-4b32c3?style=flat"></a>

## Development

### Prerequisites

Just [Node v20](https://github.com/nvm-sh/nvm).

### General Setup

Please follow the steps in order.

1. Run a local instance of the backend. Follow steps in the [other README.md](../backend/README.md).
2. [Environment variables set up](#environment-variables-set-up)
3. Install all dependencies.

    ```bash
    $ npm install
    ```

4. Finally, you can start the development server through Vite running on port `3000`:

    ```bash
    $ npm run dev
    ```

    - Chat with Alvin: [http://localhost:3000](http://localhost:3000)

### Environment Variables Set up

Add environment variables in `.env`. There are only two environment variables to worry about:

-   `VITE_RUNNABLE_CHAT_URL` - The LangServe Runnable instance. For local development, it's most likely `http://localhost:3001/chat`.
-   `VITE_MODEL_USED` - The model used. It could be `OpenAI GPT-4`.

## Build

`npm run build`
