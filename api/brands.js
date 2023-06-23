export const fetchBrands = (query) =>
  useMyFetch(`/api/v1/brand`, {
    query,
  })

export const fetchOneBrand = (brandId) => useMyFetch(`/api/v1/brand/${brandId}`)

export const createBrand = (body) =>
  useMyFetch(`/api/v1/brand`, {
    method: 'POST',
    body,
  })

export const updateBrand = (body, id) =>
  useMyFetch(`/api/v1/brand/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteBrand = (id) =>
  useMyFetch(`/api/v1/brand/${id}`, {
    method: 'DELETE',
  })
