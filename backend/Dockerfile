FROM python:3.11

WORKDIR /code

# Install Pipenv and update pip
RUN apt-get update && \
    apt-get install -y build-essential && \
    pip install --upgrade pip && \
    pip install pipenv && \
    apt-get remove -y build-essential && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the Pipfile and Pipfile.lock to the working directory
COPY Pipfile Pipfile.lock /code/

# Create requirements.txt from pipenv and pip install
RUN pipenv requirements > requirements.txt
RUN pip install --no-cache-dir -r /code/requirements.txt
COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
