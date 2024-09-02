function useTmpStorage() {
    return useStorage("tmp")
}

interface TmpFile {
    path: string

    delete: () => Promise<any>
    read: () => Promise<string | null>
}

import { randomUUID } from "uncrypto"

export async function useTmpfile(ext: string, data: string) : Promise<TmpFile> {

    const store = useTmpStorage()

    const name = `${randomUUID()}.${ext}`

    await store.setItem(name, data)

    return {
        path: `./.data/tmp/${name}`,

        async read() {
            return await store.getItemRaw(name)
        },

        async delete() {
            await store.removeItem(name)
        }
    }
}