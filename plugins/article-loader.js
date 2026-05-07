export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('articles', [])
  nuxtApp.provide('categories', [])
  nuxtApp.provide('tags', [])
})
