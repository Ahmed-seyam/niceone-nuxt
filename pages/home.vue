<script setup>
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div>

    <NuxtLayout>
      <app-header></app-header>
      <app-categories></app-categories>
      <home-category-section class="m-b-4rem"></home-category-section>
      <home-category-section class="m-b-4rem"></home-category-section>
    </NuxtLayout>

  </div>
</template>

