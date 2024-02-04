from operator import itemgetter

from app import config
from app.chat.templates import REFORUMATE_Q_PROMPT_TEMPLATE, ANSWER_Q_PROMPT_TEMPLATE
from app.chat.vector_db import VECTOR_STORE

from langchain_openai import ChatOpenAI
from langchain.schema import StrOutputParser, runnable
from langchain_core.runnables import RunnablePassthrough

def _get_chat_chain() -> runnable.Runnable:
    llm = ChatOpenAI(openai_api_key=config.OPENAI_API_KEY, model_name=config.CHAT_OPENAI_MODEL)
    retriever = VECTOR_STORE.as_retriever()

    reformulate_q_chain =  (
        {
            "chat_history": itemgetter("chat_history"),
            "question": itemgetter("human_input"),
        }
        | REFORUMATE_Q_PROMPT_TEMPLATE
        | llm
        | StrOutputParser()
    )

    answer_q_chain = (
        reformulate_q_chain |
        {
            "context": retriever,
            "question": RunnablePassthrough(),
        }
        | ANSWER_Q_PROMPT_TEMPLATE
        | llm
        | StrOutputParser()
    )

    return answer_q_chain

CHAT_CHAIN = _get_chat_chain()
