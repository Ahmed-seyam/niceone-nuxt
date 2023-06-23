export const fetchCurrencies = (query) =>
  useMyFetch(`/api/v1/currency`, {
    query,
  })

export const fetchOneCurrency = (currencyId) =>
  useMyFetch(`/api/v1/currency/${currencyId}`)

export const createCurrency = (body) =>
  useMyFetch(`/api/v1/currency`, {
    method: 'POST',
    body,
  })

export const updateCurrency = (body, id) =>
  useMyFetch(`/api/v1/currency/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteCurrency = (id) =>
  useMyFetch(`/api/v1/currency/${id}`, {
    method: 'DELETE',
  })
