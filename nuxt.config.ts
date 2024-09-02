// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts"],
  compatibilityDate: "2024-08-31",

  fonts: {
    google: {}
  },

  nitro: {
    storage: {
      tmp: {
        driver: "fs",
        base: "./.data/tmp"
      }
    }
  }
})