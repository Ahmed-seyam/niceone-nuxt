export const fetchProducts = (query) =>
  useMyFetch(`/api/v1/product`, {
    query,
  })

export const fetchOneProduct = (id) => useMyFetch(`/api/v1/product/${id}`, {})

export const createProduct = (body) =>
  useMyFetch(`/api/v1/product`, {
    method: 'POST',
    body,
  })

// export const updateProduct = (body, id) =>
//   useMyFetch(`/api/v1/product/${id}`, {
//     method: 'PATCH',
//     body,
//   })

export const deleteProduct = (id) =>
  useMyFetch(`/api/v1/product/${id}`, {
    method: 'DELETE',
  })
