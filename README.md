# 🧠 RAG Chat Storage Microservice

A production-ready backend microservice to manage chat sessions and messages for a Retrieval-Augmented Generation (RAG) chatbot system.

---

## 🚀 Features

- Create and manage chat sessions
- Store user and assistant messages with optional context
- Rename, delete, and mark sessions as favorite
- API key authentication (now supports multiple keys via env)
- Rate limiting to prevent abuse
- Centralized logging and error handling
- Service layer for business logic and DB calls
- Centralized error classes (NotFound, BadRequest, Unauthorized, etc.)
- Constants directory for error messages, status codes, and pagination
- Dockerized setup with MongoDB, Mongo Express UI, Elasticsearch, Kibana, and Filebeat
- Log analytics: all logs are structured JSON, with status and response time as top-level fields
- Log persistence: logs directory is persisted between container restarts
- Swagger API documentation

---

## 📦 Tech Stack

- **Node.js + TypeScript**
- **Express.js**
- **MongoDB** (via Mongoose)
- **Docker & Docker Compose**
- **Swagger (OpenAPI)**
- **Elasticsearch, Kibana, Filebeat** (for log analytics)

---

## 🛠️ Setup & Installation

### 🔧 Prerequisites

- Node.js 20+
- Docker + Docker Compose

---

### 🚀 Quick Start with Docker

```bash
cp .env.example .env
docker-compose up --build
```

Backend: http://localhost:5000
Mongo Express UI: http://localhost:8081
Kibana (log analytics): http://localhost:5601

# Check running containers

```bash
docker-compose ps
```

---

## 📊 Log Analytics with Kibana

1. All logs are written as structured JSON to the `logs/` directory.
2. Filebeat ships logs to Elasticsearch, which are visualized in Kibana.
3. In Kibana, create a Data View for `filebeat-*` and explore logs in Discover.
4. Status code and response time are available as separate fields for graphing and dashboards.

---

### 🐳 Docker Commands Reference

# Build and run containers

```bash
docker-compose up --build
```

# Stop containers

```bash
docker-compose down
```

# Stop and remove containers + volumes

```bash
docker-compose down -v
```

# Check running containers

```bash
docker-compose ps
```
