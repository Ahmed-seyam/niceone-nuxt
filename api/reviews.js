export const fetchReviewsOfProduct = (productId, query = {}) =>
  useMyFetch(`/api/v1/review/get-product-reviews/${productId}`, {
    method: 'GET',
    query,
  })

export const fetchMyReviews = () =>
  useMyFetch(`/api/v1/review/get-my-reviews`, {
    method: 'GET',
  })

export const createReview = (body) =>
  useMyFetch(`/api/v1/review`, {
    method: 'POST',
    body,
  })

export const fetchReviews = (query) =>
  useMyFetch(`/api/v1/review`, {
    query,
  })

export const fetchOneReview = (reviewId) =>
  useMyFetch(`/api/v1/review/${reviewId}`)

export const updateReview = (body, id) =>
  useMyFetch(`/api/v1/review/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteReview = (id) =>
  useMyFetch(`/api/v1/review/${id}`, {
    method: 'DELETE',
  })
