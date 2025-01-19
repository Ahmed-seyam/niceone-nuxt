<script setup>
const { t, locale } = useLang()

const active = ref(0)

const productsStore = stores.productsStore
const reviewsStore = stores.reviewsStore

const product = computed(() => productsStore.getCurProduct)
const recentReviews = computed(() => reviewsStore.getCurRecentReviews)

const route = useRoute()

await useAsyncData(() => productsStore.fetchOneProduct(route.params.id))

await useAsyncData(() =>
  reviewsStore.fetchRecentReviewsOfProduct(route.params.id)
)

watch(
  () => route.params.id,
  async () => {
    await useAsyncData(() => productsStore.fetchOneProduct(route.params.id))
    await useAsyncData(() =>
      reviewsStore.fetchRecentReviewsOfProduct(route.params.id)
    )
  }
)
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="product__page p-[2rem_3rem]">
        <product-details :product="product" v-if="product"></product-details>

        <TabView
          :activeIndex="active"
          v-if="product"
          class="basicshadow rounded-2rem all overflow-hidden m-t-4rem"
        >
          <TabPanel :header="t('description')">
            <product-description
              :description="product[$filters.t('description_', locale)]"
            ></product-description>
          </TabPanel>

          <TabPanel :header="t('specifications')" v-if="product.specifications">
            <product-specifications></product-specifications>
          </TabPanel>
        </TabView>

        <product-reviews
          class="m-t-4rem"
          v-if="recentReviews && Object.keys(recentReviews).length > 0"
          :reviews="recentReviews"
        ></product-reviews>

        <similar-products v-if="product"></similar-products>
        <div class="related__products"></div>
      </div>
    </NuxtLayout>

    <NuxtPage></NuxtPage>
  </div>
</template>

<style lang="scss" scoped>
.selectButtonSizes {
  & > .p-button {
    border-radius: 0 !important;
    border: 1px solid #ddd !important;
    margin-left: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
}

.active_color {
  transform: scale(0.8);
}

:deep(.p-tabview .p-tabview-nav) {
  padding: 1rem 1rem 0;
}
</style>
