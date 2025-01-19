import { createPinia } from 'pinia'

const pinia = createPinia()
export const stores = {
  productsStore: useProducts(pinia),
  reviewsStore: useReviews(pinia),
  categoriesStore: useCategories(pinia),
  filtersStore: useFilters(pinia),
  bannersStore: useBanners(pinia),
  authStore: useAuth(pinia),
  wishlistStore: useWishlist(pinia),
  cartStore: useCart(pinia),
}
