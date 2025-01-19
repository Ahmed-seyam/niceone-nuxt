<script setup>
const { t, locale } = useLang()

const route = useRoute()
const props = defineProps(['categoryId'])
const catIdRef = ref(route.params.categoryId)

const filter = ref(null)

const openFilter = () => {
  filter.value.openFilter()
}

const productsStore = stores.productsStore
const categoriesStore = stores.categoriesStore
const curCategory = computed(() => categoriesStore.getCurCategory)

const products = computed(() => productsStore.getProducts(catIdRef.value))
const loading = computed(() =>
  productsStore.isProductsAreBeingFetched(catIdRef.value)
)

const isProductsFetched = computed(() =>
  productsStore.isProductsHasBeenFetchedInClient(catIdRef.value)
)

await useAsyncData('categories', () =>
  categoriesStore.fetchOneCategory(route.params.categoryId)
)

await useAsyncData('products', () =>
  productsStore.fetchProducts(
    {
      category_hierarchy: route.params.categoryId,
    },
    route.params.categoryId
  )
)

const refetchProducts = async (selectedFiltersData) => {
  await productsStore.fetchProducts(
    {
      category_hierarchy: route.params.categoryId,
      ...selectedFiltersData,
    },

    route.params.categoryId,
    true
  )
}
</script>

<template>
  <div class="p-[2rem_3rem] min-h-[100vh]">
    <header
      v-if="curCategory && curCategory.id"
      class="bg-white rounded-[2rem] p-[2rem_3rem] relative autogrid justify-between items-start overflow-hidden basicshadow"
    >
      <img
        src="/images/background_1.svg"
        class="absolute left-0 top-0 w-[100%] h-[auto] object-contain opacity-[7%]"
        alt=""
      />

      <div>
        <h2 class="w-[fit-content] text-[2rem] font-extranbold m-b-1rem">
          {{ curCategory[$filters.t('title_', locale)] }}
        </h2>

        <p class="color-[var(--bluegray-500)] font-bold">
          {{ curCategory[$filters.t('sub_title_', locale)] }}
        </p>
      </div>

      <img
        v-if="curCategory && curCategory.thumb"
        :src="'/images/categorys/' + curCategory.thumb"
        class="w-[8rem] h-[8rem] p-1rem bg-[var(--bluegray-100)] rounded-full"
        alt=""
      />
    </header>

    <main
      v-if="products && Object.keys(products).length > 0"
      class="grid w-full grid-cols-[repeat(auto-fit,minMax(max-content,18rem))] p-[2rem_0] gap-[2rem]"
    >
      <product-main-card
        v-for="product in products"
        :product="product"
      ></product-main-card>
    </main>

    <div v-else-if="loading" class="flex items-center justify-center h-60vh">
      <ProgressSpinner></ProgressSpinner>
    </div>

    <div
      v-else
      class="flex flex-col w-full items-center justify-center gap-[4rem] py-[2rem] min-h-[70vh]"
    >
      <img
        src="@/assets/illustrations/empty_cart.svg"
        class="w-[30%] min-w-[15rem] col-[1/-1]"
        alt="empty"
      />

      <p class="text-[1.2rem] md:text-[1.5rem] col-[1/-1] capitalize">
        There is no items
      </p>
    </div>

    <Button
      severity="info"
      class="element-to-shake-once !bg-[var(--blue-700)] !fixed z-1 ltr:right-3rem rtl:left-3rem bottom-3rem justify-start"
      @click="openFilter"
      rounded
    >
      <div
        class="grid grid-cols-[min-content_1fr] gap-5 justify-items-start !w-[100%] !p-[0rem_0] items-center"
      >
        <div i-carbon:filter class="w-[1.3rem]"></div>

        <span class="!text-1.3rem ltr:p-r-2rem capitalize rtl:p-l-2rem">
          {{ t('filter') }}
        </span>
      </div>
    </Button>

    <app-filter
      ref="filter"
      :curCategory="curCategory"
      v-if="curCategory"
      @filter-applied="refetchProducts($event)"
      @filter-reseted="refetchProducts({})"
    ></app-filter>
  </div>
</template>
