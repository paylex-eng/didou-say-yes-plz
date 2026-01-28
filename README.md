# didou-say-yes-plz
a repo to ask to your crush if she/he wants to be your valentine

## Features
- Interactive yes/no question prompt
- Cute Valentine's Day themed design
- Easy to customize and deploy

## Getting Started

### Prerequisites
- Docker (recommended)
- OR Python 3.8+ with Flask

### Installation & Running with Docker

#### Build the Docker image

```bash
docker build -t didou-say-yes-plz .
```

#### Run the container

```bash
docker run -d \
  -p 44333:44333 \
  -v $(pwd)/responses.json:/app/responses.json \
  --name didou-app \
  didou-say-yes-plz
```

**Options:**
- `-d` : Run in detached mode (background)
- `-p 44333:44333` : Map port 44333 (host:container)
- `-v $(pwd)/responses.json:/app/responses.json` : Volume to persist responses
- `--name didou-app` : Container name

#### Access the application

Once the container is running:
- **Home page:** http://localhost:44333
- **Form:** http://localhost:44333/form

#### Useful Docker commands

```bash
# View logs
docker logs didou-app

# Stop the container
docker stop didou-app

# Restart the container
docker start didou-app

# Remove the container
docker rm -f didou-app
```

### Alternative: Running without Docker

```bash
cd backend
pip install flask
python app.py
```

## Customization

Edit the question and styling in the configuration files to personalize your message.