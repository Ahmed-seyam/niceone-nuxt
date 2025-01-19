<script setup>
defineProps(['review'])
</script>

<template>
  <div class="basicshadow w-[20rem] rounded-[2.5rem] !bg-[white] p-1.5rem">
    <div
      class="m-b-2rem user grid grid-cols-[max-content_1fr] gap-x-1rem gap-y-.1px w-fit items-start"
    >
      <nuxt-img
        :src="'/images/users/' + review.user.photo"
        class="w-2.5rem h-2.5rem rounded-full bg-[var(--indigo-100)] col-[1/2] row-[1/3]"
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
      ></Rating>
    </div>

    <pre
      class="text-1rem overflow-y-scroll max-h-[10rem] min-h-8rem color-[var(--bluegray-700)]"
      >{{ review.description }}</pre
    >
  </div>
</template>
