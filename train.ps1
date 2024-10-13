docker-compose -f docker-compose-train.yml down -v; `
docker rmi -f $(docker images -f 'dangling=true' -q); `
#docker-compose -f docker-compose-train.yml up
docker-compose -f docker-compose-train.yml up --build