<script setup>
const { t, locale } = useLang()

const props = defineProps([
  'brand',
  'name',
  'image',
  'price',
  'original_price',
  'selected_options',
  'quantity',
  'id',
  'productId',
  'variantId',
  'discount_type',
])

const currentQuantity = ref(props.quantity || 1)

const cartStore = stores.cartStore

const loading = ref(false)
const updateMyCart = async () => {
  if (loading.value) return
  loading.value = true

  await cartStore.updateCartItem({
    id: props.id,
    quantity: currentQuantity.value,
    product: props.productId,
    variant: props.variantId,
  })

  loading.value = false
}

const deleteLoader = ref(false)
const deleteCartItem = async () => {
  if (deleteLoader.value) return
  deleteLoader.value = true

  await cartStore.deleteCartItem(props.id)

  deleteLoader.value = false
}
</script>

<template>
  <div
    class="product__in__list p-1rem grid gap-3 grid-cols-[max-content_1fr_max-content] grid-rows-2 rounded-[2rem] bg-white overflow-hidden basicshadow"
  >
    <img
      :src="'/images/products/' + image"
      class="col-[1/2] row-[1/3] w-[9rem] h-[9rem] p-.5rem bg-[var(--bluegray-50)] rounded-1rem"
      :alt="name"
    />

    <div
      class="details overflow-hidden col-[2/3] row-[1/3] grid gird-cols-1 !items-end grid-rows-[min-content_min-content_min-content_min-content_1fr_min-content]"
    >
      <router-link to="/products/1">
        <h3 class="text-[1rem] color-[var(--blue-800)]">
          {{ name }}
        </h3>
      </router-link>

      <div v-for="option in selected_options">
        {{ t(option.name) }} {{ option['value_' + locale] }}
      </div>

      <div
        class="relative row-[5/6] w-[fit-content] color-[var(--red-800)]"
        v-if="discount_type"
      >
        <div class="relative">
          <span
            class="absolute left-50% top-50% rotate-[-3deg] translate-x-[-40%] translate-y-[-150%] w-[80%] z-3 flex h-[1px] rounded-full bg-[var(--red-700)]"
          ></span>
          {{ original_price }}
        </div>

        <div class="text-[1rem] color-[var(--gray-600)]">
          <span> {{ price }} </span>
        </div>
      </div>

      <div
        class="relative row-[5/6] w-[fit-content] color-[var(--red-800)]"
        v-else
      >
        <div class="text-[1rem] bold color-[var(--gray-800)]">
          <span> {{ original_price }} </span>
        </div>
      </div>
    </div>

    <div
      class="col-[3/4] row-[1/-1] !w-[5rem] flex flex-col justify-between py-[0.2rem] !w-[min-content] !h-full !justfiy-between"
    >
      <div class="flex relative flex-col justify-between items-end w-[2rem]">
        <Button
          :disabled="loading"
          @click="updateMyCart(currentQuantity++)"
          class="!p-.2rem !m-b-1.5rem z-3 !w-[100%] h-[2rem] flex items-center justify-center rounded-[1rem_1rem_0_0] bg-[var(--indigo-500)]"
        >
          <div i-carbon:add></div>
        </Button>

        <input
          :disabled="loading"
          class="!w-[100%] bg-white text-[.8rem] absolute top-0 bottom-0 left-0 rounded-full border-1 !border-[var(--gray-300)] outline-0 text-center"
          type="text"
          v-model="currentQuantity"
          @change="updateMyCart(currentQuantity)"
        />
        <Button
          :disabled="loading || currentQuantity <= 1"
          @click="updateMyCart(currentQuantity--)"
          class="!p-.2rem !w-[100%] h-[2rem] flex items-center justify-center rounded-[1rem_1rem_0_0] bg-[var(--indigo-500)]"
        >
          <div i-carbon:subtract></div>
        </Button>
      </div>

      <Button
        text
        class="!p-.2rem !w-[2rem] items-end h-min mt-auto"
        outlined
        rounded
        @click="deleteCartItem"
      >
        <div
          i-carbon:circle-dash
          class="do_not_navigate !color-[var(--gray-500)] spin"
          v-if="deleteLoader"
        ></div>
        <div
          v-else
          i-carbon:delete
          class="color-[var(--gray-600)] !w-[1.3rem] !h-[1.3rem] m-auto"
        ></div>
      </Button>
    </div>
  </div>
</template>
