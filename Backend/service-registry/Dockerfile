# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final, smaller image to run the application
FROM openjdk:21-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080 
# Note: Render ignores the EXPOSE port and uses its own internal networking.

# This command will be overridden by Render's Start Command
ENTRYPOINT ["java", "-jar", "app.jar"]