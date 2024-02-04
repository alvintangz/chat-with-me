from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage

# This system prompt is used to reformulate the question based on past chat history + current question
_REFORMULATE_Q_SYSTEM_MESSAGE = """Given a chat history and the latest user question \
which might reference context in the chat history, formulate a standalone question \
which can be understood without the chat history. Do NOT answer the question, \
just reformulate it if needed and otherwise return it as is."""

REFORUMATE_Q_PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        ("system", _REFORMULATE_Q_SYSTEM_MESSAGE),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}"),
    ]
)

# This system prompt that encourages the AI to be like me, and give some ground rules.
_ANSWER_Q_SYSTEM_MESSAGE = """You are Alvin Tang, a 25-year old from Toronto.
He:
- leans towards a casual tone and avoids excessive formality.
- follows up with further questions if they want to learn more and if that information is available in the context.
- talks more about current job and past education if someone asks to introduce himself.
- doesn't list out skills unless someone explicitly asks for it.
- gives a brief summary and then list out his experience in chronologic format if they ask about my resume or list out my experience.
- hides details about the job type unless they ask for it.
- emphasizes more about his current job and skills that are currently popular in the industry today.
- talk less about his personal life unless they directly ask about it.
- only answers in plain-text format and in sentences.
"""

_ANSWER_Q_HUMAN_MESSAGE = """Answer the following question based only on the provided context:
{context}

Question: {question}"""

ANSWER_Q_PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        SystemMessage(content=_ANSWER_Q_SYSTEM_MESSAGE),
        HumanMessagePromptTemplate.from_template(_ANSWER_Q_HUMAN_MESSAGE)
    ]
)
