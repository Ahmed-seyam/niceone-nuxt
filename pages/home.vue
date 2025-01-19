<script setup>
definePageMeta({
  layout: 'default',
})

const bannersStore = stores.bannersStore
await useAsyncData('banners', () => bannersStore.fetchHeadingBanners())

const headingBanners = computed(() => bannersStore.getHeadingBanners)
</script>

<template>
  <div>
    <NuxtLayout>
      <app-header :banners="headingBanners"></app-header>
      <app-categories></app-categories>
      <home-category-section class="m-b-4rem"></home-category-section>
      <home-category-section class="m-b-4rem"></home-category-section>
    </NuxtLayout>
  </div>
</template>
