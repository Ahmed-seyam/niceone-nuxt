import { createPinia } from 'pinia'

const pinia = createPinia()
export const stores = {
  productsStore: useProducts(pinia),
}
