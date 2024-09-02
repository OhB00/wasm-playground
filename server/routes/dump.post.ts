export default defineEventHandler(async e => {

    const body = await readRawBody(e)
    if (!body) 
        throw createError("Missing Body.")

    const { path: src, delete: del } = await useTmpfile("wasm", body)

    try {
        const result = await run("wasmobjdump", `./bin/wasm-objdump`, ["-dsxh", src ])

        setHeader(e, 'content-type', 'text/plain')
        return result.stdout
    }
    finally {
        await Promise.all([del()])
    }
})