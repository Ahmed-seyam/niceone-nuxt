export const fetchOffers = (query) =>
  useMyFetch(`/api/v1/offer`, {
    query,
  })

export const fetchOneOffer = (offerId) => useMyFetch(`/api/v1/offer/${offerId}`)

export const createOffer = (body) =>
  useMyFetch(`/api/v1/offer`, {
    method: 'POST',
    body,
  })

export const updateOffer = (body, id) =>
  useMyFetch(`/api/v1/offer/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteOffer = (id) =>
  useMyFetch(`/api/v1/offer/${id}`, {
    method: 'DELETE',
  })

export const addProductsToOffer = (offerId, productIds) =>
  useMyFetch(`/api/v1/offer/add-products/${offerId}`, {
    method: 'PATCH',
    body: {
      productIds,
    },
  })
