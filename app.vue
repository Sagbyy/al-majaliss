<template>
  <NuxtLoadingIndicator :duration="5000" />
  <NuxtPage />
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Mosquées',
  description: 'Trouvez une mosquée près de chez vous',
})
</script>
