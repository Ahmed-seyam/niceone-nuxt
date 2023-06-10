import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'

export default defineNuxtPlugin((nuxtApp) => {
  // when page redirect on mobile device, close drawer navbar
  nuxtApp.vueApp.component('Splide', Splide)
  nuxtApp.vueApp.component('SplideSlide', SplideSlide)
  nuxtApp.vueApp.component('SplideTrack', SplideTrack)
})
