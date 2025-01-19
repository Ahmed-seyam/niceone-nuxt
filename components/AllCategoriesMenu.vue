<script setup>
const { t, locale } = useLang()

const megaMenu = ref(false)
const setMegaMenu = (value) => {
  megaMenu.value = value
  if (!value) {
    firstScopeChildren.value = []
    secondScopeChildren.value = []
    firstSopeParent.value = ''
    secondSopeParent.value = ''
  }
}

const categoriesStore = stores.categoriesStore
const categories = computed(() => categoriesStore.getCategories)

const firstScopeChildren = ref([])
const firstSopeParent = ref('')
const secondSopeParent = ref('')
const secondScopeChildren = ref([])

const updateFirstScope = (category) => {
  firstScopeChildren.value = category.categories
  firstSopeParent.value = category.id
  secondSopeParent.value = ''
  secondScopeChildren.value = []
}

const updateSecondScope = (category) => {
  secondScopeChildren.value = category.categories
  secondSopeParent.value = category.id
}

defineExpose({
  setMegaMenu,
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="categories && Object.keys(categories).length > 0"
      v-show="megaMenu"
      class="overflow-hidden text-[1rem] z-9 mega__menu autogrid gap-[0] !items-start rtl:right-0 ltr:left:0 bg-white rounded-[1.5rem] shadow-[0rem_0rem_2rem_rgba(0,0,0,.05)]"
    >
      <!-- Root List -->
      <ul class="p-[2rem_1rem] w-[15rem]">
        <nuxt-link
          :to="'/store/' + category.id"
          @mouseover="updateFirstScope(category)"
          v-for="category in categories"
        >
          <div
            :class="{
              '!bg-[var(--gray-100)] ': category.id === firstSopeParent,
            }"
            class="transition !m-b-[.5rem] grid items-center gap-2 grid-cols-[max-content_max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-1rem"
          >
            <img
              v-if="category && category.thumb"
              :src="'/images/categorys/' + category.thumb"
              class="w-[2rem] h-2rem"
              alt=""
            />

            <span>
              {{ category[$filters.t('name_', locale)] }}
            </span>

            <div
              i-carbon:chevron-left
              class="rtl:m-r-auto ltr:m-l-auto ltr:rotate-180"
              v-if="category.categories.length > 0"
            ></div>
          </div>
        </nuxt-link>
      </ul>

      <!-- Children -->
      <ul
        v-if="firstScopeChildren.length > 0"
        class="p-[2rem_1rem] h-[100%] w-[15rem]"
      >
        <li
          @mouseover="updateSecondScope(child)"
          v-for="child in firstScopeChildren"
        >
          <nuxt-link :to="'/store/' + child.id">
            <div
              :class="{
                '!bg-[var(--gray-100)] ': child.id === secondSopeParent,
              }"
              class="transition !m-b-[.5rem] grid items-center gap-2 grid-cols-[max-content_max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-1rem"
            >
              <img
                v-if="child && child.thumb"
                :src="'/images/categorys/' + child.thumb"
                class="w-[2rem] h-2rem"
                alt=""
              />
              {{ child[$filters.t('name_', locale)] }}

              <div
                i-carbon:chevron-left
                class="rtl:m-r-auto ltr:m-l-auto ltr:rotate-180"
                v-if="child.categories.length > 0"
              ></div>
            </div>
          </nuxt-link>
        </li>
      </ul>

      <!-- Children of Children-->
      <ul
        v-if="secondScopeChildren.length > 0"
        class="h-[100%] p-[2rem_1rem] w-[15rem]"
      >
        <li v-for="child in secondScopeChildren">
          <nuxt-link :to="'/store/' + child.id" tag="li">
            <div
              class="transition hover:bg-[var(--gray-100)] !m-b-[.5rem] min-w-[13rem] justify-start autogrid w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-1rem"
            >
              <img
                v-if="child && child.thumb"
                :src="'/images/categorys/' + child.thumb"
                class="w-[2rem] h-2rem"
                alt=""
              />
              {{ child[$filters.t('name_', locale)] }}
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </Transition>
</template>
