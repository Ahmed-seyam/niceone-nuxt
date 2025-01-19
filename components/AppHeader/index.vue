<script setup>
const props = defineProps(['banners'])
const drag = ref(false)
const navigate = () => {}

const { t, locale } = useLang()

const splide = ref(null)

const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))
</script>

<template>
  <header class="p-x-[3rem] p-y-[1rem]" v-if="locale">
    <Splide
      class="splide-carousel__container h-[30vw] rounded-[1rem] overflow-hidden"
      :options="{
        autoWidth: true,
        pagination: true,
        direction: direction,
        arrows: false,
      }"
      :has-track="false"
    >
      <SplideTrack class="splide-carousel__track h-[100%] w-[100%]">
        <SplideSlide
          v-for="banner in banners"
          class="min-w-[100%] h-[100%] bg-grey-light-2"
          @mousedown="drag = false"
          @mousemove="drag = true"
          @mouseup="drag ? (drag = false) : navigate($event)"
        >
          <div class="min-w-100">
            <img
              :src="
                '/images/banners/' + banner[$filters.t('large_photo_', locale)]
              "
              alt="banner"
              class="w-[100%] object-cover"
            />
          </div>
        </SplideSlide>
      </SplideTrack>
    </Splide>
  </header>
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
