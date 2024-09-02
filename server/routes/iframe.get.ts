export default defineEventHandler(async (event) => {
  return `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script>
      (${fn})()
    </script>
  </body>
</html>
`
})

let parent: any

function fn() {

  console.log("Iframe loaded...")

  addEventListener("message", async (e) => {
    
    console.log("Got message...")

    if (e.data.type === "run" && e.data.buffer && e.data.code)
    {
      console.log("Evaluating script...")
      console.log("Compiling WASM...")

      const wasm = await WebAssembly.instantiate(e.data.buffer, { util: { info: console.log } })
      
      const keys = Object.keys(wasm.instance.exports)
      const values = Object.values(wasm.instance.exports)
      
      console.log("Building function...")
      const fn = new Function(...keys, e.data.code)

      let data
      let err

      try {
        console.log("Running...")
        data = fn(...values)
        console.log("Done!", data, wasm)
      } catch(e) {
        err = e
      }

      parent.postMessage({
        data: data ?? null,
        err: err ?? null
      }, location.origin)

      if (err)
        throw err
    }
  })
}