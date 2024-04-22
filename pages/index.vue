<script setup lang="ts">
// Imports components
import LandingMosqueeCard from '~/components/ui/LandingMosqueeCard.vue'
import LandingSwiperNavButton from '~/components/ui/LandingSwiperNavButton.vue'

// Imports Libraries
import { SwiperSlide, Swiper as SwiperElement } from 'swiper/vue'

import gsap from 'gsap'

// Data
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

// Hooks cycle
onMounted(() => {
  // GSAP
  const TL = gsap.timeline({ delay: 0.5 })

  TL.fromTo(
    '.swiper-slide',
    {
      y: -30,
      scale: 0,
      rotate: -10,
    },
    {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
    }
  )
    .fromTo(
      '.home__first_arab_text',
      {
        x: '-200%',
      },
      { x: 0, duration: 1, ease: 'power2.out' },
      '<+=0.5'
    )
    .fromTo(
      '.home__second_arab_text',
      {
        x: '200%',
      },
      { x: 0, duration: 1, ease: 'power2.out' },
      '<'
    )
    .fromTo(
      '.home__item_left_effect',
      {
        opacity: 0,
        y: -5,
      },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
      '<+=0.8'
    )
    .fromTo(
      '.home__stars',
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
      },
      '<+=0.5'
    )
})
</script>

<template>
  <div
    class="relative h-auto overflow-hidden p-4 pb-16 lg:h-screen lg:max-h-screen lg:overflow-y-hidden lg:p-20"
  >
    <p
      class="home__first_arab_text absolute -top-16 left-12 z-10 font-samir text-[300px] text-beige-100"
    >
      مجالس
    </p>
    <p
      class="home__second_arab_text absolute -bottom-36 right-5 z-10 overflow-hidden font-samir text-[300px] text-beige-100"
    >
      مجالس
    </p>
    <div
      class="relative flex h-auto w-full flex-col rounded-[50px] bg-beige-50 p-10 text-6xl md:p-[5%] lg:h-full lg:flex-row"
    >
      <div
        class="relative z-20 flex h-full w-full flex-col justify-center gap-10 lg:w-[60%] lg:justify-between lg:gap-0"
      >
        <div>
          <NuxtImg
            src="/moon.png"
            alt="Lune"
            height="57"
            class="home__item_left_effect"
          />
          <div class="relative inline-block">
            <p
              class="home__item_left_effect inline-block rounded-2xl border-[1px] border-slate-200 bg-white px-5 py-3 font-syne text-base text-custom-orange-150"
            >
              Coming soon
            </p>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="40"
              class="home__stars absolute -right-14 top-9"
            />
          </div>
          <div class="relative">
            <h1
              class="home__item_left_effect my-7 font-dm-serif text-3xl text-custom-orange-150 sm:text-2xl lg:text-4xl"
            >
              Majaliss, la plateforme de référence pour apprendre sa religion
            </h1>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="28"
              width="28"
              class="home__stars absolute -top-8 right-28 hidden lg:block"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="14"
              width="14"
              class="home__stars absolute -top-6 right-[85px]"
            />
          </div>
          <p
            class="home__item_left_effect font-normal pr-4 font-syne text-base text-red-brown sm:text-lg lg:text-xl"
          >
            Notre mission est de faciliter l'accès aux sciences religieuses en
            référençant tous les instituts de France dans un seul et même
            endroit afin que tu puisses les comparer entre eux et choisir celui
            qui te correspond vraiment !
          </p>
        </div>

        <div class="lg:pr-16">
          <div>
            <p
              class="home__item_left_effect relative mb-5 inline-block font-syne text-base font-semibold text-custom-orange-150 sm:text-lg lg:text-xl"
            >
              Pss ! Ne rate surtout pas la sortie du site
              <NuxtImg
                src="/images/landing/star.svg"
                alt="Etoile"
                height="24"
                width="24"
                class="home__stars absolute -right-6 -top-7"
              />
              <NuxtImg
                src="/images/landing/star.svg"
                alt="Etoile"
                height="14"
                width="14"
                class="home__stars absolute -left-8 top-0"
              />
            </p>
          </div>
          <div
            class="home__item_left_effect relative mb-2 flex h-14 flex-col rounded-xl border-[1px] border-slate-200 bg-white px-3 py-3 font-syne sm:mb-0 sm:h-20 sm:flex-row sm:rounded-xl sm:px-6"
          >
            <input
              type="text"
              class="h-full w-full text-base focus:outline-none sm:mb-2 sm:rounded-l-2xl"
              placeholder="exemple@gmail.com"
            />

            <button
              class="hidden h-full w-2/5 rounded-xl bg-custom-orange-100 text-center font-syne text-base text-white transition-colors hover:bg-custom-orange-150 sm:block"
            >
              Être alerté
            </button>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="30"
              width="30"
              class="home__stars absolute -bottom-8 -left-10 hidden lg:block"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="22"
              width="22"
              class="home__stars absolute -bottom-9 left-[17%]"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="10"
              width="10"
              class="home__stars absolute -bottom-5 -right-12"
            />
          </div>
          <button
            class="h- relative z-20 block h-14 w-full rounded-xl bg-custom-orange-100 text-center font-syne text-base text-white transition-colors hover:bg-custom-orange-150 sm:hidden"
          >
            Être alerté
          </button>
        </div>
      </div>
      <div class="z-20 hidden w-[40%] justify-center lg:flex">
        <SwiperElement
          direction="vertical"
          centered-slides
          slides-per-view="auto"
          space-between="30"
          :speed="700"
        >
          <SwiperSlide
            v-for="(mosquee, index) in mosquees"
            :key="index"
            v-slot="{ isActive }"
          >
            <LandingMosqueeCard :isActive="isActive" v-bind="mosquee" />
          </SwiperSlide>
          <div
            class="absolute -right-[30px] top-1/2 flex h-auto -translate-y-1/2 flex-col gap-8"
          >
            <LandingSwiperNavButton />
          </div>
        </SwiperElement>
      </div>
      <div class="z-20 my-10 lg:hidden">
        <SwiperElement
          direction="horizontal"
          centered-slides
          slides-per-view="auto"
          space-between="30"
          :speed="700"
          wrapper-class="flex"
        >
          <SwiperSlide
            v-for="(mosquee, index) in mosquees"
            :key="index"
            v-slot="{ isActive }"
          >
            <LandingMosqueeCard :isActive="isActive" v-bind="mosquee" />
          </SwiperSlide>
          <div
            class="absolute -bottom-8 left-1/2 flex h-auto -translate-x-1/2 gap-8"
          >
            <LandingSwiperNavButton vertical />
          </div>
        </SwiperElement>
      </div>
    </div>
  </div>
</template>
