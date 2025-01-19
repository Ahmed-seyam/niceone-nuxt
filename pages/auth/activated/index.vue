<template>
  <div class="flex flex-col items-center justify-center text-2rem p-x-1rem">
    <div
      i-carbon:mail-all
      class="text-14rem m-b-2rem color-[var(--gray-300)] element-to-shake"
    ></div>

    <p class="m-b-9rem color-[var(--blue-900)] text-center">
      we have sent reset token to you email
    </p>

    <nuxt-link to="/home">
      <Button class="!text-1.4rem element-to-shake-once">Back to home</Button>
    </nuxt-link>
  </div>
</template>
