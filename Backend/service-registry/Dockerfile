# Stage 1: Build the application using a Maven image that includes Java 21
# This line is updated to match our project's Java version
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final, smaller image using an official, lightweight Java 21 runtime
# This line is updated to a correct and optimized image name
FROM amazoncorretto:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# This command will be used by Render to start the application
ENTRYPOINT ["java","-jar","app.jar"]