<script setup>
import { useToast } from 'primevue/usetoast'

const emits = defineEmits(['logout-clicked'])

const { t, locale, changeLang } = useLang()
async function toggleLocales() {
  // change to some real logic

  changeLang(locale.value === 'ar' ? 'en' : 'ar')

  if (locale.value === 'ar') {
    document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl')
  } else {
    document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr')
  }

  window.location.reload()
}

const items = ref([
  { separator: true },
  { label: 'Profile', icon: 'pi pi-fw pi-user' },
  { label: 'Settings', icon: 'pi pi-fw pi-cog' },
  { separator: true },
])

const toast = useToast()

const profileClick = () => {
  toast.add({
    severity: 'info',
    summary: 'Info',
    detail: 'Item Selected',
    life: 3000,
  })
}

const menu = ref(false)
const toggleUserMenu = () => {
  menu.value.toggleMenu()
}

const closeUserMenu = () => {
  menu.value.closeMenu()
}

defineExpose({
  toggleUserMenu,
  closeUserMenu,
})
</script>

<template>
  <app-menu ref="menu">
    <ul class="w-[15rem] p-y-1rem p-x-.6rem">
      <li
        class="pointer transition w-full text-[1rem] hover:bg-[var(--gray-50)] justify-start autogrid !gap-.7rem w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-.3rem"
      >
        <div
          i-carbon:dashboard
          class="w-1.2rem h-[1.2rem] color-[var(--bluegray-700)]"
        ></div>
        <span class="ml-2 color-[var(--bluegray-700)] capitalize">{{
          t('admin_dashoard')
        }}</span>
      </li>

      <li
        class="pointer transition w-full text-[1rem] hover:bg-[var(--gray-50)] justify-start autogrid !gap-.7rem w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-.3rem"
      >
        <div
          i-carbon:user-avatar
          class="w-1.2rem h-[1.2rem] color-[var(--bluegray-700)]"
        ></div>
        <span class="ml-2 color-[var(--bluegray-700)] capitalize">{{
          t('user_dashboard')
        }}</span>
      </li>

      <li
        @click="toggleLocales"
        class="pointer transition w-full text-[1rem] hover:bg-[var(--gray-50)] justify-start autogrid !gap-.7rem w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-.3rem"
      >
        <div
          i-carbon:language
          class="w-1.2rem h-[1.2rem] color-[var(--bluegray-700)]"
        ></div>
        <span class="ml-2 color-[var(--bluegray-700)] capitalize">{{
          t('button.toggle_langs')
        }}</span>
      </li>

      <button
        @click="$emit('logout-clicked')"
        class="pointer transition w-full text-[1rem] hover:bg-[var(--gray-50)] justify-start autogrid !gap-.7rem w-[max-content_1fr] color-grey-dark-6 p-[.8rem] rounded-.3rem"
      >
        <i class="pi pi-sign-out color-[var(--red-600)] w-1.2rem h-[1.2rem]" />
        <span class="ml-2 color-[var(--red-600)] capitalize">{{
          t('nav.logout')
        }}</span>
      </button>
    </ul>
  </app-menu>

  <!-- <div
    class="absolute rtl:left-3rem !ltr:right-3rem bottom-0 translate-y-[100%] z-12 card flex justify-content-center"
  >
    <Menu :model="items" v-model:visible="visible">
      <template #start>
        <button
          @click="profileClick"
          class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <div class="flex flex-col align">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Agent</span>
          </div>
        </button>
      </template>
      <template #end>
        <button
          class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
        >
          <i class="pi pi-sign-out" />
          <span class="ml-2">Log Out</span>
        </button>
      </template>
    </Menu>
  </div> -->
</template>
