import os

# Same as Django's DEBUG mode :)
DEBUG = os.getenv("DEBUG", "False") == "True"

# CORS

FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:3000")

# Paths

CHAT_BASE_PATH = os.getenv("CHAT_PATH", '/chat')

# Project Information

PROJECT_TITLE = "Chat with Alvin - Backend"
PROJECT_DESCRIPTION = "Allows others to interact with an AI version of me, Alvin"
PROJECT_VERSION = "1.0.0"

# OpenAPI Configuration

OPENAPI_URL = "/docs/openapi.json"
OPENAPI_SWAGGER_URL = "/docs/swagger"
OPENAPI_REDOC_URL = "/docs/redoc"

# OpenAI Configuration

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
EMBEDDINGS_OPENAI_MODEL = os.getenv("EMBEDDINGS_OPENAI_MODEL", "text-embedding-ada-002")
CHAT_OPENAI_MODEL = os.getenv("CHAT_OPENAI_MODEL", "gpt-3.5-turbo-1106")

# Redis URL

REDIS_URL = os.getenv("REDIS_URL")
