<script setup>
const { t, locale } = useLang()

const categoriesStore = stores.categoriesStore
const categories = computed(() => categoriesStore.getCategories)
</script>

<template>
  <section class="p-x-[3rem] p-y-[2rem] m-b-2rem">
    <h3
      class="text-[1.3rem] p-b-[2rem] autogrid capitalize w-[fit-content] gap-3 color-[var(--bluegray-700)]"
    >
      <div i-carbon:categories></div>

      {{ t('home.explore_cat') }}
    </h3>

    <div
      class="grid grid-cols-[repeat(auto-fit,minMax(15rem,16rem))] gap-[.7rem]"
    >
      <router-link
        :to="'/store/' + category.name_en"
        v-for="category in categories"
        class="category max-w-[16rem] flex flex-col items-center p-y-[2rem] p-x-[4rem] transition bg-white shadow-[0_0_.5rem_rgba(0,0,0,.06)] hover:shadow-[0_0_2rem_rgba(0,0,0,.09)] p-[1rem_2rem] rounded-[2rem]"
      >
        <div
          class="h-7rem w-7rem rounded-full p-1rem bg-[var(--bluegray-100)] flex items-center justify-center"
        >
          <img
            v-if="category && category.photo && category.photo.length > 0"
            :src="'/images/categorys/' + category.photo[0].small_image"
            class="w-[100%] h-[100%]"
            :alt="category[$filters.t('name_', locale)]"
          />
        </div>

        <h5
          class="capitalize text-[1.3rem] p-[1.5rem_0_0rem] text-center font-extrabold color-[var(--bluegray-700)]"
        >
          {{ category[$filters.t('name_', locale)] }}
        </h5>
      </router-link>
    </div>
  </section>
</template>

<style lang="scss">
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(max-content, 10rem));
  gap: 2rem;
}
</style>
