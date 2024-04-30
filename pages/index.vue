<script setup lang="ts">
// Imports components
import LandingMosqueeCard from '~/components/ui/LandingMosqueeCard.vue'
import LandingSwiperNavButton from '~/components/ui/LandingSwiperNavButton.vue'

// Imports Libraries
import { SwiperSlide, Swiper } from 'swiper/vue'
import gsap from 'gsap'
import JSConfetti from 'js-confetti'

// Data
const config = useRuntimeConfig()
const toast = useToast()
const jsConfetti = ref<JSConfetti>()

const emailInputValue = ref('')
const mosquees = [
  {
    name: 'Institut Ilm',
    address: 'Paris, Île-de-France',
    image: '/images/landing/schools/school_1.jpg',
    description:
      "L'institution Ilm est une école qui propose des cours de religion, de Coran et d'arabe. L'école est située à Paris, en France.",
    website: '',
    type: 'Cours payants',
    courses: {
      islamic: true,
      quran: true,
      arabic: true,
    },
  },
  {
    name: "L'arabe facile",
    address: 'Lyon, Auvergne-Rhône-Alpes',
    image: '/images/landing/schools/school_2.jpg',
    description:
      "L'Arabe Facile est une école qui est réputée pour son enseignement de la langue arabe. L'école est située à Lyon, en France.",
    website: '',
    type: 'Cours payants',
    courses: {
      islamic: false,
      quran: true,
      arabic: true,
    },
  },
  {
    name: 'Ecole Al-Mihrab',
    address: 'En ligne',
    image: '/images/landing/schools/school_3.jpg',
    description:
      "L'école Al-Mihrab est une école qui a pu accueillir des milliers d'élèves depuis sa création.",
    website: '',
    type: 'Cours gratuits',
    courses: {
      islamic: true,
      quran: false,
      arabic: true,
    },
  },
  {
    name: 'Institut Musulman',
    address: "Marseille, Provence-Alpes-Côte d'Azur",
    image: '/images/landing/schools/school_4.jpg',
    description:
      "L'Institut Musulman est une institut qui propose des cours de religion et de Coran. L'institut à permis à des milliers de personnes d'apprendre leur religion et de se rapprocher d'Allah.",
    website: '',
    type: 'Cours gratuits',
    courses: {
      islamic: true,
      quran: true,
      arabic: false,
    },
  },
  {
    name: 'Madrassa Saleh',
    address: 'Gagny, Île-de-France',
    image: '/images/landing/schools/school_5.png',
    description:
      'Madrassa Saleh de Gagny est une madrassa situé à Gagny, en France. Elle est la plus grande madrassa de Gagny, et accueille des élèves de tout âge',
    website: '',
    type: 'Cours payants',
    courses: {
      islamic: true,
      quran: false,
      arabic: false,
    },
  },
]

// Hooks cycle
onMounted(() => {
  // JSConfetti
  jsConfetti.value = new JSConfetti()

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

// Methods
const addContactToList = (email: string) => {
  let errorDescription =
    "Une erreur est survenue lors de l'ajout à la liste de contact"

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': config.public.brevoApiKey,
    },
    body: JSON.stringify({
      email: emailInputValue.value,
      emailBlacklisted: false,
      smsBlacklisted: false,
      listIds: [3],
      updateEnabled: false,
    }),
  }

  fetch('https://api.brevo.com/v3/contacts', options)
    .then((response) => response.json())
    .then((response) => {
      if (response.code) {
        switch (response.code) {
          case 'duplicate_parameter':
            errorDescription = 'Vous êtes déjà inscrit à la liste de contact'
            break

          case 'invalid_parameter':
            errorDescription = "L'adresse email est invalide"
            break

          default:
            break
        }

        toast.add({
          title: 'Erreur',
          description: errorDescription,
          icon: 'i-heroicons-x-circle',
          color: 'red',
          timeout: 5000,
        })
      } else {
        jsConfetti.value?.addConfetti()
        toast.add({
          title: 'Succès',
          description: 'Vous avez bien été ajouté à la liste de contact',
          icon: 'i-heroicons-check-badge',
          color: 'primary',
          timeout: 5000,
        })
      }
    })
    .catch(() => {
      toast.add({
        title: 'Erreur',
        description: errorDescription,
        icon: 'i-heroicons-x-circle',
        color: 'red',
        timeout: 5000,
      })
    })

  // Reset input value
  emailInputValue.value = ''
}
</script>

