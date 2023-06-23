export const fetchReplies = (query) =>
  useMyFetch(`/api/v1/reply`, {
    query,
  })

export const fetchOneReply = (replyId) => useMyFetch(`/api/v1/reply/${replyId}`)

export const createReply = (body) =>
  useMyFetch(`/api/v1/reply`, {
    method: 'POST',
    body,
  })

export const updateReply = (body, id) =>
  useMyFetch(`/api/v1/reply/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteReply = (id) =>
  useMyFetch(`/api/v1/reply/${id}`, {
    method: 'DELETE',
  })
