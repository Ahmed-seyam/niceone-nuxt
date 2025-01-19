import { defineStore } from 'pinia'
import * as productsAPI from '@/api/products'

export const useProducts = defineStore('products', () => {
  const productsMap: any = reactive({})
  const fetchProductsMapLoading: any = reactive({})
  const productsMapFetchedInClient: any = reactive({})

  const getProducts = computed(() => (catId: string) => productsMap[catId])
  const isProductsAreBeingFetched = computed(
    () => (catId: string) => fetchProductsMapLoading[catId]
  )

  const isProductsHasBeenFetchedInClient = computed(
    () => (catId: string) => productsMapFetchedInClient[catId]
  )

  const fetchProducts = catchAsync(
    async (query: any, categoryId: string, refetch: Boolean) => {
      console.log(query)
      if (refetch) {
        fetchProductsMapLoading[categoryId] = false
        productsMapFetchedInClient[categoryId] = false
        deleteItemsInObject(productsMap[categoryId])
      }

      if (
        fetchProductsMapLoading[categoryId] ||
        productsMapFetchedInClient[categoryId]
      )
        return

      fetchProductsMapLoading[categoryId] = true

      const data: any = await productsAPI.fetchProducts(query)

      if (data.data) {
        for (const index in data.data) {
          if (!productsMap[data.data[index].category])
            productsMap[data.data[index].category] = reactive({})

          productsMap[data.data[index].category][data.data[index].id] =
            data.data[index]
        }

        if (process.client) {
          productsMapFetchedInClient[categoryId] = true
        }
      }

      fetchProductsMapLoading[categoryId] = false
    }
  )

  const setProductMap = (categories: any) => {
    for (const prop in categories) {
      productsMap[prop] = reactive({})
      fetchProductsMapLoading[prop] = false
      productsMapFetchedInClient[prop] = false
    }
  }

  // Fetch One Product
  const productMap: any = {
    curProduct: ref(null),
    curProductForOverview: ref(null),
  }

  const getCurProduct = computed(() => productMap['curProduct'].value)

  const getCurProductForOverview = computed(
    () => productMap['curProductForOverview'].value
  )

  const fetchOneProduct = catchAsync(
    async (id: string, is_overview: Boolean) => {
      let productProp = is_overview ? 'curProductForOverview' : 'curProduct'

      if (
        productMap[productProp].value &&
        productMap[productProp].value.id === id
      )
        return

      productMap[productProp].value = null

      const data: any = await productsAPI.fetchOneProduct(id)

      productMap[productProp].value = data.data
    }
  )

  const fetchSimilarProductsLoading = ref(false)
  const similarProducts: any = reactive({})
  const getSimilarProducts = computed(() => similarProducts)

  const fetchSimilarProducts = catchAsync(async (query: any, id: string) => {
    if (fetchSimilarProductsLoading.value) return

    deleteItemsInObject(similarProducts)

    fetchSimilarProductsLoading.value = true

    const data: any = await productsAPI.fetchProducts(query)

    if (data.data) {
      for (const index in data.data) {
        if (data.data[index].id !== id)
          similarProducts[data.data[index].id] = data.data[index]
      }
    }

    fetchSimilarProductsLoading.value = false
  })

  return {
    getCurProductForOverview,
    getProducts,
    fetchProducts,
    setProductMap,
    isProductsAreBeingFetched,
    isProductsHasBeenFetchedInClient,
    getCurProduct,
    fetchOneProduct,
    fetchSimilarProducts,
    getSimilarProducts,
  }
})
