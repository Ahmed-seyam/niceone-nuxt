<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'

AppSetup()
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput

useHead({
  title: app.name,
  titleTemplate: '%s ',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'perfumes shop',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }],
})

const direction: any = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')

const categoriesStore = stores.categoriesStore;

(async () => {
  await categoriesStore.fetchCategories()
})()
</script>

<template>
  <Body :dir="direction" class="antialiased duration-300 transition-colors text-gray-800 bg-white overscroll-y-none">
    <div id="app" class="bg-grey-light-1 !ltr:font-[Karla,sans-serif]">
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />

      <NuxtPage />
      <Toast />

      <div id="alerts"></div>
    </div>
  </Body>
</template>
