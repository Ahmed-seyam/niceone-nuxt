export const fetchNotifications = (query) =>
  useMyFetch(`/api/v1/notification`, {
    query,
  })

export const markAllNotifcationsAsRead = () =>
  useMyFetch(`/api/v1/notification/make-all-as-read`, {
    method: 'PATCH',
  })

export const createNotification = (body) =>
  useMyFetch(`/api/v1/notification`, {
    method: 'POST',
    body,
  })

export const updateNotification = (body, id) =>
  useMyFetch(`/api/v1/notification/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteNotification = (id) =>
  useMyFetch(`/api/v1/notification/${id}`, {
    method: 'DELETE',
  })

export const deleteAllNotifications = () =>
  useMyFetch(`/api/v1/notification`, {
    method: 'DELETE',
  })
