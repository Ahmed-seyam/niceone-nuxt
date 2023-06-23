export const fetchCoupons = (query) =>
  useMyFetch(`/api/v1/coupon`, {
    query,
  })

export const fetchOneCoupon = (couponId) =>
  useMyFetch(`/api/v1/coupon/${couponId}`)

export const createCoupon = (body) =>
  useMyFetch(`/api/v1/coupon`, {
    method: 'POST',
    body,
  })

export const updateCoupon = (body, id) =>
  useMyFetch(`/api/v1/coupon/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteCoupon = (id) =>
  useMyFetch(`/api/v1/coupon/${id}`, {
    method: 'DELETE',
  })
