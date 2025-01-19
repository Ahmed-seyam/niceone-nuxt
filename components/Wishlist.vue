<script setup>
const props = defineProps(['wishlist'])

const { t, locale } = useLang()

const visible = ref(false)

const open = () => {
  visible.value = true
}

// Wishlist
const wishlistStore = stores.wishlistStore
const wishlist = computed(() => wishlistStore.getMyWishlist)

defineExpose({
  open,
})
</script>

<template>
  <div class="card flex justify-content-center">
    <Sidebar
      v-model:visible="visible"
      position="left"
      class="!w-full !md:w-30rem relative !bg-[var(--gray-100)] grid grid-rows-[min-content_1fr_max-content]"
    >
      <div
        class="absolute uppercase font-600 bg-white flex items-center justify-start text-[1.5rem] p-x-[1.5rem] w-[100%] p-y-1.2rem z-[-1] left-0% top-[0]"
      >
        <div i-carbon:list class="color-[var(--gray-500)]"></div>
        <h3 class="self-center m-auto">
          {{ t('wishlist') }}
        </h3>
      </div>

      <div
        class="items grid grid-cols-2 p-t-1.5rem gap-1.5rem m-b-2rem"
        v-if="wishlist && Object.keys(wishlist).length > 0"
      >
        <wishitem-card v-for="wishitem in wishlist" :wishitem="wishitem">
        </wishitem-card>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center gap-[4rem] py-[2rem] min-h-[70vh]"
      >
        <img
          src="@/assets/illustrations/favourites.svg"
          class="w-[30%] max-w-[10rem] col-[1/-1]"
          alt="empty"
        />

        <p class="text-[1.2rem] md:text-[1.5rem] col-[1/-1] capitalize">
          Your wishlist is empty
        </p>
      </div>
    </Sidebar>
  </div>
</template>
