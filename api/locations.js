export const fetchLocations = (query) =>
  useMyFetch(`/api/v1/location`, {
    query,
  })

export const fetchOneLocation = (locationId) =>
  useMyFetch(`/api/v1/location/${locationId}`)

export const createLocation = (body) =>
  useMyFetch(`/api/v1/location`, {
    method: 'POST',
    body,
  })

export const updateLocation = (body, id) =>
  useMyFetch(`/api/v1/location/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteLocation = (id) =>
  useMyFetch(`/api/v1/location/${id}`, {
    method: 'DELETE',
  })

export const deleteAllLocations = () =>
  useMyFetch(`/api/v1/location`, {
    method: 'DELETE',
  })
