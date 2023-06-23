export const fetchMyCart = (query) =>
  useMyFetch(`/api/v1/cart`, {
    query,
  })

export const deleteMyCart = () =>
  useMyFetch(`/api/v1/cart`, {
    method: 'DELETE',
  })

export const fetchCartItem = (id) => useMyFetch(`/api/v1/cart/${id}`)

export const createCartItem = (body) =>
  useMyFetch(`/api/v1/cart`, {
    method: 'POST',
    body,
  })

export const updateCartItem = (body, id) =>
  useMyFetch(`/api/v1/cart/${id}`, {
    method: 'PATCH',
    body,
  })

export const applyCoupon = (body) =>
  useMyFetch(`/api/v1/cart/apply-coupon`, {
    method: 'PATCH',
    body,
  })

export const deleteCartItem = (id) =>
  useMyFetch(`/api/v1/cart/${id}`, {
    method: 'DELETE',
  })