<template>
  <div
    class="relative h-auto overflow-hidden p-4 pb-16 lg:h-screen lg:max-h-screen lg:overflow-y-hidden lg:p-20"
  >
    <p
      class="home__first_arab_text absolute -top-16 left-12 z-10 -translate-x-[200%] font-samir text-[300px] text-beige-100"
    >
      مجالس
    </p>
    <p
      class="home__second_arab_text absolute -bottom-36 right-5 z-10 translate-x-[200%] overflow-hidden font-samir text-[300px] text-beige-100"
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
            class="home__item_left_effect opacity-0"
          />
          <div class="relative inline-block">
            <p
              class="home__item_left_effect inline-block rounded-2xl border-[1px] border-slate-200 bg-white px-5 py-3 font-syne text-base text-custom-orange-150 opacity-0"
            >
              Coming soon
            </p>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="40"
              class="home__stars absolute -right-14 top-9 scale-0"
            />
          </div>
          <div class="relative">
            <h1
              class="home__item_left_effect my-7 font-dm-serif text-3xl text-custom-orange-150 opacity-0 sm:text-2xl lg:text-4xl"
            >
              Majaliss, la plateforme de référence pour apprendre sa religion
            </h1>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="28"
              width="28"
              class="home__stars absolute -top-8 right-28 hidden scale-0 lg:block"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="14"
              width="14"
              class="home__stars absolute -top-6 right-[85px] scale-0"
            />
          </div>
          <p
            class="home__item_left_effect pr-4 font-syne text-base font-normal text-red-brown opacity-0 sm:text-lg lg:text-xl"
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
              class="home__item_left_effect relative mb-5 inline-block font-syne text-base font-semibold text-custom-orange-150 opacity-0 sm:text-lg lg:text-xl"
            >
              Pss ! Ne rate surtout pas la sortie du site
              <NuxtImg
                src="/images/landing/star.svg"
                alt="Etoile"
                height="24"
                width="24"
                class="home__stars absolute -right-6 -top-7 scale-0"
              />
              <NuxtImg
                src="/images/landing/star.svg"
                alt="Etoile"
                height="14"
                width="14"
                class="home__stars absolute -left-8 top-0 scale-0"
              />
            </p>
          </div>
          <div
            class="home__item_left_effect relative mb-2 flex h-14 flex-col rounded-xl border-[1px] border-slate-200 bg-white px-3 py-3 font-syne opacity-0 sm:mb-0 sm:h-20 sm:flex-row sm:rounded-xl sm:px-6"
          >
            <input
              type="email"
              class="h-full w-full text-base focus:outline-none sm:mb-2 sm:rounded-l-2xl"
              placeholder="exemple@gmail.com"
              v-model="emailInputValue"
            />

            <button
              class="hidden h-full w-2/5 rounded-xl bg-custom-orange-100 py-4 text-center font-syne text-base text-white transition-colors hover:bg-custom-orange-150 sm:block"
              @click="addContactToList"
            >
              Être alerté
            </button>
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="30"
              width="30"
              class="home__stars absolute -bottom-8 -left-10 hidden scale-0 lg:block"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="22"
              width="22"
              class="home__stars absolute -bottom-9 left-[17%] scale-0"
            />
            <NuxtImg
              src="/images/landing/star.svg"
              alt="Etoile"
              height="10"
              width="10"
              class="home__stars absolute -bottom-5 -right-12 scale-0"
            />
          </div>
          <button
            class="home__item_left_effect relative z-20 block h-14 w-full rounded-xl bg-custom-orange-100 text-center font-syne text-base text-white opacity-0 transition-colors hover:bg-custom-orange-150 sm:hidden"
            @click="addContactToList"
          >
            Être alerté
          </button>
        </div>
      </div>

      <!-- Desktop Swiper -->
      <div class="z-20 hidden w-[40%] justify-center lg:flex">
        <Swiper
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
            class="absolute -right-[30px] top-1/2 flex h-auto -translate-y-1/2 flex-col gap-3"
          >
            <LandingSwiperNavButton />
          </div>
        </Swiper>
      </div>

      <!-- Mobile Swiper -->
      <div class="z-20 my-10 lg:hidden">
        <Swiper
          direction="horizontal"
          centered-slides
          slides-per-view="auto"
          space-between="30"
          :speed="700"
          wrapper-class="flex items-center"
        >
          <SwiperSlide
            v-for="(mosquee, index) in mosquees"
            :key="index"
            v-slot="{ isActive }"
          >
            <LandingMosqueeCard :isActive="isActive" v-bind="mosquee" />
          </SwiperSlide>
          <div
            class="absolute -bottom-8 left-1/2 flex h-auto -translate-x-1/2 gap-3"
          >
            <LandingSwiperNavButton vertical />
          </div>
        </Swiper>
      </div>
    </div>
  </div>
</template>
