<template>
  <div class="flex flex-col gap-5">
    <UCard>
      <template #header>
        <div class="flex items-center">
          <UIcon name="i-heroicons-cpu-chip" class="mr-2 text-primary-400" />
          <h1>Evaluate</h1>
        </div>
      </template>
  
      <UTextarea class="font-mono" v-model="code" :rows="10" />
  
      <template #footer>
        <UButton variant="soft" icon="i-heroicons-bolt" @click="DoRun()">Run</UButton>
      </template>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center">
          <UIcon name="i-heroicons-globe-europe-africa" class="mr-2 text-primary-400" />
          <h1>Environment</h1>
        </div>
      </template>
      
      <div>
        <iframe class="w-full outline outline-1 outline-zinc-100 rounded-md" src="/iframe" ref="f"></iframe>
      </div>

      <template #footer>
        <div class="text-sm flex flex-col gap-5" v-if="return_value !== undefined || error_value !== undefined">
          <div class="flex items-center">
            <UIcon name="i-heroicons-computer-desktop" class="mr-2 text-primary-400"/>
            <p class="text-md">Results</p>
          </div>
          <div class="bg-zinc-800 w-full rounded-md outline outline-1 outline-zinc-600 p-2 flex flex-col gap-2 text-xs">
            <p v-if="return_value" class="font-mono">{{ return_value }}</p>
            <p v-if="error_value" class="text-red-500 font-mono">{{ error_value }}</p>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>

    const props = defineProps<{
        compiled: ArrayBuffer
    }>()

    const f = ref<HTMLIFrameElement>()
    const code = ref(defaultScript)

    const return_value = ref()
    const error_value = ref()

    async function DoRun() {
      return_value.value = undefined
      error_value.value = undefined

      const msg = {
        type: "run",
        buffer: props.compiled,
        code: code.value
      }

      f.value!.contentWindow?.postMessage(msg, location.origin)
    }

    function DoListen() {

      addEventListener('message', e => {
        consola.info("Message", e.data)
        return_value.value = e.data.data
        error_value.value = e.data.err
      })

    }

    onMounted(() => DoListen())
    
</script>