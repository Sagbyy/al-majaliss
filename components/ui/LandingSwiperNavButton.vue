<script setup lang="ts">
import { useSwiper } from 'swiper/vue'

const swiper = useSwiper()
</script>

<template>
    <button
        :class="
            (swiper.isBeginning
                ? 'bg-custom-orange-100/30 cursor-default'
                : 'bg-custom-orange-100') +
            ' rounded-full h-auto flex justify-center items-center p-4 transition-colors border-4 border-white' +
            (swiper.isBeginning ? '' : ' hover:bg-custom-orange-150')
        "
        @click="swiper.slidePrev()"
    >
        <Icon
            name="material-symbols:keyboard-arrow-up"
            color="white"
            size="25px"
        />
    </button>
    <button
        :class="
            (swiper.isEnd
                ? 'bg-custom-orange-100/30 cursor-default'
                : 'bg-custom-orange-100') +
            ' rounded-full h-auto flex justify-center items-center p-4 transition-colors border-4 border-white' +
            (swiper.isEnd ? '' : ' hover:bg-custom-orange-150')
        "
        @click="swiper.slideNext()"
    >
        <Icon
            name="material-symbols:keyboard-arrow-down"
            color="white"
            size="25px"
            class=""
        />
    </button>
</template>
