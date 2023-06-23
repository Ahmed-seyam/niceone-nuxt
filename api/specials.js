export const fetchSpecials = (query) =>
  useMyFetch(`/api/v1/special`, {
    query,
  })

export const fetchOneSpecial = (specialId) =>
  useMyFetch(`/api/v1/special/${specialId}`)

export const createSpecial = (body) =>
  useMyFetch(`/api/v1/special`, {
    method: 'POST',
    body,
  })

export const updateSpecial = (body, id) =>
  useMyFetch(`/api/v1/special/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteSpecial = (id) =>
  useMyFetch(`/api/v1/special/${id}`, {
    method: 'DELETE',
  })

export const addProductsToSpecial = (specialId, productIds) =>
  useMyFetch(`/api/v1/special/add-products/${specialId}`, {
    method: 'PATCH',
    body: {
      productIds,
    },
  })
