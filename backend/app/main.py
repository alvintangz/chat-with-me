from app import config, schemas, utils
from app.chat import chain
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langserve import add_routes

app = FastAPI(
    debug=config.DEBUG,
    title=config.PROJECT_TITLE,
    description=config.PROJECT_DESCRIPTION,
    version=config.PROJECT_VERSION,
    openapi_url=config.OPENAPI_URL if config.DEBUG else None,
    docs_url=config.OPENAPI_SWAGGER_URL if config.DEBUG else None,
    redoc_url=config.OPENAPI_REDOC_URL if config.DEBUG else None,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.FRONTEND_BASE_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
def redirect_root_to_docs():
    if config.DEBUG:
        return RedirectResponse(config.OPENAPI_SWAGGER_URL)
    raise HTTPException(status_code=404)

def get_chat_history(session_id: str) -> RedisChatMessageHistory:
    """
    Get chat history from a session ID. Stored in Redis.
    """
    if not utils.is_valid_uuid4(session_id):
        raise HTTPException(
            status_code=400,
            detail=f"Session ID `{session_id}` is not in a valid UUID.",
        )
    return RedisChatMessageHistory(
        session_id,
        url=config.REDIS_URL,
        key_prefix='chat_session:'
    )

add_routes(
    app,
    RunnableWithMessageHistory(
        chain.get_chain(),
        get_chat_history,
        input_messages_key="human_input",
        history_messages_key="chat_history"
    ).with_types(input_type=schemas.InputChat),
    path=config.CHAT_BASE_PATH,
    disabled_endpoints=[
        "playground",
        "feedback",
        "input_schema",
        "config_schema",
        "output_schema",
        "config_hashes",
    ] if not config.DEBUG else []
)
