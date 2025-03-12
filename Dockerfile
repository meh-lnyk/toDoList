# Use a smaller base image
FROM gradle:8.4-jdk17 AS build
WORKDIR /app

# Cache dependencies: Copy only essential Gradle files first
COPY gradlew . 
COPY gradle/ gradle/
COPY gradle/wrapper/ gradle/wrapper/
COPY build.gradle .
COPY settings.gradle .

# Ensure Gradle wrapper is executable
RUN chmod +x gradlew

# Download dependencies first to leverage Docker caching
RUN ./gradlew dependencies --no-daemon || return 0

# Copy the rest of the application source code
COPY src/ src/

# Build the JAR **only if needed**
RUN ./gradlew clean build -x test --no-daemon

# Use a lightweight JDK image for running the app
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/build/libs/todolist-0.0.1-SNAPSHOT.jar app.jar

# Expose the app's port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
