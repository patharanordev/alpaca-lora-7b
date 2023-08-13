FROM nvidia/cuda:12.1.0-devel-ubuntu22.04

ARG DEBIAN_FRONTEND=noninteractive
ARG BASE_MODEL

ENV BASE_MODEL $BASE_MODEL

RUN apt-get update && apt-get install -y \
    git \
    curl \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt install -y python3.10 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10 \
    && python3.10 -m pip install numpy \
    && python3.10 -m pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121

COPY requirements.txt requirements.txt
RUN python3.10 -m pip install -r requirements.txt
COPY . .

ENTRYPOINT [ "python3.10"]
