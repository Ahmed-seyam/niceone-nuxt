<script setup>
const route = useRoute()

const reviewsStore = stores.reviewsStore
const reviews = computed(() => reviewsStore.getCurReviews)

await useAsyncData(() =>
  reviewsStore.fetchReviewsOfProduct(route.params.id, {
    query: { limit: 10 },
  })
)
</script>

<template>
  <NuxtLayout name="datalist">
    <div class="grid gap-.5rem">
      <template v-for="review in reviews" :key="review.id">
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
        <review-card-list :review="review"></review-card-list>
      </template>
    </div>
  </NuxtLayout>
</template>
