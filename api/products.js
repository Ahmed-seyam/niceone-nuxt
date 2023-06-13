export const fetchProducts = (query) =>
  useMyFetch(`/api/v1/product`, {
    query,
  })

// export const fetchProducts = () => {
//   return useMyFetch('/api/v1/product')
// }
