export const fetchUsers = (query) =>
  useMyFetch(`/api/v1/user`, {
    query,
  })

export const fetchOneUser = (userId) => useMyFetch(`/api/v1/user/${userId}`)

export const updateUser = (body, id) =>
  useMyFetch(`/api/v1/user/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteUser = (id) =>
  useMyFetch(`/api/v1/user/${id}`, {
    method: 'DELETE',
  })
