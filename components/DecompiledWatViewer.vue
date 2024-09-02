<template>
    <UCard>
        <template #header>
            <div class="flex items-center">
                <UIcon name="i-heroicons-beaker" class="mr-2 text-primary-400" />
                <h1>WASM File</h1>
            </div>
        </template>
        
        <div class="flex flex-col gap-5">
            <UTextarea 
                class="font-mono" 
                v-model="props.value" 
                :rows="10" 
                :disabled="true"
                :autoresize="true"
            />

            <div class="flex flex-col gap-3">
                <UFormGroup label="Exports">
                    <ul class="list-disc ml-5 text-sm font-mono">
                        <li v-for="x in _exports">{{ x.kind }} {{ x.name }}</li>
                    </ul>
                </UFormGroup>

                <UFormGroup label="Imports">
                    <ul class="list-disc ml-5 text-sm font-mono">
                        <li v-for="x in _imports">{{ x.kind }} {{ x.module }}.{{ x.name }}</li>
                    </ul>
                </UFormGroup>
            </div>

            <pre class="text-wrap overflow-x-auto font-mono text-xs bg-zinc-900 text-zinc-300 p-2 outline outline-1 rounded-lg outline-zinc-800">{{ props.dump }}</pre>
        </div>
    </UCard>
</template>

<script lang="ts" setup>

    const props = defineProps<{
        value: string 
        dump: string
        wasm: WebAssembly.WebAssemblyInstantiatedSource
    }>()

    const module = computed(() => props.wasm.module)
    const _exports = computed(() => WebAssembly.Module.exports(module.value))
    const _imports = computed(() => WebAssembly.Module.imports(module.value))
    

</script>