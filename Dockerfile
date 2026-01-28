FROM python:3.11-slim

WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

RUN pip install flask

EXPOSE 44333

CMD ["python", "backend/app.py"]