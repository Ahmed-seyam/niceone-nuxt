export const fetchFilters = (query) => {
  return useMyFetch(`/api/v1/filter?sort=order`, {
    query,
  })
}

export const fetchOneFilter = (filterId) =>
  useMyFetch(`/api/v1/filter/${filterId}`)

export const createFilter = (body) =>
  useMyFetch(`/api/v1/filter`, {
    method: 'POST',
    body,
  })

export const updateFilter = (body, id) =>
  useMyFetch(`/api/v1/filter/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteFilter = (id) =>
  useMyFetch(`/api/v1/filter/${id}`, {
    method: 'DELETE',
  })
