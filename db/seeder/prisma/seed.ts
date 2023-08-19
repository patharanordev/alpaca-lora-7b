import { PrismaClient } from '@prisma/client'
import dataset from './data/alpaca_data_gpt4.json'

const prisma = new PrismaClient()
async function main() {
  if (dataset && Array.isArray(dataset)) {
    const records = await prisma.gpt4.count()

    if (records==0) {
      const dsGpt4 = await prisma.gpt4.createMany({ 
        data: [...dataset]
      })
      console.log({ dsGpt4 })
    } else {
      console.log(`Found the dataset exists in "gpt4" table.`)
    }
  } else {
    console.log('Dataset must be array!')
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })