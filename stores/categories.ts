import { defineStore } from 'pinia'
import * as categoriesAPI from '@/api/categories'

export const useCategories = defineStore('categories', () => {
  // data
  const categories: any = reactive({})
  const fetchCategoriesLoading = ref(false)
  const categoriesFetchedInClient = ref(false)
  const curCategory = ref(null)
  // getters
  const getCategories = computed(() => categories)
  const getOneCategory = computed(() => (catId: string) => categories[catId])
  const getCurCategory = computed(() => curCategory.value)

  // actions
  const fetchCategories = catchAsync(async () => {
    if (fetchCategoriesLoading.value || categoriesFetchedInClient.value) return
    fetchCategoriesLoading.value = true

    const data: any = await categoriesAPI.fetchCategories()

    data.data.forEach((category: any) => {
      categories[category.id] = category
    })

    if (process.client) categoriesFetchedInClient.value = true

    fetchCategoriesLoading.value = false
  })

  const fetchOneCategory = catchAsync(async (id: string) => {
    if (categories[id]) {
      curCategory.value = categories[id]
      return
    }
    const data: any = await categoriesAPI.fetchOneCategory(id)
    curCategory.value = data.data
  })

  return {
    getCategories,
    fetchCategories,
    getOneCategory,
    fetchOneCategory,
    getCurCategory,
  }
})
