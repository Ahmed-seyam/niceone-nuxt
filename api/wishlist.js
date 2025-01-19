export const fetchMyWishlist = (query) => {
  return useMyFetch(`/api/v1/wishlist`, {
    query,
  })
}

export const deleteMyWishlist = () =>
  useMyFetch(`/api/v1/wishlist`, {
    method: 'DELETE',
  })

export const createWishlistItem = (body) =>
  useMyFetch(`/api/v1/wishlist`, {
    method: 'POST',
    body,
  })

export const deleteWishlistItem = (productId) =>
  useMyFetch(`/api/v1/wishlist/${productId}`, {
    method: 'DELETE',
  })
