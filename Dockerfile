FROM python:3.11-slim

LABEL org.opencontainers.image.source="https://github.com/paylex-eng/didou-say-yes-plz"

WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

RUN pip install flask

EXPOSE 44333

CMD ["python", "backend/app.py"]