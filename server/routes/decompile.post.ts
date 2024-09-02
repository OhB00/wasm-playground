import { execFile } from "node:child_process"

export default defineEventHandler(async e => {

    const body = await readRawBody(e)
    if (!body) 
        throw createError("Missing Body.")

    const { path: src, delete: delsrc } = await useTmpfile("wasm", body)
    const { path: dst, delete: deldst, read } = await useTmpfile("wat", "")

    await run("wasm2wat", `./bin/wasm2wat.exe`, [src, "-o", dst])
    
    const data = await read()

    await Promise.all([delsrc(), deldst()])

    if (!data)
        throw createError("Missing response data.")

    setHeader(e, 'content-type', 'application/wat')
    return data
})