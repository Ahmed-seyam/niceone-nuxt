import { defineStore } from 'pinia'
import * as reviewsAPI from '@/api/reviews'

export const useReviews = defineStore('reviews', () => {
  // Fetch One Product
  const curReviews: any = ref(null)
  const curRecentReviews: any = ref(null)

  const getCurRecentReviews = computed(() => curRecentReviews.value)
  const getCurReviews = computed(() => curReviews.value)

  const fetchReviewsOfProduct = catchAsync(async (id: string, query: {}) => {
    if (
      curReviews.value &&
      curReviews.value[0] &&
      curReviews.value[0].product === id
    )
      return

    curReviews.value = null
    const data: any = await reviewsAPI.fetchReviewsOfProduct(id, query)
    curReviews.value = data.data
  })

  const fetchRecentReviewsOfProduct = catchAsync(async (id: string) => {
    if (
      curRecentReviews.value &&
      curRecentReviews.value[0] &&
      curRecentReviews.value[0].product === id
    )
      return
    curRecentReviews.value = null

    const data: any = await reviewsAPI.fetchReviewsOfProduct(id, { limit: 10 })

    curRecentReviews.value = data.data
  })

  return {
    getCurReviews,
    fetchReviewsOfProduct,
    fetchRecentReviewsOfProduct,
    getCurRecentReviews,
  }
})
