<script setup>
const props = defineProps(['product'])
const productIdRef = ref(props.product.id)
const { t, locale } = useLang()
const router = useRouter()
const navigate = (e, id) => {
  if (!e.target.classList.contains('do_not_navigate')) {
    router.push({
      path: '/products/' + props.product.id,
      params: { productId: 'props.product.id' },
    })
  }
}

const wishlistStore = stores.wishlistStore

const isWishlisted = computed(() =>
  wishlistStore.isWishlisted(productIdRef.value)
)

const productIsBeingToggled = ref(false)

const toggleProductToWishlist = async (productId, product) => {
  if (productIsBeingToggled.value) return

  productIsBeingToggled.value = true
  await wishlistStore.toggleProductToWishlist(productId, product)

  productIsBeingToggled.value = false
}

// toggleProductToWishlist
const productDetailsPopup = ref(false)
const addToCartPopup = ref(false)

const priceSource = computed(() =>
  props.product && props.product.has_variant
    ? props.product.variants[0]
    : props.product
)

const imagesSource = computed(() =>
  props.product && props.product.has_variant
    ? props.product.variants[0]
    : props.product
)

const getCurrencyString = (value) => {
  if (!value) return
  console.log(value.split(' ').slice(1, value.split(' ').length).join(' '))
  return value.split(' ').slice(1, value.split(' ').length).join(' ')
}

const productsStore = stores.productsStore
const curProduct = computed(() => productsStore.getCurProductForOverview)

const productDetailsLoader = ref(false)

const openProductDetailsPopup = async (id) => {
  if (productDetailsLoader.value) return
  productDetailsLoader.value = true
  await productsStore.fetchOneProduct(id, true)
  productDetailsPopup.value = true
  productDetailsLoader.value = false
}
</script>

