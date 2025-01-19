export default defineNuxtPlugin((nuxtApp) => {
  // when page redirect on mobile device, close drawer navbar

  nuxtApp.vueApp.config.globalProperties.$filters = {
    t(name: string, locale: string) {
      //name_en 
      return name + locale
    },
  }
})
