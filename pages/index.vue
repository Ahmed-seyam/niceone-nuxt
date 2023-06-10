<script setup lang="ts">
defineOptions({
  name: "IndexPage",
});
// meta
definePageMeta({
  layout: 'default',
})

const router = useRouter();
router.push("/home");
</script>

<template>
  <NuxtLayout>

  </NuxtLayout>
</template>
