export const fetchTaxes = (query) =>
  useMyFetch(`/api/v1/tax`, {
    query,
  })

export const fetchOneTax = (taxId) => useMyFetch(`/api/v1/tax/${taxId}`)

export const createTax = (body) =>
  useMyFetch(`/api/v1/tax`, {
    method: 'POST',
    body,
  })

export const updateTax = (body, id) =>
  useMyFetch(`/api/v1/tax/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteTax = (id) =>
  useMyFetch(`/api/v1/tax/${id}`, {
    method: 'DELETE',
  })
