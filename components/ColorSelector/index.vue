<script setup>
const selectedSize = ref(null)
const selectedColor = ref(null)

const { t, locale } = useLang()
const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))
</script>

<template>
  <section class="m-x-2rem">
    <h4 class="m-b-1rem">اختر لون</h4>

    <div class="flex items-center">
      <div
        class="transition-all border-3 pointer !w-3rem !h-3rem rounded-full m-l-.7rem justify-center w-fit"
        v-for="color in colorOptions"
        :style="{
          backgroundColor: color.value,
          borderColor: color.value,
        }"
        @click="selectedColor = color.value"
        :class="{
          'active_color border-3 !border-[var(--indigo-300)]':
            color.value === selectedColor,
        }"
      ></div>
    </div>
  </section>
</template>
