export const fetchVariants = (query) =>
  useMyFetch(`/api/v1/variant`, {
    query,
  })

export const fetchOneVariant = (variantId) =>
  useMyFetch(`/api/v1/variant/${variantId}`)

export const createVariant = (body) =>
  useMyFetch(`/api/v1/variant`, {
    method: 'POST',
    body,
  })

export const updateVariant = (body, id) =>
  useMyFetch(`/api/v1/variant/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteVariant = (id) =>
  useMyFetch(`/api/v1/variant/${id}`, {
    method: 'DELETE',
  })
