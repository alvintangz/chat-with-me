FROM tiangolo/uvicorn-gunicorn:python3.11

LABEL maintainer="Alvin Tang <maintain@alvintang.me>"
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY ./app /app/app
