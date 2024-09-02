export const defaultWatfile = `(module
  (func (export "WASM")

  )
)`.trim()


export const defaultScript = `return WASM()`.trim()

export async function Compile(body: string) {

  const resp = await fetch('/', {
    method: "POST",
    body,
  })

  if (!resp.ok)
    throw createError(await resp.json())

  return await resp.arrayBuffer()
}

export async function Decompile(body: ArrayBuffer) {

  const resp = await fetch('/decompile', {
    method: "POST",
    body
  })

  return await resp.text()
}

export async function Dump(body: ArrayBuffer) {

  const resp = await fetch('/dump', {
    method: "POST",
    body
  })

  return await resp.text()
}