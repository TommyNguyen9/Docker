# Docker Practice

This repository contains my hands on Docker practice while learning containerisation, Docker networking, image creation, container management, and running applications with supporting services such as MongoDB, PostgreSQL and Redis.

The aim of this repository is to build practical experience with Docker through small exercises and experiments rather than only learning the concepts theoretically.

## Technologies Used

- Docker
- Docker Desktop
- WSL2 / Ubuntu
- Node.js
- Express.js
- MongoDB
- PostgreSQL
- Redis
- Git / GitHub

### Docker Basics

Practised the core Docker workflow including:

- Pulling Docker images
- Creating and running containers
- Viewing running containers
- Viewing stopped containers
- Checking container logs
- Removing containers
- Port mapping
- Container naming
- Building custom Docker images

Some commonly used commands:

```bash
docker ps
docker ps -a
docker logs <container-name>
docker rm -f <container-name>
docker images
```

### Building a Custom Docker Image

I practiced creating an image for a Node.js/Express Application using a Dockerfile.

Example build command:

```bash
docker build -t my-app .
```

The application container can then be started with:

```bash
docker run -d \
  --name my-app \
  -p 3000:3000 \
  --network my-network \
  my-app
```

The application is exposed on:

```text
localhost:3000
```

### Docker Networking 

I practiced connecting multiple containers using a Docker network.

```bash
docker network create my-network
```

The Node.js application and MongoDB container can then communicate using their container names instead of localhost.

Architecture:

```text
Browser
   |
   v
Node.js / Express Container
   |
   v
Docker Network
   |
   v
MongoDB Container
```

This helped me understand how separate containers communicate with each other while remaining isolated from the host system.

### MongoDB Practice

MongoDB was run inside a Docker container and connected to the Node.js application.

The application practiced:

- Connecting to MongoDB
- Reading user data
- Updating a user profile
- Serving profile information through Express routes

MongoDB uses the standard container port:

```text
27017
```

Example database used during practice:

```text
my-db
```

### PostgreSQL Practice

```bash
docker pull postgres:18
```

Example Container:

```bash
docker run -d \
  --name postgres18 \
  -e POSTGRES_PASSWORD=<password> \
  -p 5433:5432 \
  postgres:18
```

Port 5433 can be used on the host when the default PostgreSQL port 5432 is already in use.

This helped me understand the difference between:

```text
HOST PORT : CONTAINER PORT
5433      : 5432
```

### Redis Practice

I also experimented with running Redis containers to become more familiar with managing multiple services and containers within Docker.
This included practising how independent containers can be started, stopped, inspected and connected as part of a larger development environment.

### Docker & WSL2

The development environment uses:

```text
Windows
   |
   v
Docker Desktop
   |
   v
  WSL2
   |
   v
 Ubuntu
```

Docker Desktop provides the Docker engine while Ubuntu within WSL2 is used as the main Linux development environment.
This also helped me understand the difference between the Docker Desktop internal WSL distribution and my normal Ubuntu development environment.

### Useful Commands

```bash
# Show running containers
docker ps

# Show all containers
docker ps -a

# Show Docker images
docker images

# View container logs
docker logs <container-name>

# Stop a container
docker stop <container-name>

# Remove a container
docker rm <container-name>

# Force remove a running container
docker rm -f <container-name>

# Build an image
docker build -t <image-name> .

# Run a container
docker run <image-name>

# Show Docker contexts
docker context ls

# Show Docker networks
docker network ls
```

### Teachings

Through this practice I improved my understanding of:
- The difference between Docker images and containers
- How Dockerfiles are used to build images
- Container lifecycle management
- Port mapping between the host and containers
- Docker networking
- Communication between application and database containers
- Environment variables inside containers
- Running databases such as MongoDB and PostgreSQL in Docker
- Using Docker with WSL2
- Troubleshooting container and port conflicts

Future Improvements
I plan to continue expanding this repository with:
- Docker Compose
- Multi-container applications
- Persistent volumes
- Improved Docker networking
- Environment variable management
- Container health checks
- Docker image optimisation
- AWS Elastic Container Registry (ECR)
- ECS / Fargate
- CI/CD integration

### Purpose

This repository is primarily a learning and practice environment used to develop practical Docker and containerisation skills.
The exercises are intentionally small so that individual Docker concepts can be understood before combining them into larger cloud and DevOps projects.
