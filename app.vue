<template>
  <UContainer class="py-10">

    <div class="grid grid-cols-2 gap-10 flex-wrap">

      <div class="flex flex-col gap-5">
        <WatViewer 
          class="flex-1 grow-0"
          @compile="RunCompiler()" 
          v-model="wat" 
          :error="compile_error" 
        />

        <ScriptEvaluator 
          v-if="compiled && wasm" 
          class="flex-1 grow-0"
          :compiled
        />  
      </div>

      <div class="flex flex-col gap-5">
        <DecompiledWatViewer 
          class="flex-1"
          v-if="decompiled && wasm && dumped" 
          :value="decompiled"
          :dump="dumped"
          :wasm 
        />
      </div>
    </div>

  </UContainer>
</template>

<script lang="ts" setup>

  const wat = ref(defaultWatfile)
  const decompiled = ref<string>()
  const dumped = ref<string>()
  const compiled = ref<ArrayBuffer>()
  const wasm = ref<WebAssembly.WebAssemblyInstantiatedSource>()

  const compile_error = ref<unknown>('')

  async function RunCompiler() {

    compile_error.value = ''

    consola.start('Requesting compiler...')

    try {
      compiled.value = await Compile(wat.value)
      decompiled.value = await Decompile(compiled.value)
      dumped.value = await Dump(compiled.value)
    } catch (e) {
      consola.error("Compilation error", e)
      compile_error.value = e
      return
    }

    consola.success('Compiled!')

    consola.start('Passing to browser...')
    
    try {
      wasm.value = await WebAssembly.instantiate(compiled.value, { util: { info: () => {} } })
      consola.success('Ready!', wasm.value)
    }
    catch (e) {
      consola.error("WASM error", e)
      compile_error.value = e
    }
  }

</script>

<style scoped>
html {
  font-family: Inter, sans-serif;
}
</style>