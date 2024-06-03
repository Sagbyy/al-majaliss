<script setup lang="ts">
defineProps<{
  objectiveValue: Ref<number>
}>()
</script>

<template>
  <p
    ref="element"
    class="home__item_left_effect opacity-1 mb-5 mt-1 font-syne text-[18px] text-red-brown"
  >
    Déjà
    <span class="mx-1 inline-block text-3xl text-gold">{{
      objectiveValue
    }}</span>
    inscrits. Objectif <span class="underline">2000</span> !
  </p>
</template>
