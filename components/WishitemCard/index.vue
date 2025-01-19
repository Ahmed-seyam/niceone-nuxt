<script setup>
const props = defineProps(['wishitem'])
const rating = ref(props.wishitem ? props.wishitem.average_rating : 0)

const { locale, t } = useLang()

const router = useRouter()
const navigate = (e, id) => {
  if (!e.target.classList.contains('do_not_navigate')) {
    router.push({
      path: '/products/' + props.wishitem.id,
      params: { productId: 'props.wishitem.id' },
    })
  }
}

const wishlistStore = stores.wishlistStore

const wishitemIsBeingRemoverd = ref(false)

const deleteWishitem = async (productId) => {
  if (wishitemIsBeingRemoverd.value) return

  wishitemIsBeingRemoverd.value = true
  await wishlistStore.deleteWishitem(productId)

  wishitemIsBeingRemoverd.value = false
}
</script>

<template>
  <div
    @click="navigate($event, wishitem.id)"
    class="relative shadow-[0_0_1rem_rgba(0,0,0,.05)] pointer items-center product__in__list p-[.8rem_.8rem_.8rem_.8rem] grid grid-rows-[min-content_min-content] grid-cols-[1fr] gap-.5rem rounded-[1rem] bg-white overflow-hidden"
  >
    <img
      :src="'/images/products/' + wishitem.image"
      class="col-[1/2] m-auto row-[1/2] !h-9rem max-h-9rem object-contain bg-[var(--bluegray-50)] rounded-1rem"
      alt=""
    />

    <p class="text-[.95rem] italic font-thin color-[var(--gray-800)] w-full">
      {{ wishitem.brand ? wishitem.brand.name : '' }}
    </p>

    <h3
      class="text-[1rem] leading-[1.1rem] capitalize color-[var(--gray-900)] w-full"
    >
      {{ wishitem[$filters.t('name_', locale)] }}
    </h3>

    <Rating v-model="rating" readonly :cancel="false" />

    <div class="absolute right-.7rem top-.7rem rounded-.4rem do_not_navigate">
      <Button
        :severity="wishitemIsBeingRemoverd ? 'secondary' : 'danger'"
        text
        class="!w-2rem !h-2rem !m-0 !p-0 !flex !items-center !justify-center do_not_navigate"
        rounded
        v-tooltip.bottom="t('unlike')"
        @click="deleteWishitem(wishitem.id)"
      >
        <div
          i-carbon:circle-dash
          class="do_not_navigate !color-[var(--gray-500)] spin"
          v-if="wishitemIsBeingRemoverd"
        ></div>
        <div
          v-else
          i-carbon:favorite-filled
          class="color-[var(--red-300)] m-auto text-1.1rem do_not_navigate"
        ></div>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  color: var(--yellow-500) !important;
}

:deep(.p-rating .p-rating-icon) {
  width: 0.9rem !important;
  height: 0.9rem !important;
}
</style>
