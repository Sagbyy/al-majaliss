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
      (swiper.isBeginning
        ? 'bg-custom-blue-100/30 cursor-default'
        : 'bg-custom-blue-100') +
      (vertical ? ' flex-row ' : ' flex-col ') +
      ' flex h-auto items-center justify-center gap-8 rounded-full border-4 border-white p-4 transition-colors' +
      (swiper.isBeginning ? '' : ' hover:bg-custom-blue-150')
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
      (swiper.isEnd
        ? 'bg-custom-blue-100/30 cursor-default'
        : 'bg-custom-blue-100') +
      ' flex h-auto items-center justify-center rounded-full border-4 border-white p-4 transition-colors' +
      (swiper.isEnd ? '' : ' hover:bg-custom-blue-150')
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
