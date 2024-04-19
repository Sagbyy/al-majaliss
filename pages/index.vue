<script setup lang="ts">
import LandingMosqueeCard from '~/components/ui/LandingMosqueeCard.vue'
import { SwiperSlide, Swiper } from 'swiper/vue'
import LandingSwiperNavButton from '~/components/ui/LandingSwiperNavButton.vue'

const mosquees = [
    {
        name: 'Mosquée de Paris',
        address: "2 bis Place du Puits de l'Ermite, 75005 Paris",
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Paris est un édifice religieux et culturel musulman situé dans le 5ᵉ arrondissement de Paris, en France. Inaugurée le 15 juillet 1926, elle est la première mosquée construite en France métropolitaine.',
        website: 'https://www.mosquee-de-paris.org/',
        free: true,
    },
    {
        name: 'Mosquée de Lyon',
        address: '146 Boulevard Pinel, 69500 Bron',
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Lyon est un édifice religieux musulman situé à Lyon, en France. Inaugurée en 1994, elle est la plus grande mosquée de France.',
        website: 'https://www.mosquee-lyon.org/',
        free: true,
    },
    {
        name: 'Mosquée de Marseille',
        address: '81 Boulevard National, 13003 Marseille',
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Marseille est un édifice religieux musulman situé à Marseille, en France. Inaugurée en 2010, elle est la plus grande mosquée de Marseille.',
        website: 'https://www.mosquee-marseille.com/',
        free: true,
    },
    {
        name: 'Mosquée de Strasbourg',
        address: '6 Rue Averroès, 67200 Strasbourg',
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Strasbourg est un édifice religieux musulman situé à Strasbourg, en France. Inaugurée en 2012, elle est la plus grande mosquée de Strasbourg.',
        website: 'https://www.mosquee-strasbourg.com/',
        free: true,
    },
    {
        name: 'Mosquée de Bordeaux',
        address: '28 Rue de Tresses, 33800 Bordeaux',
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Bordeaux est un édifice religieux musulman situé à Bordeaux, en France. Inaugurée en 2018, elle est la plus grande mosquée de Bordeaux.',
        website: 'https://www.mosquee-bordeaux.com/',
        free: true,
    },
    {
        name: 'Mosquée de Lille',
        address: '11 Rue du Faubourg des Postes, 59000 Lille',
        image: '/images/landing/image_example_mosquee.png',
        description:
            'La Grande Mosquée de Lille est un édifice religieux musulman situé à Lille, en France. Inaugurée en 2000, elle est la plus grande mosquée de Lille.',
        website: 'https://www.mosquee-lille.com/',
        free: true,
    },
]
</script>

<template>
    <div class="h-screen max-h-screen relative p-20 overflow-hidden">
        <p
            class="font-samir text-[300px] absolute -top-16 left-12 text-beige-100 z-10"
        >
            مجالس
        </p>
        <p
            class="z-10 font-samir text-[300px] absolute -bottom-5 right-5 text-beige-100"
        >
            مجالس
        </p>
        <div
            class="bg-beige-50 text-6xl p-20 rounded-[50px] h-full flex flex-row relative w-full"
        >
            <div class="z-20 relative w-[60%]">
                <NuxtImg
                    src="/images/landing/moon.png"
                    alt="Lune"
                    height="57"
                />
                <p
                    class="text-custom-orange-150 font-syne text-base bg-white px-5 py-3 border-[1px] border-slate-200 rounded-2xl inline-block"
                >
                    Coming soon
                </p>
                <h1 class="text-4xl font-dm-serif text-custom-orange-150 my-7">
                    Majaliss, la plateforme de référence pour apprendre sa
                    religion
                </h1>
                <p
                    class="text-xl font-syne text-red-brown font-extra light pr-4 mb-20"
                >
                    Notre mission est de faciliter l'accès aux sciences
                    religieuses en référençant tous les instituts de France dans
                    un seul et même endroit afin que tu puisses les comparer
                    entre eux et choisir celui qui te correspond vraiment !
                </p>
                <div class="pr-16">
                    <p
                        class="text-custom-orange-150 text-xl font-semibold font-syne mb-5"
                    >
                        Pss ! Ne rate surtout pas la sortie du site
                    </p>
                    <div
                        class="bg-white border-[1px] border-slate-200 rounded-2xl py-3 px-6 font-syne h-20 flex flex-row"
                    >
                        <input
                            type="text"
                            class="rounded-l-2xl h-full text-base w-full focus:outline-none"
                            placeholder="exemple@gmail.com"
                        />

                        <button
                            class="bg-custom-orange-100 font-syne text-white text-base text-center w-2/5 rounded-xl transition-colors hover:bg-custom-orange-150"
                        >
                            Être alerté
                        </button>
                    </div>
                </div>
            </div>
            <Swiper
                direction="vertical"
                centered-slides
                slides-per-view="auto"
                space-between="30"
                class="w-[40%] flex justify-center z-20"
                speed="700"
            >
                <SwiperSlide
                    v-for="(mosquee, index) in mosquees"
                    :key="index"
                    v-slot="{ isActive }"
                >
                    <LandingMosqueeCard :isActive="isActive" v-bind="mosquee" />
                </SwiperSlide>
                <div
                    class="absolute -right-[30px] top-1/2 -translate-y-1/2 flex flex-col gap-8 h-auto"
                >
                    <LandingSwiperNavButton />
                </div>
            </Swiper>
        </div>
    </div>
</template>
