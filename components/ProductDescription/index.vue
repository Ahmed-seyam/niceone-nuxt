<script setup>
const props = defineProps(['description'])
</script>

<template>
  <div class="p-[.5rem_1rem]">
    <pre class="text-1rem">{{ description }}</pre>
  </div>
</template>
