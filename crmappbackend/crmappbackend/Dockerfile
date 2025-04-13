FROM openjdk:25-jdk-slim
WORKDIR /app
COPY target/crmapp-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
