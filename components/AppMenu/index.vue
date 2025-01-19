<script setup>
const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}

const closeMenu = () => {
  menu.value = false
}

defineExpose({
  toggleMenu,
  closeMenu,
})
</script>

<template>
  <Transition name="fade">
    <div
      v-show="menu"
      class="overflow-hidden text-[1rem] z-9 mega__menu !bottom-[-0.2rem] autogrid gap-[0] !items-start rtl:left-3rem ltr:right-3rem bg-white rounded-[1.5rem] shadow-[0rem_0rem_2rem_rgba(0,0,0,.05)]"
    >
      <slot />
    </div>
  </Transition>
</template>
