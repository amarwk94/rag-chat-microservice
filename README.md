# 🧠 RAG Chat Storage Microservice

A production-ready backend microservice to manage chat sessions and messages for a Retrieval-Augmented Generation (RAG) chatbot system.

---

## 🚀 Features

- Create and manage chat sessions
- Store user and assistant messages with optional context
- Rename, delete, and mark sessions as favorite
- API key authentication
- Rate limiting to prevent abuse
- Centralized logging and error handling
- Dockerized setup with MongoDB and Mongo Express UI
- Swagger API documentation

---

## 📦 Tech Stack

- **Node.js + TypeScript**
- **Express.js**
- **MongoDB** (via Mongoose)
- **Docker & Docker Compose**
- **Swagger (OpenAPI)**

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

Backend will run on: http://localhost:5000

Mongo Express UI: http://localhost:8081

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
