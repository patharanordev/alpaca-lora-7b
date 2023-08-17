$path = "./db/pgdata"
If(!(test-path -PathType container $path))
{
      New-Item -ItemType Directory -Path $path
}

docker-compose -f .\docker-compose-poc-db.yml down -v; `
docker-compose -f .\docker-compose-poc-db.yml up