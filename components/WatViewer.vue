<template>
    <UCard class="">
        <template #header>
            <div class="flex items-center">
                <UIcon name="i-heroicons-pencil" class="mr-2 text-primary-400" />
                <h1>WAT File</h1>
            </div>
        </template>

        <div class="flex flex-col gap-3">
            <UTextarea class="font-mono" v-model="model" :rows="10" :autoresize="true" />
            <p class="text-red-500 text-sm">{{ props.error }}</p>
        </div>

        <template #footer>
            <UButton 
                variant="soft" 
                icon="i-heroicons-cog-6-tooth" 
                @click="emit('compile')"
                label="Compile"
            />
        </template>
    </UCard>
</template>

<script lang="ts" setup>

    const model = defineModel<string>({
        default: ''
    })

    const props = defineProps<{
        error: unknown
    }>()

    const emit = defineEmits<{
        compile: []
    }>()

</script>