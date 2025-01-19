<script setup>
const { t } = useLang()

const productsStore = stores.productsStore

const product = computed(() => productsStore.getCurProduct)
const smiliarProducts = computed(() => productsStore.getSimilarProducts)

;(async () =>
  await productsStore.fetchSimilarProducts(
    {
      category_hierarchy: [product.value.category],
    },
    product.value.id
  ))()
</script>

<template>
  <div v-if="smiliarProducts && Object.keys(smiliarProducts).length > 0">
    <product-slider-list
      :icon="'i-carbon:list'"
      :heading="t('similar_products')"
      class="m-t-4rem"
      :products="smiliarProducts"
    ></product-slider-list>
  </div>
</template>
