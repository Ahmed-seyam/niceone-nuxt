export const getMyAccount = () =>
  useMyFetch(`/api/v1/user/me`, {
    method: 'GET',
  })

export const login = (body) =>
  useMyFetch(`/api/v1/user/login`, {
    method: 'POST',
    body,
  })

export const signup = (body) =>
  useMyFetch(`/api/v1/user/signup`, {
    method: 'POST',
    body,
  })

export const logout = () =>
  useMyFetch(`/api/v1/user/logout`, {
    method: 'GET',
  })

export const isLoggedIn = () =>
  useMyFetch(`/api/v1/user/is-logged-in`, {
    method: 'GET',
  })
export const forgotPassword = (body) =>
  useMyFetch(`/api/v1/user/forgotPassword`, {
    method: 'POST',
    body,
  })

export const resetPassword = (body, token) =>
  useMyFetch(`/api/v1/user/resetPassword/${token}`, {
    method: 'PATCH',
    body,
  })

export const activateUser = (token) =>
  useMyFetch(`/api/v1/user/activate-user/${token}`, {
    method: 'GET',
  })

export const updateMyPassword = (body) =>
  useMyFetch(`/api/v1/user/updateMyPassword`, {
    method: 'PATCH',
    body,
  })

export const updateMe = (body) =>
  useMyFetch(`/api/v1/user/updateMe`, {
    method: 'PATCH',
    body,
  })

export const deleteMyAccount = () =>
  useMyFetch(`/api/v1/user/deleteMe`, {
    method: 'DELETE',
  })
