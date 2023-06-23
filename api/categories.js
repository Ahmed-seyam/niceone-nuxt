export const fetchCategories = (query) =>
  useMyFetch(`/api/v1/category?root=true`, {
    query,
  })

export const fetchOneCategory = (catId) =>
  useMyFetch(`/api/v1/category/${catId}`)

export const createCategory = (body) =>
  useMyFetch(`/api/v1/category`, {
    method: 'POST',
    body,
  })

export const updateCategory = (body, id) =>
  useMyFetch(`/api/v1/category/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteCategory = (id) =>
  useMyFetch(`/api/v1/category/${id}`, {
    method: 'DELETE',
  })

export const addSubCategoriesToCategory = (parentCatId, categories) =>
  useMyFetch(`/api/v1/category/add-sub-categories/${parentCatId}`, {
    method: 'PATCH',
    body: { categories },
  })

export const addAttachedBannersToCategory = (catId, bannersIds) =>
  useMyFetch(`/api/v1/category/add-banners/${catId}`, {
    method: 'PATCH',
    body: { bannersIds },
  })

export const addBrandsToCategory = (catId, brandsIds) =>
  useMyFetch(`/api/v1/category/add-brands/${catId}`, {
    method: 'PATCH',
    body: { brandsIds },
  })
