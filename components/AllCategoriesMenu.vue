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

// eslint-disable-next-line no-undef
defineExpose({
  setMegaMenu,
})
</script>

<template>
  <Transition name="fade">
    <div
      v-show="megaMenu"
      class="overflow-hidden text-[1rem] z-9 mega__menu autogrid gap-[0] !items-start rtl:right-0 ltr:left:0 bg-white rounded-[1.5rem] shadow-[0rem_0rem_2rem_rgba(0,0,0,.05)]"
    >
      <!-- Root List -->
      <ul class="p-[2rem_1rem] w-[15rem]">
        <router-link
          :to="'/store/' + category.title"
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
              v-if="category && category.photo && category.photo.length > 0"
              :src="'/images/categorys/' + category.photo[0].small_image"
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
        </router-link>
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
          <router-link :to="'/store/' + child.title">
            <div
              :class="{
                '!bg-[var(--gray-100)] ': child.id === secondSopeParent,
              }"
              class="transition !m-b-[.5rem] grid items-center gap-2 grid-cols-[max-content_max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-1rem"
            >
              <img
                v-if="child && child.photo && child.photo.length > 0"
                :src="'/images/categorys/' + child.photo[0].small_image"
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
          </router-link>
        </li>
      </ul>

      <!-- Children of Children-->
      <ul
        v-if="secondScopeChildren.length > 0"
        class="h-[100%] p-[2rem_1rem] w-[15rem]"
      >
        <li v-for="child in secondScopeChildren">
          <router-link :to="'/store/' + child.title" tag="li">
            <div
              class="transition hover:bg-[var(--gray-100)] !m-b-[.5rem] min-w-[13rem] justify-start autogrid w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-1rem"
            >
              <img
                v-if="child && child.photo && child.photo.length > 0"
                :src="'/images/categorys/' + child.photo[0].small_image"
                class="w-[2rem] h-2rem"
                alt=""
              />
              {{ child[$filters.t('name_', locale)] }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </Transition>
</template>
