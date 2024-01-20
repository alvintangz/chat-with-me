from langserve.pydantic_v1 import BaseModel

class InputChat(BaseModel):
    """
    Input for the chat endpoint.
    """
    human_input: str
