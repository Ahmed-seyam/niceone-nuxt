<script setup>
defineProps(['heading', 'icon', 'products', 'withButton'])
const drag = ref(false)
const navigate = () => {}

const { t, locale } = useLang()

const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))
</script>

<template>
  <div
    class="grid grid-cols-2 gap-5 grid-rows-[min-content_max-content]"
    v-if="products"
  >
    <h3 class="text-1.5rem autogrid w-fit gap-1rem">
      <div
        :class="icon"
        class="col-[1/2] row-[1/2] color-[var(--bluegray-500)]"
      ></div>

      {{ heading }}
    </h3>

    <Button
      severity="primary"
      rounded
      class="!text-[.9rem] w-fit justify-self-end"
      @click="$emit('buttonClicked')"
      v-if="withButton"
    >
      {{ t('button.see_all') }}
    </Button>

    <Splide
      v-if="locale"
      class="col-[1/3] row-[2/3] splide-carousel__container rounded-[1rem] overflow-hidden"
      :options="{
        autoWidth: true,
        pagination: false,
        direction: direction,
        arrows: false,
      }"
      :has-track="false"
    >
      <SplideTrack class="splide-carousel__track h-[100%] w-[100%]">
        <SplideSlide
          v-for="product in products"
          class="w-[auto] h-[100%] p-y-[2rem] p-x-[.6rem]"
          @mousedown="drag = false"
          @mousemove="drag = true"
          @mouseup="drag ? (drag = false) : navigate($event)"
        >
          <product-main-card :product="product"></product-main-card>
        </SplideSlide>
      </SplideTrack>
    </Splide>
  </div>
</template>

<style scoped>
:deep(.p-rating .p-rating-item .p-rating-icon) {
  font-size: 13px !important;
}

:deep(.p-rating) {
  gap: 0.2rem;
}

:deep(.splide__list) {
  display: flex !important;
}
</style>
