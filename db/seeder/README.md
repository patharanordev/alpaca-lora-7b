# Import dataset to PostgreSQL

## Preparing your dataset

You can adding your dataset in `prisma/data`. In this case I adding GPT dataset in JSON file format into the directory.

## Preparing database connection

I using `prisma` for running seed, so don't forget create `.env`:

```sh
# In .env file
DATABASE_URL="postgresql://postgres:alpaca-lora@localhost:5419/dataset?schema=public"
```

## Run seed

Run generate *(one-times)*:

```sh
npx prisma generate
```

then run seed (you can custom the script in `prisma/seed.ts`):

```sh
npx prisma db seed
```

Enjoy!!!
