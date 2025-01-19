<script setup>
const products = ref()

const { t, locale, changeLang } = useLang()
async function toggleLocales() {
  // change to some real logic

  changeLang(locale.value === 'ar' ? 'en' : 'ar')

  if (locale.value === 'ar') {
    document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl')
  } else {
    document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr')
  }
}

const userMenu = ref(null)
const toggleUserMenu = () => {
  userMenu.value.toggleUserMenu()
}

const closeUserMenu = () => {
  userMenu.value.closeUserMenu()
}

const megaMenu = ref(null)
const setMegaMenu = (val) => {
  if (megaMenu.value) megaMenu.value.setMegaMenu(val)
}

const cartSidebar = ref(null)
const wishlistSidebar = ref(null)
const notificationsSidebar = ref(null)
const searchSidebar = ref(null)

const openWishlist = () => {
  console.log(wishlistSidebar.value)
  if (!wishlistSidebar.value) return

  wishlistSidebar.value.open()
}

const wishlistStore = stores.wishlistStore
const numberOfWishlisted = computed(() => wishlistStore.getNumberOfItems)

const cartStore = stores.cartStore

const numberOfCartItems = computed(() => cartStore.getNumberOfItems)
// -----------------------------------------

const openNotifications = () => {
  if (!notificationsSidebar.value) return

  notificationsSidebar.value.open()
}

const openSearch = () => {
  if (!searchSidebar.value) return

  searchSidebar.value.open()
}

const openCart = () => {
  if (!cartSidebar.value) return

  cartSidebar.value.open()
}

const categoriesStore = stores.categoriesStore
const categories = computed(() => categoriesStore.getCategories)

// Auth
const authStore = stores.authStore

const isUserExists = computed(() => authStore.isUserExists)
const user = computed(() => authStore.user)
const logout = async () => {
  await authStore.logUserOut()
}
</script>

<template>
  <nav
    class="relative overflow-visible shadow-[0_0_2rem_rgba(0,0,0,.1)] overflow-visible p-x-[3rem] grid grid-cols-[max-content_1fr_max-content] items-center gap-[3rem] justify-between"
  >
    <nuxt-link to="/home" class="logo bg-grey-light-3 rounded-full h-[3.5rem]">
      <Image
        src="/images/logo.png"
        alt="Image"
        imageClass="w-[100%] h-[100%] "
      />
    </nuxt-link>

    <ul
      class="m-y-[1.3rem] text-[1.2rem] grid grid-flow-col items-center w-[fit-content] gap-[1rem] font-[600]"
    >
      <li
        class="relative"
        @mouseenter="setMegaMenu(true)"
        @mouseleave="setMegaMenu(false)"
        @click="setMegaMenu(true)"
      >
        <Button
          severity="primary"
          class="all_categories_button !bg-[var(--primary-600)] pointer font-bold grid grid-flow-col items-center gap-[1rem] !p-y-.5rem"
          rounded
        >
          <div i-carbon:apps></div>
          {{ t('nav.categories') }}
        </Button>

        <all-categories-menu
          v-if="categories"
          ref="megaMenu"
        ></all-categories-menu>
      </li>

      <li v-for="category in categories">
        <nuxt-link class="nav__link" :to="'/store/' + category.id">
          <Button
            severity="primary"
            class="pointer nav_tab !color-[var(--primary-800)] font-bold grid grid-flow-col items-center !p-y-.2rem"
            rounded
            outlined
            text
          >
            {{ category[$filters.t('name_', locale)] }}
          </Button>
        </nuxt-link>
      </li>
    </ul>

    <div class="autogrid !gap-[1rem]">
      <div class="autogrid !gap-[.7rem]">
        <div>
          <Button
            severity="warning"
            @click="openNotifications"
            text
            class="!w-2rem !h-2rem !p-0 flex justify-center items-center"
          >
            <div
              i-carbon:notification-filled
              class="color-[var(--yellow-400)]"
            ></div>
          </Button>
        </div>
        <div>
          <Button
            severity="primary"
            @click="openCart"
            text
            class="!w-2.5rem relative !h-2.5rem !p-0 flex justify-center items-center"
          >
            <span
              class="absolute right-0 top-0 bg-[var(--blue-100)] rounded-full w-[16px] pt-[1px] h-[16px] flex items-center justify-center color-[var(--blue-600)] z-[3] !text-[0.7rem]"
              v-if="numberOfCartItems"
              >{{ numberOfCartItems }}</span
            >
            <div i-carbon:shopping-cart class="color-[var(--blue-600)]"></div>
          </Button>
        </div>
        <div>
          <Button
            severity="danger"
            @click="openWishlist"
            text
            class="!w-2.5rem !h-2.5rem !p-0 flex justify-center items-center relative"
          >
            <span
              class="absolute right-0 top-0 bg-[var(--red-100)] rounded-full p-0.1rem w-4.5 h-4.5 flex items-center justify-center color-[var(--red-800)] z-[3] !text-[0.7rem]"
              v-if="numberOfWishlisted"
              >{{ numberOfWishlisted }}</span
            >
            <div i-carbon:favorite-filled class="color-[var(--red-600)]"></div>
          </Button>
        </div>

        <div>
          <Button
            severity="secondary"
            @click="openSearch"
            text
            class="!w-2rem !h-2rem !p-0 flex justify-center items-center"
          >
            <div i-carbon:search class="color-[var(--bluegray-600)]"></div>
          </Button>
        </div>
      </div>
      <div class="autogrid" v-if="!isUserExists">
        <nuxt-link to="/auth/login">
          <Button
            severity="primary"
            class="pointer !p-y-.5rem font-bold"
            rounded
          >
            {{ t('nav.login') }}
          </Button>
        </nuxt-link>
        <nuxt-link to="/auth/register">
          <Button
            severity="primary"
            class="!p-y-.5rem pointer font-bold"
            rounded
            outlined
          >
            {{ t('nav.register') }}
          </Button>
        </nuxt-link>
      </div>

      <Button
        v-else
        severity="primary"
        class="autogrid !p-.5rem !bg-[var(--primary-600)] !rtl:p-l-1rem !ltr:p-r-1rem"
        rounded
        @click="toggleUserMenu"
        @blur="closeUserMenu"
      >
        <NuxtImg
          :src="'/images/users/' + user.photo + '.png'"
          loading="lazy"
          :lazt-src="'/images/users/women.png'"
          class="rounded-[50%] overflow-hidden w-[1.7rem] h-[1.7rem]"
          alt="user image"
        />

        {{ user.name }}
      </Button>

      <app-user-menu ref="userMenu" @logout-clicked="logout"> </app-user-menu>
    </div>
    <MountedTeleport to="body">
      <cart ref="cartSidebar" />
      <wishlist ref="wishlistSidebar" />
      <notifications ref="notificationsSidebar" />
      <search ref="searchSidebar" />
    </MountedTeleport>
  </nav>
</template>

<style scoped lang="scss">
.nav__link.router-link-exact-active {
  &:deep(.p-button-text) {
    color: var(--primary-500) !important;
    border: 1px solid #ddd !important;
    border-color: var(--primary-500) !important;
  }
}
</style>
