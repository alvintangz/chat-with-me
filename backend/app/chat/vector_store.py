import os

from app import config

from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain.text_splitter import MarkdownTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

_CONTEXT_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data/context')

_RAW_DOCS = []
for root, dirs, files in os.walk(_CONTEXT_DIR):
    for name in files:
        if name.endswith('.md'):
            markdown_file = os.path.join(root, name)
            loader = UnstructuredMarkdownLoader(markdown_file)
            _RAW_DOCS.extend(loader.load())

_DOCUMENTS = MarkdownTextSplitter().split_documents(_RAW_DOCS)

_EMBEDDINGS = OpenAIEmbeddings(openai_api_key=config.OPENAI_API_KEY, model=config.EMBEDDINGS_OPENAI_MODEL)

VECTOR_STORE = FAISS.from_documents(_DOCUMENTS, _EMBEDDINGS)
