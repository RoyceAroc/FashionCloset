FROM runpod/pytorch:1.13.0-py3.10-cuda11.7.1-devel-ubuntu22.04

WORKDIR /docker-build

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    nodejs \
    npm \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

EXPOSE 8501
EXPOSE 3001

COPY my_component/ /docker-build/my_component/

RUN python3 -m venv venv && . venv/bin/activate

RUN . venv/bin/activate && pip install -r my_component/requirements.txt

RUN . venv/bin/activate && pip install streamlit

RUN . venv/bin/activate && pip install faiss-gpu

COPY setup.py .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

RUN . venv/bin/activate && pip install -e .

ENTRYPOINT ["./entrypoint.sh"]
