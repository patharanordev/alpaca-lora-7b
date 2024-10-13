import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone); 

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const res: DatasetPayload = await request.json()
    const timestamp = dayjs.utc(res.created_at*1000)
    const gmt7 = timestamp.add(7, 'hour')
    const targetTime = gmt7.add(6, 'hour')
    const currentTime = dayjs.utc(new Date()).add(7, 'hour')
    const createDataset = await prisma.custom.create({
        data: {
            instruction: res.instruction,
            input: res.input,
            output: res.output,
            link: res.link,
            ref: res.ref,
            created_at: targetTime.toISOString(),
            updated_at: currentTime.toISOString(),
        }
    })

    return NextResponse.json({ data: createDataset })
}

export async function GET(request: Request) {
    const res = await request.json()
    const dataset = await prisma.custom.findUnique({
        where: {
            id: res.id,
        }
    })

    return NextResponse.json({ data: dataset })
}

export async function DELETE(request: Request) {
    const res = await request.json()
    const dataset = await prisma.custom.delete({
        where: {
            id: res.id,
        }
    })

    return NextResponse.json({ data: dataset })
}

export async function PATCH(request: Request) {
    const res = await request.json()
    const timestamp = dayjs.utc(res.created_at*1000)
    const gmt7 = timestamp.add(7, 'hour')
    const targetTime = gmt7.add(6, 'hour')
    const currentTime = dayjs.utc(new Date()).add(7, 'hour')
    const data = {
        instruction: res.instruction,
        input: res.input,
        output: res.output,
        link: res.link,
        ref: res.ref,
        created_at: targetTime.toISOString(),
        updated_at: currentTime.toISOString(),
    }
    const dataset = await prisma.custom.upsert({
        where: {
            id: res.id,
        },
        update: data,
        create: data
    })

    return NextResponse.json({ data: dataset })
}