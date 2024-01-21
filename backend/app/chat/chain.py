from operator import itemgetter

from app import config
from app.chat.prompts import ANSWER_PROMPT, REFORUMATE_Q_PROMPT
from app.chat.vector_store import VECTOR_STORE

from langchain_openai import ChatOpenAI
from langchain.schema import StrOutputParser, runnable
from langchain_core.runnables import RunnablePassthrough

def get_chain() -> runnable.Runnable:
    retriever = VECTOR_STORE.as_retriever()
    llm = ChatOpenAI(openai_api_key=config.OPENAI_API_KEY, model_name=config.CHAT_OPENAI_MODEL)
    reformulate_q_chain = (
        {
            "context": itemgetter("human_input") | retriever,
            "human_input": itemgetter("human_input"),
            "chat_history": itemgetter("chat_history")
        }   
        | REFORUMATE_Q_PROMPT
        | llm
        | StrOutputParser()
    )

    def reformulate_question_if_exists(input: dict):
        if input.get("chat_history"):
            return reformulate_q_chain
        else:
            return input.get("human_input")

    return (
        {
            "context": itemgetter("human_input") | retriever,
            "human_input": itemgetter("human_input"),
            "chat_history": itemgetter("chat_history")
        }
        | RunnablePassthrough.assign(context=reformulate_question_if_exists | retriever)
        | ANSWER_PROMPT
        | llm
        | StrOutputParser()
    )
