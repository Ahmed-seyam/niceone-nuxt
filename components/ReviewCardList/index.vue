<script setup>
defineProps(['review'])
</script>

<template>
  <div class="card">
    <Card>
      <template #title>
        <div
          class="user grid grid-cols-[max-content_1fr] gap-x-1rem gap-y-.1px w-fit items-start"
        >
          <nuxt-img
            :src="'/images/users/' + review.user.photo + '.png'"
            class="w-3rem h-3rem rounded-full bg-[var(--indigo-100)] col-[1/2] row-[1/3]"
            :alt="review.user.name"
          />

          <h6 class="text-1rem w-fit capitalize col-[2/3] row-[1/2]">
            {{ review.user.name }}
          </h6>

          <Rating
            class="col-[2/3] row-[2/3]"
            v-model="review.rating"
            :cancel="false"
            readonly
          >
          </Rating>
        </div>
      </template>
      <template #content>
        <p class="color-[var(--bluegray-700)]">
          {{ review.description }}
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-rating .p-rating-item .p-rating-icon) {
  font-size: 13px !important;
  color: var(--yellow-500);
}

:deep(.p-rating) {
  gap: 0.2rem;
}
</style>
