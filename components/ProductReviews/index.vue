<script setup>
const props = defineProps(['reviews'])
const drag = ref(false)
const navigate = () => {}

const { t, locale } = useLang()

const splide = ref(null)

const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))
</script>

<template>
  <div class="grid grid-cols-2 gap-5 grid-rows-[min-content_min-content]">
    <h3 class="text-1.5rem autogrid w-fit gap-1rem">
      <div
        i-carbon:star-filled
        class="col-[1/2] row-[1/2] color-[var(--yellow-500)]"
      ></div>
      {{ t('recent_reviews') }}
    </h3>

    <nuxt-link
      :to="$route.fullPath + '/reviews'"
      class="w-fit justify-self-end"
    >
      <Button severity="primary" rounded class="!text-[.8rem] w-fit">
        {{ t('button.see_all') }}
      </Button>
    </nuxt-link>

    <Splide
      v-if="locale && reviews"
      class="col-[1/3] splide-carousel__container rounded-[1rem] overflow-hidden"
      :options="{
        autoWidth: true,
        pagination: false,
        direction: direction,
        arrows: false,
      }"
      :has-track="false"
    >
      <SplideTrack class="splide-carousel__track h-[20rem] w-[100%]">
        <SplideSlide
          v-for="review in reviews"
          class="w-[auto] p-y-[2rem] p-x-[.6rem]"
          @mousedown="drag = false"
          @mousemove="drag = true"
          @mouseup="drag ? (drag = false) : navigate($event)"
        >
          <review-card :review="review"></review-card>
        </SplideSlide>
      </SplideTrack>
    </Splide>
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

:deep(.splide__list) {
  display: flex !important;
}
</style>
