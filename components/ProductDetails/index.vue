<script setup>
const props = defineProps(['sizeOptions', 'colorOptions', 'product'])
const productIdRef = ref(props.product ? props.product.id : null)

const rating = ref(props.product ? props.product.average_rating : 0)

const { t, locale } = useLang()
const direction = computed(() => (locale.value === 'en' ? 'ltr' : 'rtl'))

const getCurrencyString = (value) => {
  return value.split(' ').slice(1, value.split(' ').length).join(' ')
}

const selectedVariant = ref(
  props.product && props.product.has_variant ? props.product.variants[0] : null
)

const selectedVariantOfVariant = ref(null)

const isSelectedVariant = computed(
  () => (id) => selectedVariant.value ? selectedVariant.value.id === id : false
)

const isSelectedVariantOfVariant = computed(
  () => (id) =>
    selectedVariantOfVariant.value
      ? selectedVariantOfVariant.value.id === id
      : false
)

const changeSelectedVariant = (variant) => {
  selectedVariant.value = variant
  if (selectedVariant.value.has_variant)
    selectedVariantOfVariant.value = selectedVariant.value.variants[0]
  else selectedVariantOfVariant.value = null
}

const changeSelectedVariantOfVariant = (variant) => {
  selectedVariantOfVariant.value = variant
}

const priceSource = computed(() =>
  selectedVariantOfVariant.value
    ? selectedVariantOfVariant.value
    : selectedVariant.value
    ? selectedVariant.value
    : props.product
)

const imagesSource = computed(() =>
  selectedVariantOfVariant.value && selectedVariantOfVariant.value
    ? selectedVariantOfVariant.value
    : selectedVariant.value && selectedVariant.value
    ? selectedVariant.value
    : props.product
)

const inStockSource = computed(() =>
  !props.product
    ? false
    : selectedVariantOfVariant.value && selectedVariantOfVariant.value
    ? selectedVariantOfVariant.value.in_stock
    : selectedVariant.value && selectedVariant.value
    ? selectedVariant.value.in_stock
    : props.product.in_stock
)

const noSelectedVariant = computed(() => {
  if (props.product && props.product.has_variant) {
    if (!selectedVariant.value) return true
    else if (
      selectedVariant.value &&
      selectedVariant.has_variant &&
      !selectedVariantOfVariant.value
    )
      return true
  }

  return false
})

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

const cartStores = stores.cartStore

const addToCart = () => {
  if (!props.product.has_variant) {
    cartStores.createCartItem({
      product: props.product.id,
      quantity: 1,
      image: props.product.image,
    })

    return
  }

  if (!selectedVariant.value) return

  if (!selectedVariant.value.has_variant) {
    cartStores.createCartItem({
      product: props.product.id,
      variant: selectedVariant.value.id,
      quantity: 1,
      variant_hierarchy: [selectedVariant.value],
      image: selectedVariant.value.image,
    })

    return
  }

  if (!selectedVariantOfVariant.value) return
  cartStores.createCartItem({
    product: props.product.id,
    variant: selectedVariantOfVariant.value.id,
    variant_hierarchy: [selectedVariant.value, selectedVariantOfVariant.value],
    quantity: 1,
    image: selectedVariantOfVariant.value.image,
  })
}
</script>

