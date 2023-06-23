export const fetchReviewsOfProduct = (productId) =>
  useMyFetch(`/api/v1/review/get-product-reviews/${productId}`, {
    method: 'GET',
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
