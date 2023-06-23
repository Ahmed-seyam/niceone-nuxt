export const fetchBanners = (query) =>
  useMyFetch(`/api/v1/banner`, {
    query,
  })

export const fetchOneBanner = (bannerId) =>
  useMyFetch(`/api/v1/banner/${bannerId}`)

export const createBanner = (body) =>
  useMyFetch(`/api/v1/banner`, {
    method: 'POST',
    body,
  })

export const updateBanner = (body, id) =>
  useMyFetch(`/api/v1/banner/${id}`, {
    method: 'PATCH',
    body,
  })

export const deleteBanner = (id) =>
  useMyFetch(`/api/v1/banner/${id}`, {
    method: 'DELETE',
  })

export const addImagesToBanner = (bannerId, body) =>
  useMyFetch(`/api/v1/banner/${bannerId}/add-images-to-banner`, {
    method: 'PATCH',
    body,
  })

export const deleteImagesOfBanner = (bannerId, photoId) =>
  useMyFetch(`/api/v1/banner/${bannerId}/delete-image-of-banner/${photoId}`, {
    method: 'DELETE',
  })
