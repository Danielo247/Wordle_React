FROM node:18 AS frontend-builder
WORKDIR /app
COPY wordle-frontend/ .
RUN npm install && npm run build


FROM eclipse-temurin:21-jdk AS backend-builder
WORKDIR /app
COPY Wordle-Backend/ .
COPY --from=frontend-builder /app/dist ./src/main/resources/static


RUN apt-get update && \
    apt-get install -y maven && \
    mvn package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
