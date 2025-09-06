# Wordle Game

A simple Wordle game with a **React frontend** and a **Spring Boot backend**, all running in a single Docker container.

---

## Project Structure

```
Wordle_React/
├── Dockerfile                    # Dockerfile for building frontend + backend in one container
├── Wordle-Backend/              # Spring Boot backend
└── wordle-frontend/             # React frontend (Vite)
```

---

## How to Run

### 1. Build the Docker image

```bash
docker build -t wordle .
```

### 2. Run the container

```bash
docker run -p 8080:8080 wordle
```

* Maps port 8080 in the container to port 8080 on your computer.
* Open your browser and go to: **http://localhost:8080** to play.

---

## Notes

* Uses **Java 21** and **Node 18** inside the container.
* The first build may take a while because it downloads base images and dependencies.
* Works on **Intel, AMD, and Apple Silicon (M1/M2)**.
* The game automatically restarts 3 seconds after winning or losing.

## How It Works

**Dockerfile is multi-stage:**

1. **Frontend build**
   * Node 18 builds the React app with `npm install && npm run build`.

2. **Backend build**
   * Eclipse Temurin 21 JDK
   * Maven installed inside the container
   * Copies frontend build into Spring Boot static resources
   * Compiles backend with `mvn package -DskipTests`

3. **Final image**
   * Eclipse Temurin 21 JRE
   * Contains only the `.jar` file and serves both frontend and backend

---

## Enjoy the Game! 🎮
