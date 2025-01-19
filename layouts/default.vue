<template>
  <main
    class="bg-grey-light-2 w-[100%] min-h-[100vh] relative color-[var(--bluegray-900)]"
  >
    <app-navbar class="bg-white"></app-navbar>
    <div id="sidebar"></div>
    <slot />
    <app-footer></app-footer>
  </main>
</template>
