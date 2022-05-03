
### run containers
docker compose up -d

### see containers running
docker ps

### to access container
docker exec -it <container id> sh

### to build container
docker-compose up --build <containerName>