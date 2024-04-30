<template>
  <div>
    <NuxtLoadingIndicator :duration="5000" />
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Majaliss - Trouvez une institut près de chez vous',
  description: 'Trouvez une institut près de chez vous',
})
</script>
