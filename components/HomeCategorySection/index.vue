<script setup>
const drag = ref(false)
const navigate = () => {}

const { t, locale } = useLang()

const splide = ref(null)

const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))
</script>

<template>
  <div class="p-x-[3rem]">
    <div class="banners grid grid-cols-1 gap-4">
      <app-banner v-for="i in 5"></app-banner>
    </div>

    <product-slider-list
      :icon="'i-carbon:list'"
      :heading="t('home.recent_prodcuts')"
      class="m-t-4rem"
    ></product-slider-list>
  </div>
</template>

<style lang="scss">
:deep(.splide__list) {
  display: flex !important;
}
</style>
