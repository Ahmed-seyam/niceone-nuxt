export const fetchCategories = (query) =>
  useMyFetch(`/api/v1/product`, {
    query,
  })