<template>
  <div
    v-if="product"
    @click="navigate($event, 'id')"
    class="pointer relative grid product w-[18rem] p-[1.8rem] rounded-[2.5rem] basicshadow overflow-hidden bg-white"
  >
    <div
      class="tags !rtl:left-unset !rtl:right-2rem h-[12rem] items-start text-[.85rem] absolute left-2rem top-2rem grid grid-cols-1 gap-[.4rem] justify-start rtl:justify-items-start"
    >
      <div
        v-if="product.is_new"
        class="tag w-[fit-content] color-white bg-[var(--blue-600)] p-[.2rem_.7rem] rounded-[.5rem]"
      >
        {{ t('product.new') }}
      </div>

      <div class="self-end grid grid-cols-[fit-content] gap-1">
        <template v-for="(special, index) in product.specials">
          <div
            v-if="
              special.type === 'buyOneGetOne' || special.type === 'buyOneGetTwo'
            "
            class="tag w-[fit-content] self-end translate-y-[50%] bg-[var(--red-600)] text-.9rem color-white p-[.2rem_.7rem] rounded-[.5rem]"
          >
            {{
              product.specials[index][$filters.t('tag_name_formatted_', locale)]
            }}
          </div>
        </template>
      </div>
    </div>

    <div
      class="add__to__fav do_not_navigate transition-all absolute opacity-0 right-2rem rtl:right-unset rtl:left-2rem translate-x-[50%] rtl:translate-x-[-50%] top-2rem"
    >
      <div
        class="p-.7rem do_not_navigate rounded-[.8rem] bg-white shadow-[0_0_.6rem_rgba(0,0,0,.1)] m-b-.5rem"
        @click="toggleProductToWishlist(product.id, product)"
      >
        <div
          i-carbon:circle-dash
          class="do_not_navigate color-[var(--color-primary)] spin"
          v-if="productIsBeingToggled"
        ></div>
        <div
          i-carbon:favorite-filled
          class="color-[red] do_not_navigate"
          v-else-if="isWishlisted && !productIsBeingToggled"
        ></div>
        <div i-carbon:favorite class="do_not_navigate color-[red]" v-else></div>
      </div>

      <!-- <div
        class="do_not_navigate p-.7rem rounded-[.8rem] bg-white shadow-[0_0_.6rem_rgba(0,0,0,.1)]"
        @click="openProductDetailsPopup(product.id)"
      >
        <div
          i-carbon:view
          class="do_not_navigate color-[var(--color-primary)]"
          v-if="!productDetailsLoader"
        ></div>

        <div
          i-carbon:circle-dash
          class="do_not_navigate color-[var(--color-primary)] spin"
          v-if="productDetailsLoader"
        ></div>
      </div> -->
    </div>

    <NuxtImg
      loading="lazy"
      :src="'/images/products/' + imagesSource.image"
      class="h-[12rem] m-auto w-[100%] bg-[var(--bluegray-50)] object-contain rounded-1rem m-b-[1.4rem]"
      alt=""
    />

    <div
      class="absolute rtl:right-unset rtl:left-2rem top-13.5rem right-2rem reviews autogrid items-center gap-1 w-[fit-content]"
    >
      <span class="color-[var(--bluegray-400)] font-thin text-[.7rem]"
        >( {{ product.total_reviews_formatted }} )</span
      >
      <div i-carbon:star-filled class="color-yellow w-[.9rem]"></div>

      <div class="text-[.9rem]">
        {{ product.average_rating_formatted }}
      </div>
    </div>

    <div
      class="brand color-[var(--bluegray-400)] capitalize font-300 !text-[1rem] !italic"
      v-if="product.brand"
    >
      {{ product.brand.name }}
    </div>

    <h3 class="text-[1.1rem] font-500">
      {{ product[$filters.t('name_', locale)] }}
    </h3>

    <div
      class="m-b-1rem m-t-[-.6rem] grid grid-cols-2 gap-y-.2rem gap-x-.6rem grid-rows-[min-content_max-content] items-end p-t-[1rem] w-[fit-content]"
      v-if="
        priceSource.event_price.discountType &&
        priceSource.event_price_formatted
      "
    >
      <div
        class="w-fit col-[1/3] row-[1/2] relative text-1.2rem m-b-[-.1rem] color-[var(--red-700)] autogrid"
      >
        <span class="line-through">
          {{ priceSource.total_price_formatted.split(' ')[0] }}
        </span>

        <div
          v-if="priceSource.event_price.discountType === 'percentOff'"
          class="font-medium p-.1rem rounded-[.5rem] bg-red/10 color-[var(--red-700)] text-[.8rem] flex items-center justify-center"
        >
          <div i-carbon:subtract></div>
          {{ priceSource.event_percent_off }}
        </div>

        <div
          v-else-if="priceSource.event_price.discountType === 'fixedAmountOff'"
          class="font-bold p-.4rem rounded-[.5rem] bg-red/10 color-[var(--red-700)] text-[.9rem] flex items-center justify-center"
        >
          <div i-carbon:subtract></div>
          {{ priceSource.event_discount_amount.split(' ')[0] }}
        </div>
      </div>

      <div class="col-[1/3] row-[2/3] text-[1.4rem] w-fit">
        <span class="color-[var(--green-800)]">
          {{ priceSource.event_price_formatted.split(' ')[0] }}
        </span>
        <span class="p-x-.5rem text-1rem">{{
          getCurrencyString(priceSource.total_price_formatted)
        }}</span>
      </div>
    </div>

    <div
      class="m-t-auto m-b-1rem m-t-[-.6rem] grid grid-cols-2 gap-x-.6rem grid-rows-[min-content_max-content] items-end p-t-[1rem] w-[fit-content]"
      v-else
    >
      <div class="col-[1/3] row-[2/3] text-[1.4rem] w-fit">
        <span class="color-[var(--green-800)]">
          {{ priceSource.total_price_formatted.split(' ')[0] }}
        </span>
        <span class="p-x-.5rem text-1rem">{{
          getCurrencyString(priceSource.total_price_formatted)
        }}</span>
      </div>
    </div>

    <Button
      class="do_not_navigate autogrid !p-y-.5rem relative !p-x-[.5rem]"
      severity="primary"
      rounded
      @click="openProductDetailsPopup(product.id)"
    >
      <div i-carbon:add class="do_not_navigate w-[2rem]"></div>
      <div
        class="do_not_navigate absolute left-50% top-50% translate-x-[-50%] translate-y-[-50%]"
      >
        {{ t('product.add_to_cart') }}
      </div>
    </Button>

    <Dialog
      v-model:visible="productDetailsPopup"
      modal
      :style="{ width: '90rem', maxWidth: '90%', 'background-color': 'red' }"
      :draggable="false"
    >
      <product-details
        :product="curProduct"
        v-if="curProduct"
      ></product-details>
    </Dialog>

    <Dialog
      v-model:visible="addToCartPopup"
      modal
      :style="{ width: '70rem', 'background-color': 'red' }"
      :draggable="false"
    >
    </Dialog>
  </div>
</template>

<style>
.product:hover .add__to__fav {
  transform: translateX(0);
  opacity: 1;
}

.p-dialog {
  border-radius: 2rem !important;
  overflow: hidden;
}

.p-dialog-content,
.p-dialog-header {
  background-color: var(--bluegray-50) !important;
}

.p-dialog-content {
  padding: 0;
}

.p-dialog .p-dialog-header {
  padding: 1.5rem 1.5rem 1rem;
}
</style>
