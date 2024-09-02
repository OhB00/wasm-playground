import { execFile } from "node:child_process"

export default defineEventHandler(async e => {

    const body = await readRawBody(e)
    if (!body) 
        throw createError("Missing Body.")

    const { path: src, delete: delsrc } = await useTmpfile("wat", body)
    const { path: dst, delete: deldst, read } = await useTmpfile("wasm", "")

    try {
        await run("wat2wasm", `./bin/wat2wasm`, [src, "-o", dst])

        const data = await read()
        
        if (!data)
            throw createError("Missing response data.")

        setHeader(e, 'content-type', 'application/wasm')
        return data
    }
    finally {

        await Promise.all([delsrc(), deldst()])
    }
})