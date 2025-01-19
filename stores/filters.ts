import { defineStore } from 'pinia'
import * as filterAPI from '@/api/filters'

export const useFilters = defineStore('filters', () => {
  // data
  const filtersMap: any = reactive({})
  const fetchFiltersLoadingMap: any = reactive({})
  const filtersFetchedInClientMap: any = reactive({})
  const rangeTypes: any = reactive({})
  const selectedFiltersMap: any = reactive({})

  // getters
  const getFilters = computed(() => (catId: string) => filtersMap[catId])

  const getSelectedFilters = computed(
    () => (catId: string) => selectedFiltersMap[catId]
  )

  // actions
  const fetchFilters = catchAsync(async (catId: string, curCategory: any) => {
    let categoryId

    if (curCategory.rootCat) {
      categoryId = catId
      catId = curCategory.rootCat
    }

    if (fetchFiltersLoadingMap[catId] || filtersFetchedInClientMap[catId])
      return
    fetchFiltersLoadingMap[catId] = true

    const data: any = await filterAPI.fetchFilters({ category: catId })

    data.data.forEach((filter: any) => {
      categoryId = categoryId ?? filter.category

      if (!filtersMap[categoryId]) {
        filtersMap[categoryId] = reactive({})
        selectedFiltersMap[categoryId] = reactive({})
      }

      filtersMap[categoryId][filter._id] = filter

      selectedFiltersMap[categoryId][filter.property_name] = getInitialValue(
        filter.type,
        filter.min_value,
        filter.max_value
      )
    })

    if (process.client) filtersFetchedInClientMap[catId] = true

    fetchFiltersLoadingMap[catId] = false
  })

  const updateSelectedFiltersForCategory = (
    catId: string,
    prop: string,
    value: any
  ) => {
    selectedFiltersMap[catId][prop] = value
  }

  const resetSelectedFiltersForCategory = (catId: string) => {
    for (let prop in selectedFiltersMap[catId]) {
      if (Array.isArray(selectedFiltersMap[catId][prop]))
        selectedFiltersMap[catId][prop] = []
      else selectedFiltersMap[catId][prop] = ''
    }
  }

  return {
    getFilters,
    fetchFilters,
    updateSelectedFiltersForCategory,
    resetSelectedFiltersForCategory,
    getSelectedFilters,
  }
})

const getInitialValue = (
  type: string,
  min_value: number,
  max_value: number
) => {
  let res
  switch (type) {
    case 'checkbox':
      res = []
      break

    case 'radio':
      res = ''
      break

    case 'range':
      res = [min_value, max_value]
      break

    default:
      res = ''
      break
  }

  return res
}
