import { defineStore } from 'pinia'
import * as bannersAPI from '@/api/banners'

export const useBanners = defineStore('banners', () => {
  // data
  const banners: any = reactive({})
  const fetchBannersLoading = ref(false)
  const bannersFetchedInClient = ref(false)
  const curBanner = ref(null)

  const headingBanners: any = reactive({})
  const fetchHeadingBannersLoading = ref(false)
  const headingBannersFetchedInClient = ref(false)

  // getters
  const getBanners = computed(() => banners)
  const getHeadingBanners = computed(() => headingBanners)
  const getOneBanner = computed(() => (catId: string) => banners[catId])
  const getCurBanner = computed(() => curBanner.value)

  // actions
  const fetchBanners = catchAsync(async () => {
    if (fetchBannersLoading.value || bannersFetchedInClient.value) return
    fetchBannersLoading.value = true

    const data: any = await bannersAPI.fetchBanners()

    data.data.forEach((Banner: any) => {
      banners[Banner.id] = Banner
    })

    console.log(data.data)

    if (process.client) bannersFetchedInClient.value = true

    fetchBannersLoading.value = false
  })

  const fetchHeadingBanners = catchAsync(async () => {
    if (fetchHeadingBannersLoading.value || headingBannersFetchedInClient.value)
      return
    fetchHeadingBannersLoading.value = true

    const data: any = await bannersAPI.fetchBanners({ is_header: true })

    data.data.forEach((Banner: any) => {
      headingBanners[Banner.id] = Banner
    })

    console.log(data.data)

    if (process.client) headingBannersFetchedInClient.value = true

    fetchHeadingBannersLoading.value = false
  })

  const fetchOneBanner = catchAsync(async (id: string) => {
    if (banners[id]) {
      curBanner.value = banners[id]
      return
    }

    const data: any = await bannersAPI.fetchOneBanner(id)
    curBanner.value = data.data
  })

  return {
    getBanners,
    fetchBanners,
    getOneBanner,
    fetchOneBanner,
    getCurBanner,
    fetchHeadingBanners,
    getHeadingBanners,
  }
})
