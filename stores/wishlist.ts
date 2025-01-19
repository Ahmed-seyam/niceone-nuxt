import { defineStore } from 'pinia'
import * as wishlistAPI from '@/api/wishlist'

export const useWishlist = defineStore('wishlist', () => {
  const myWishlist: any = reactive({})
  const myWishlistLoading: any = ref(false)
  const myWishlistFetchedInClient: any = ref(false)

  const getMyWishlist = computed(() => myWishlist)
  const isWishlisted = computed(
    () => (id: string) => myWishlist[id] ? true : false
  )

  const getNumberOfItems = computed(() => Object.keys(myWishlist).length)

  const fetchMyWishlist = catchAsync(async (query: any) => {
    if (myWishlistLoading.value || myWishlistFetchedInClient.value) return

    myWishlistLoading.value = true

    const data: any = await wishlistAPI.fetchMyWishlist(query)

    if (data.data) {
      for (const index in data.data) {
        myWishlist[data.data[index].product.id] = data.data[index].product
      }

      if (process.client) {
        myWishlistFetchedInClient.value = true
      }
    }

    myWishlistLoading.value = false
  })

  const toggleProductToWishlist = catchAsync(
    async (productId: string, product: any) => {
      if (!productId) return
      if (myWishlist[productId]) {
        await wishlistAPI.deleteWishlistItem(productId)
        delete myWishlist[productId]

        Alert('info', 'removed from wishlist')
      } else {
        await wishlistAPI.createWishlistItem({ product: productId })
        myWishlist[productId] = product
        Alert('success', 'added to wishlist')
      }
    }
  )

  const deleteWishitem = catchAsync(async (productId: string) => {
    await wishlistAPI.deleteWishlistItem(productId)
    delete myWishlist[productId]

    Alert('success', 'removed successfully')
  })

  return {
    getMyWishlist,
    fetchMyWishlist,
    toggleProductToWishlist,
    isWishlisted,
    deleteWishitem,
    getNumberOfItems,
  }
})