<template>
  <div
    v-if="product"
    class="product__overview grid gap-[2rem] grid-cols-[1fr_max-content] justify-between"
  >
    <section
      class="max-w-[60rem] h-min overflow-hidden relative grid grid-cols-1 gap-2rem basicshadow bg-white p-[2rem_0_0] rounded-1rem"
    >
      <div
        class="absolute ltr:right-2rem rtl:left-2rem top-2rem !bg-[var(--red-50)] rounded-2 text-1.3rem p-.5rem pointer"
        @click="toggleProductToWishlist(product.id, product)"
      >
        <div
          i-carbon:circle-dash
          class="do_not_navigate !color-[var(--gray-500)] spin"
          v-if="productIsBeingToggled"
        ></div>
        <div
          i-carbon:favorite-filled
          class="color-[var(--red-400)]"
          v-else-if="isWishlisted"
        ></div>
        <div i-carbon:favorite class="color-[var(--red-400)]" v-else></div>
      </div>

      <div
        v-if="product.brand"
        class="m-x-2rem grid gap-x-1rem text-[1.1rem] items-start grid-rows-[min-content_1fr] grid-cols-[max-content_1fr] rtl:border-r-0.6rem ltr:border-l-0.6rem border-[var(--blue-500)] rtl:p-[1rem_1rem_1rem_2rem] ltr:p-[1rem_2rem_1rem_1rem] rtl:rounded-[1rem_7px_7px_1rem] ltr:rounded-[7px_1rem_1rem_7px] bg-[var(--blue-50)] w-fit"
      >
        <img
          class="block col-[1/2] row-[1/3] w-[100%] h-[4rem] rounded-.5rem contrast-150"
          :src="'/images/brands/' + product.brand.image"
          alt=""
          v-if="product.brand.image"
        />

        <p class="col-[2/3] row-[1/2] color-[var(--bluegray-900)] text-0.9rem">
          {{ t('from_manufacturer') }}
          <nuxt-link
            to="/"
            class="!underline !color-[var(--blue-600)] text-1rem"
            >{{ product.brand.name }}</nuxt-link
          >
        </p>

        <p
          class="col-[2/3] row-[2/3] color-[var(--green-800)] font-bold text-1rem mt-auto"
        >
          {{ t('original_product') }}
        </p>
      </div>

      <div class="m-x-2rem">
        <h2 class="text-1.4rem">
          {{ product[$filters.t('name_', locale)] }}
        </h2>

        <div class="autogrid gap-1rem w-fit !items-center">
          <Rating v-model="rating" readonly :cancel="false" />
          <div class="flex items center">
            <span class="color-[var(--bluegray-400)] text-1rem">
              {{ product.average_rating_formatted }}
            </span>

            <span class="color-[var(--bluegray-300)] flex items-center">
              <div i-carbon:subtract></div>
              ( {{ product.total_reviews_formatted }} )
            </span>
          </div>
        </div>
      </div>

      <template v-if="product.has_variant">
        <section
          class="m-x-2rem text-[1.1rem]"
          v-if="product.type_of_variation_for_first_scope === 'color'"
        >
          <h4
            class="m-b-.7rem color-[var(--bluegray-900)] autogrid justify-start"
          >
            <div
              i-carbon:color-palette
              class="text-1rem color-[var(--gray-500)]"
            ></div>

            {{ t('choose_color') }}
          </h4>

          <div
            class="flex items-center !bg-[var(--gray-50)] p-[.5rem_1rem] w-fit rounded-.5rem"
          >
            <div
              class="last:!m-0 transition-all border-1 !border-[var(--primary-100)] hover:scale-[1.15] after:content-[''] after:border-3 !after:border-transparent after:absolute after:translate-x--50% after:translate-y--50% after:rounded-full after:w-200% after:h-200% relative after:left-50% after:top-50% after:bg-transparent pointer !w-1.8rem !h-1.8rem rounded-full rtl:m-l-1rem ltr:m-r-1rem justify-center w-fit"
              v-for="variant in product.variants"
              :style="{
                backgroundColor: variant.color_hex,
                borderColor: variant.color_hex,
              }"
              @click="changeSelectedVariant(variant)"
              :class="{
                'active_color after:!border-[var(--primary-500)]':
                  isSelectedVariant(variant.id),
              }"
              v-tooltip.bottom="variant[$filters.t('name_', locale)]"
            ></div>
          </div>
        </section>

        <section
          class="m-x-2rem text-[1.1rem]"
          v-else-if="product.type_of_variation_for_first_scope === 'size'"
        >
          <h4
            class="m-b-.7rem !color-[var(--bluegray-900)] autogrid items-center justify-start"
          >
            <div
              i-carbon:3d-mpr-toggle
              class="text-1rem color-[var(--gray-500)]"
            ></div>

            {{ t('choose_size') }}
          </h4>
          <SelectButton
            v-model="selectedVariant"
            :options="product.variants"
            optionLabel="id"
            dataKey="id"
            class="selectButtonSizes text-[1.3rem] flex flex-wrap"
            :unselectable="true"
            rounded
          >
            <template #option="slotProps"
              ><span class="text-[1rem]">
                {{ slotProps.option[$filters.t('name_', locale)] }}
              </span></template
            >
          </SelectButton>
        </section>
      </template>

      <template v-if="selectedVariant && selectedVariant.has_variant">
        <section
          class="m-x-2rem text-[1.1rem]"
          v-if="product.type_of_variation_for_second_scope === 'color'"
        >
          <h4
            class="m-b-.7rem color-[var(--bluegray-900)] autogrid justify-start"
          >
            <div
              i-carbon:color-palette
              class="text-1rem color-[var(--gray-500)]"
            ></div>

            {{ t('choose_color') }}
          </h4>
          <div class="flex items-center">
            <div
              class="transition-all border-1 pointer after:content-[''] after:absolute after:w-150% after:h-150% relative after:left-0 after:top-0 after:bg-green !w-2.2rem !h-2.2rem rounded-full rtl:m-l-.7rem ltr:m-r-.7rem justify-center w-fit"
              v-for="variant in selectedVariant.variants"
              :style="{
                backgroundColor: variant.color_hex,
                borderColor: variant.color_hex,
              }"
              @click="changeSelectedVariantOfVariant(variant)"
              :class="{
                'active_color border-1 !border-[var(--blue-800)]':
                  isSelectedVariantOfVariant(variant.id),
              }"
            ></div>
          </div>
        </section>

        <section
          class="m-x-2rem text-[1.1rem]"
          v-else-if="product.type_of_variation_for_second_scope === 'size'"
        >
          <h4
            class="m-b-.7rem !color-[var(--bluegray-900)] autogrid items-center justify-start"
          >
            <div
              i-carbon:3d-mpr-toggle
              class="text-1rem color-[var(--gray-500)]"
            ></div>

            {{ t('choose_size') }}
          </h4>
          <SelectButton
            v-model="selectedVariantOfVariant"
            :options="selectedVariant.variants"
            optionLabel="id"
            dataKey="id"
            class="selectButtonSizes flex flex-wrap"
            :unselectable="true"
            rounded
            severity="secondary"
            :pt="{
              button: ({ context }) => ({
                class: context.active
                  ? '!bg-gray-600 !border-gray-600  '
                  : undefined,
              }),
            }"
          >
            <template #option="slotProps">
              <span class="text-[1rem]">
                {{ slotProps.option[$filters.t('name_', locale)] }}
              </span>
            </template>
          </SelectButton>
        </section>
      </template>

      <section class="m-x-2rem">
        <div
          v-if="
            priceSource &&
            priceSource.event_price.discountType &&
            priceSource.event_price_formatted
          "
          class="grid grid-cols-2 gap-x-.6rem grid-rows-[min-content_fit-content] items-start w-[fit-content]"
        >
          <div
            class="col-[1/2] text-[1.1rem] w-fit row-[1/2] relative color-[var(--red-700)]"
          >
            <span
              class="absolute top-50% rotate-[-3deg] translate-y-[-150%] w-[100%] z-3 flex h-[1px] rounded-full bg-[var(--red-700)]"
            ></span>
            {{ priceSource.total_price_formatted.split(' ')[0] }}
            {{ getCurrencyString(priceSource.total_price_formatted) }}
          </div>

          <div class="col-[1/2] row-[2/3] text-[1.6rem]">
            <span class="color-green-800">
              {{ priceSource.event_price_formatted.split(' ')[0] }}
            </span>
            <span class="p-x-.7rem text-[0.9rem] bold">
              {{ getCurrencyString(priceSource.event_price_formatted) }}
            </span>
          </div>

          <div
            v-if="priceSource.event_price.discountType === 'percentOff'"
            class="col-[2/3] row-[1/2] text-[1rem] m-x-1rem p-[.2rem_.7rem] rounded-[.5rem] w-fit bg-red/10 color-[var(--red-700)] flex items-center justify-center"
          >
            <div i-carbon:subtract></div>
            {{ priceSource.event_percent_off }}
          </div>

          <div
            v-else-if="
              priceSource.event_price.discountType === 'fixedAmountOff'
            "
            class="col-[2/3] row-[1/2] w-fit p-[.2rem_.7rem] rounded-[.5rem] bg-red/10 color-[var(--red-700)] text-[0.85rem] flex items-center justify-center"
          >
            <div i-carbon:subtract></div>
            {{ priceSource.event_discount_amount.split(' ')[0] }}
          </div>
          <div
            class="col-[1/2] row-[3/4] text-[0.9rem] font-bold color-[var(--orange-800)]"
          >
            {{ t('vat_included') }}
          </div>
        </div>

        <div
          v-else
          class="m-b-1rem grid grid-cols-2 gap-x-.6rem grid-rows-[min-content_fit-content] p-t-[1rem] w-[fit-content]"
        >
          <div class="col-[1/2] row-[1/2] text-[1.6rem]">
            <span class="color-[var(--green-800)]">
              {{ priceSource.total_price_formatted.split(' ')[0] }}
            </span>
            <span class="p-x-.7rem text-[0.9rem] font-bold">
              {{ getCurrencyString(priceSource.total_price_formatted) }}
            </span>
          </div>
          <div
            class="col-[1/2] row-[2/3] text-[0.9rem] font-bold color-[var(--orange-800)]"
          >
            {{ t('vat_included') }}
          </div>
        </div>
      </section>

      <div
        class="!p-[0_2rem_0rem] autogrid justify-start items-center text-1rem"
      >
        <div
          i-carbon:close
          v-if="!inStockSource"
          class="color-[var(--red-800)]"
        ></div>
        <div
          i-carbon:checkmark-filled
          v-else
          class="color-[var(--green-800)]"
        ></div>
        {{ inStockSource ? t('in_stock') : t('out_of_stock') }}
      </div>

      <div
        class="m-x-2rem p-[.5rem] bg-[var(--orange-50)] color-[var(--orange-900)] w-fit rounded-.5rem autogrid"
      >
        <div i-carbon:warning-alt class="color-[var(--orange-700)]"></div>
        {{ t('this_product_can_not_be_returnded') }}
      </div>

      <div class="!p-[0_2rem_2rem] autogrid items-center" v-if="inStockSource">
        <Button
          severity="primary"
          class="flex w-[100%] autogrid items-center !bg-[var(--primary-700)] justify-center !p-x-3rem"
          :disabled="noSelectedVariant"
          @click="addToCart()"
        >
          <div i-carbon:shopping-bag></div>
          {{ t('add_to_cart') }}
        </Button>

        <Button
          severity="secondary"
          class="flex w-[100%] autogrid !bg-gray-900 items-center justify-center !p-x-3rem"
          :disabled="noSelectedVariant"
        >
          <div i-carbon:shopping-bag class="text-1.1rem"></div>
          {{ t('pay_now') }}
        </Button>
      </div>
    </section>

    <div
      class="sticky top-0 carousel w-[30rem] basicshadow bg-white p-2rem h-min rounded-1rem grid-rows-[min-content] items-start"
    >
      <Splide
        class="splide-carousel__container overflow-hidden"
        :options="{
          autoWidth: true,
          pagination: false,
          direction: direction,
          arrows: false,
        }"
        :has-track="false"
      >
        <SplideTrack class="splide-carousel__track w-[100%] h-[100%]">
          <SplideSlide
            v-for="image in imagesSource.images"
            :key="image"
            class="flex w-[100%] h-[100%]"
          >
            <div class="w-[30rem] flex justify-center h-[100%]">
              <client-only>
                <NuxtImg
                  :src="'/images/products/' + image.large_image"
                  loading="lazy"
                  alt="Image"
                  class="w-[100%] h-[auto] object-cover brightness-95"
                  preview
                />
              </client-only>
            </div>
          </SplideSlide>
        </SplideTrack>
      </Splide>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[dir='ltr'] .selectButtonSizes :deep(.p-button) {
  margin-right: 0.5rem !important;
}

[dir='rtl'] .selectButtonSizes :deep(.p-button) {
  margin-left: 0.5rem !important;
}
.selectButtonSizes {
  & > :deep(.p-button) {
    border-radius: 0.2rem !important;
    border: 1px solid #ddd !important;
    margin-bottom: 0.5rem !important;
    padding: 0.5rem 1rem;
  }
}

.active_color {
  transform: scale(0.6);
}

:deep(.splide__list) {
  display: flex !important;
}

:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  color: var(--yellow-500) !important;
}
</style>
