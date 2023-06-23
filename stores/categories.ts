import { defineStore } from 'pinia'
import * as categoriesAPI from '@/api/categories'

export const useCategories = defineStore('categories', () => {
  // data
  const categories: any = reactive({})
  const fetchCategoriesLoading = ref(false)
  const categoriesFetchedInClient = ref(false)

  // getters
  const getCategories = computed(() => categories)

  // actions
  const fetchCategories = catchAsync(async () => {
    if (fetchCategoriesLoading.value || categoriesFetchedInClient.value) return
    fetchCategoriesLoading.value = true

    const data: any = await categoriesAPI.fetchCategories()

    data.data._rawValue.data.forEach((category: any) => {
      categories[category.id] = category
    })

    fetchCategoriesLoading.value = false
    if (process.client) categoriesFetchedInClient.value = true
  })

  return {
    getCategories,
    fetchCategories,
  }
})
