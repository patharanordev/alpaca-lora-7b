export {}

declare global {
    type DatasetID = {
        id: string
    }

    type DatasetPayload = {
        id?: string
        instruction: string
        input: string
        output: string
        link: string
        ref: string
        created_at: number
    }

    type RequestArgs = {
        method: string
        payload: DatasetPayload | DatasetID
    }
}