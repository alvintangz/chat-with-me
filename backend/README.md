# Chat with Alvin - Backend

[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)

This is the main backend service for **Chat with Alvin**, an app that allows others to interact with an AI version of me, Alvin. This project leverages OpenAI models such as `gpt-4` through LangChain, a language model integration framework, and serves the app through LangServe (built with FastAPI).

## Development

### Prerequisites

1. [Python ~3.11](https://www.python.org/downloads/)
2. [Pipenv](https://github.com/pypa/pipenv): Pipenv is a new packaging tool for Python maintaining packages through a `Pipfile` and creates/manages a virtualenv
3. One (or both) of the following<sup>\*</sup>:
   - [Docker](https://www.docker.com): Desktop, or Engine
   - [Redis](https://redis.io/download)

<small>**_\*With Docker, you can easily create a Redis container on the fly. This is recommended for fast development._**</small>

### General Setup

Please follow the steps in order.

1. [Set up an in-memory data storage database (Redis)](#redis-setup)
2. [Environment variables set up](#environment-variables-set-up)
3. Install all dependencies, including development dependencies, and then activate the project's virtualenv.
   ```bash
   $ pipenv install --dev
   $ pipenv shell
   ```
4. Add data for the OpenAI models to consume
   - Add markdown files about yourself under `app/data/context`
   - Add a system message to `app/data/system_message.txt` to explain how you talk and any restrictions
5. Finally, you can start the development server through Uvicorn running on port `3001`:
   ```bash
   (auth-service) pipenv run serve-dev
   ```
   - LangServe Playground: [http://localhost:3001/playground](http://localhost:3001/playground)
   - Swagger: [http://localhost:3001/docs/swagger](http://localhost:3001/docs/swagger)
   - ReDoc: [http://localhost:3001/docs/redoc](http://localhost:3001/docs/redoc)
   - OpenAPI Spec (JSON): [http://localhost:3001/docs/openapi.json](http://localhost:3001/docs/openapi.json)

### Redis Setup

With Docker, you can set Redis up quickly:

```bash
$ docker build --file redis.dockerfile --tag better-redis .
$ docker run -p 6379:6379 --env REDIS_PASSWORD=Password@123 --name canvote-redis --detach better-redis
```

### Environment Variables Set up

`app/config.py` is the python file that sets up all the configurations used throughout the `app` module. If you look in there, it reads from a set of environment variables.

- Production :shipit:
  - `DEBUG` - Either `True` or `False`; set to `False` by default.
- CORS
  - `FRONTEND_BASE_URL` - The base URL of the frontend; set to `http://localhost:3001` by default.
- OpenAI
  - `OPENAI_API_KEY` - The [OpenAI API Key](https://platform.openai.com/api-keys)
  - `EMBEDDINGS_OPENAI_MODEL` - Embedding OpenAI model; set to `text-embedding-ada-002` by default.
  - `CHAT_OPENAI_MODEL` - Chat OpenAI model; set to `gpt-4` by default.
- Redis
  - `REDIS_URL` - Redis URL

Make sure to set up your environment variables correctly. You can set them up in an `.env` file [before running `pipenv shell`](https://pipenv-fork.readthedocs.io/en/latest/advanced.html#automatic-loading-of-env).

## Build and Containerize

1. `pipenv lock -r > requirements.txt`
2. `docker image build . --tag cwa-be`
3. `docker tag cwa-be <registry-w-tag>`
4. `docker push <registry-w-tag>`
