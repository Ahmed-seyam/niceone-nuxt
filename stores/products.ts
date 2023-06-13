import { defineStore } from 'pinia'
import * as productsAPI from '@/api/products'

export const useProducts = defineStore('products', () => {
  const products: any = reactive({})
  const fetchProductsLoading = ref(false)
  const productsFetchedInClient = ref(false)

  const fetchProducts = catchAsync(async () => {
    if (fetchProductsLoading.value || productsFetchedInClient.value) return
    fetchProductsLoading.value = true

    const data: any = await productsAPI.fetchProducts()

    data.data._rawValue.data.forEach((product: any) => {
      products[product.id] = product
    })

    fetchProductsLoading.value = false
    if (process.client) productsFetchedInClient.value = true
  })

  return {
    products,
    fetchProducts,
  }
})
