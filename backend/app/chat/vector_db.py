import os

from app import config

from langchain_community.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

_CONTEXT_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data/context')
_EMBEDDINGS = OpenAIEmbeddings(openai_api_key=config.OPENAI_API_KEY, model=config.EMBEDDINGS_OPENAI_MODEL)

def _create_vector_db_from_dir_files(dir_path: str):
    """
    Loads files into the directory `dir_path` and adds them into the vector store.
    The FAISS vector store is returned. Each file in `dir_path` should be small
    enough to be a "chunk", as this doesn't use a splitter.
    """
    docs = []
    for file_name in os.listdir(dir_path):
        file_path = os.path.join(dir_path, file_name)
        loader = TextLoader(file_path)
        docs.extend(loader.load())
    return FAISS.from_documents(docs, _EMBEDDINGS)

VECTOR_STORE = _create_vector_db_from_dir_files(_CONTEXT_DIR)
