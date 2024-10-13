docker compose -f .\docker-compose-inference.yml down -v; `
docker rmi -f $(docker images -f 'dangling=true' -q); `
docker-compose -f docker-compose-inference.yml up