<template>
  <div>
    <NuxtLoadingIndicator :duration="5000" />
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Majaliss - Trouvez un institut près de chez vous',
  description: 'Notre mission est de faciliter l\'accès aux sciences religieuses en référençant tous les instituts de France dans un seul et même endroit afin que tu puisses les comparer entre eux et choisir celui qui te correspond vraiment !',
})
</script>
