<template>
  <main class="!p-[2rem_2rem] grid gap-2rem justify-center">
    <nuxt-link
      v-ripple
      :to="$route.fullPath.split('/reviews')[0]"
      class="p-ripple shadow-2 m-auto styled-box-red rounded-full"
    >
      <div i-carbon:close class="color-[var(--red-600)] text-2rem"></div>
    </nuxt-link>
    <slot />
  </main>
</template>

<style scoped>
::v-deep(.styled-box-red .p-ink) {
  background: rgba(255, 21, 21, 0.219);
}
</style>
