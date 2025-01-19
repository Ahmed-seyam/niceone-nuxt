import { defineStore } from 'pinia'

interface CartItem {
  id: string
  quantity: number
  product: { id: string }
  variant: { id: string }
  variant_hierarchy: string[]
}

export const useCart = defineStore('cart', () => {
  // data
  const cart: any = ref(null)
  const summary: any = ref(null)

  const getCart = computed(() => cart.value)
  const getSummary = computed(() => summary.value)

  const getNumberOfItems = computed(() => cart.value?.length || 0)

  const fetchMyCart = catchAsync(async () => {
    if (!stores.authStore.isUserExists) return
    const data: { data: { doc: { items: CartItem[] } } } | any =
      await useMyFetch('/api/v1/cart')

    if (data) {
      cart.value = data.data.doc.items
      summary.value = data.data.doc.summary
    }
  })

  const createCartItem = catchAsync(async (cartItem: CartItem) => {
    if (!stores.authStore.isUserExists) return
    const data: { data: { doc: { items: CartItem[] } } } | any =
      await useMyFetch('/api/v1/cart', {
        method: 'post',
        body: {
          product: cartItem.product,
          variant: cartItem.variant,
          quantity: cartItem.quantity,
          variant_hierarchy: cartItem.variant_hierarchy,
        },
      })

    if (data) {
      cart.value = data.data.doc.items
      summary.value = data.data.doc.summary
    }
  })

  const updateCartItem = catchAsync(async (cartItem: CartItem) => {
    if (!cartItem.quantity) return

    const data = await useMyFetch(`/api/v1/cart/${cartItem.id}`, {
      method: 'PATCH',
      body: {
        quantity: cartItem.quantity,
        variant: cartItem.variant,
        product: cartItem.product,
      },
    })

    cart.value?.forEach((item) => {
      if (item.id === cartItem.id) item.quantity = cartItem.quantity
    })

    if (data) {
      summary.value = data.data.doc.summary
    }
  })

  const deleteCartItem = catchAsync(async (id: string) => {
    if (!id) return

    const data = await useMyFetch(`/api/v1/cart/${id}`, {
      method: 'DELETE',
    })

    const index = cart.value?.findIndex((item) => item.id === id)

    if (index > -1) cart.value?.splice(index, 1)

    console.log(cart.value, index)
    if (data) {
      summary.value = data.data.doc.summary
    }
  })

  return {
    fetchMyCart,
    getCart,
    getNumberOfItems,
    updateCartItem,
    deleteCartItem,
    getSummary,
    createCartItem,
  }
})
