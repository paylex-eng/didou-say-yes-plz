# didou-say-yes-plz
A repo to ask your crush if she/he wants to be your valentine.

## Features
- Interactive yes/no question prompt
- Cute Valentine's Day themed design
- Easy to customize and deploy

## Getting Started

### Prerequisites
- Docker (recommended)
- OR Python 3.8+ with Flask

### Using the prebuilt Docker image from GitHub Container Registry

The image is available on GitHub Container Registry:

ghcr.io/paylex-eng/valentine-app:latest

> ⚠️ Before running the container, you must create the `responses.json` file:

```bash
mkdir -p output
echo "[]" > output/responses.json
```

This ensures that Docker mounts a proper file and not a directory.

Run the container
```bash
docker run -d \
  -p 44333:44333 \
  -v $(pwd)/output/responses.json:/app/responses.json \
  --name valentine-app \
  ghcr.io/paylex-eng/valentine-app:latest
```

Access the application
Once the container is running:
	•	Home page: http://localhost:44333
	•	Form: http://localhost:44333/form

Useful Docker commands

### Alternative: Running locally without Docker

```bash
cd backend
pip install flask
python app.py
```

## Customization

Edit the question and styling in the configuration files to personalize your message.

---