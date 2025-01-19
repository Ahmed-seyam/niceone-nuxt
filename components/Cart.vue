<script setup>
const { t, locale } = useLang()

const visible = ref(false)
const open = async () => {
  visible.value = true
  if (data) await refresh()
}

defineExpose({
  open,
})

const cartStore = stores.cartStore
const cart = computed(() => cartStore.getCart)
const summary = computed(() => cartStore.getSummary)
const { data, refresh, pending } = await useAsyncData(() =>
  cartStore.fetchMyCart()
)

console.log(cart.value)
</script>

<template>
  <div class="card flex justify-content-center">
    <Sidebar
      v-model:visible="visible"
      class="!w-full !md:w-30rem relative !bg-[var(--bluegray-50)] grid grid-rows-[min-content_1fr_max-content]"
    >
      <div
        class="absolute uppercase font-600 bg-white flex items-center justify-start text-[1.5rem] p-x-[1.5rem] w-[100%] p-y-1.2rem z-[-1] left-0% top-[0]"
      >
        <div i-carbon:list class="color-[var(--gray-500)]"></div>
        <h3 class="self-center m-auto">
          {{ t('cart') }}
        </h3>
      </div>

      <template v-if="cart && cart.length > 0">
        <div
          class="items grid grid-cols-1 content-start items-start p-t-2rem gap-4 m-b-2rem !min-h-60vh"
        >
          <cart-item
            class="h-min"
            v-for="item in cart"
            :id="item.id"
            :name="item[$filters.t('name_', locale)]"
            :image="item.image || item.product.image"
            :price="item.item_price_fotmatted.value"
            :original_price="item.item_price_fotmatted.original_price_formatted"
            :selected_options="item.options"
            :quantity="item.quantity"
            :productId="item.product.id"
            :variant-id="item.variant?.id"
            :discount_type="item.item_price_fotmatted.discountType"
          >
          </cart-item>
        </div>
        <div
          class="checkout sticky bottom-0 w-[100%] color-[var(--bluegray-900)] z-9"
        >
          <div class="summary text-1.2rem rounded-[1rem] basicshadow !bg-white">
            <h6
              class="text-[1.1rem] p-[2rem_2rem_0] text-center color-[var(--indigo-500)] autogrid items-center w-[fit-content]"
            >
              <div i-carbon:menu></div>

              {{ t('order_summary') }}
            </h6>

            <ul class="text-1rem p-[1rem_2rem]">
              <li class="autogrid justify-between">
                <span class="font-bold">{{ t('original_price') }}</span>
                <span>{{ summary.totals_formatted.originalPrice }}</span>
              </li>

              <li class="autogrid justify-between">
                <span class="font-bold">{{ t('discount') }}</span>
                <span>{{ summary.totals_formatted.totalDiscoundAmount }}</span>
              </li>

              <li class="autogrid justify-between">
                <span class="font-bold">{{ t('shipping') }}</span>
                <span>{{ summary.totals_formatted.shipping }}</span>
              </li>
            </ul>

            <div
              class="color-[var(--indigo-600)] p-[.5rem_2rem] font-bold text-[1rem] flex justify-between items-center"
            >
              {{ t('total_price_is') }}
              <span class="text-black text-[1.4rem] font-normal">
                {{ summary.totals_formatted.totalWithoutShipping }}
              </span>
            </div>

            <div class="flex p-[1rem_2rem_1rem]">
              <Button
                severity="secondary"
                class="!bg-gray-900 w-full !p-y-.5rem"
              >
                <span class="w-full !text-center text-[1rem]">
                  {{ t('pay_now') }}

                  <span class="text-[1.2rem] color-[var(--yellow-500)]">
                    {{ summary.totals_formatted.totalWithoutShipping }}
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </template>

      <div v-else-if="pending" class="flex items-center justify-center h-60vh">
        <ProgressSpinner></ProgressSpinner>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center gap-[4rem] py-[2rem] min-h-[70vh]"
      >
        <img
          src="@/assets/illustrations/empty_cart.svg"
          class="w-[30%] min-w-[15rem] col-[1/-1]"
          alt="empty"
        />

        <p class="text-[1.2rem] md:text-[1.5rem] col-[1/-1] capitalize">
          Your cart is empty
        </p>
      </div>
    </Sidebar>
  </div>
</template>
