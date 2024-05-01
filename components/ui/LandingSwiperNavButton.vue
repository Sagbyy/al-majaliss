<script setup lang="ts">
defineProps<{
  vertical?: boolean
}>()

import { useSwiper } from 'swiper/vue'

const swiper = useSwiper()
</script>

<template>
  <button
    :class="
      (swiper.isBeginning ? 'bg-gold/30 cursor-default' : 'bg-gold') +
      (vertical ? ' flex-row ' : ' flex-col ') +
      ' flex h-auto items-center justify-center gap-8 rounded-full border-4 border-white p-4 transition-colors' +
      (swiper.isBeginning ? '' : ' hover:bg-yellow-700')
    "
    @click="swiper.slidePrev()"
  >
    <Icon
      v-if="vertical"
      name="material-symbols:keyboard-arrow-left"
      color="white"
      size="25px"
    />
    <Icon
      v-else
      name="material-symbols:keyboard-arrow-up"
      color="white"
      size="25px"
    />
  </button>
  <button
    :class="
      (swiper.isEnd ? 'bg-gold/30 cursor-default' : 'bg-gold') +
      ' flex h-auto items-center justify-center rounded-full border-4 border-white p-4 transition-colors' +
      (swiper.isEnd ? '' : ' hover:bg-yellow-700')
    "
    @click="swiper.slideNext()"
  >
    <Icon
      v-if="vertical"
      name="material-symbols:keyboard-arrow-right"
      color="white"
      size="25px"
    />
    <Icon
      v-else
      name="material-symbols:keyboard-arrow-down"
      color="white"
      size="25px"
    />
  </button>
</template>
