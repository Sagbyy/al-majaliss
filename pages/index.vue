<script setup lang="ts">
// Imports components
import LandingMosqueeCard from '~/components/ui/LandingMosqueeCard.vue'
import LandingSwiperNavButton from '~/components/ui/LandingSwiperNavButton.vue'
import institutes from '~/data/institutes'
import Objective from '~/components/ui/Objective.vue'

// Imports Libraries
import { SwiperSlide, Swiper } from 'swiper/vue'

import gsap from 'gsap'
import { Autoplay, Keyboard, Mousewheel } from 'swiper/modules'

const modules = [Autoplay, Keyboard, Mousewheel]

// Services
import { RedisService } from '~/server/services/redis.service'

const redisService: RedisService = new RedisService()

// Data
const config = useRuntimeConfig()

const toast = useToast()

const subscribeModal = ref(false)

const screenZoom = ref(false)

const emailInputValue = ref('')

const alreadySubscribe = ref(false)

const alreadySubscribeElement = ref(null)

const objectiveTextElement = ref(null)

// Hooks cycle
onMounted(() => {
  // Check if the user is already subscribed
  const alreadySubscribeCache = localStorage.getItem('subscribed')

  alreadySubscribeCache === 'true'
    ? (alreadySubscribe.value = true)
    : (alreadySubscribe.value = false)
})

onMounted(() => {
  // Check if the screen is zoomed at 125%
  const zoomLevel = Math.round(window.devicePixelRatio * 100)
  if (zoomLevel === 125) {
    screenZoom.value = true
  } else {
    screenZoom.value = false
  }

  nextTick(() => {
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
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<+=0.8'
      )
      .fromTo(
        '.home__socials',
        {
          opacity: 0,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
        },
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
      .fromTo(
        '.home__mawaqit',
        {
          opacity: 0,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '<'
      )
  })
})

onNuxtReady(() => {
  redisService.poller()
})

// Methods
const addContactToList = () => {
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

  if (!emailInputValue.value)
    return toast.add({
      title: 'Erreur',
      description: 'Veuillez renseigner une adresse email',
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 5000,
    })

  fetch('https://api.brevo.com/v3/contacts', options)
    .then((response) => response.json())
    .then(async (response) => {
      watchEffect(() => {
        // Set the opacity of the already subscribe element
        if (alreadySubscribe.value) {
          gsap.to(alreadySubscribeElement.value, {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          })
        }
        console.log('alreadySubscribeElement', alreadySubscribeElement.value)
      })

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
        // Open modal
        subscribeModal.value = true

        // Set the user as subscribed
        localStorage.setItem('subscribed', 'true')
        alreadySubscribe.value = true

        await redisService.incrementEmailCounter()

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
  <!-- Modal -->
  <UModal
    v-model="subscribeModal"
    prevent-close
    :ui="{
      overlay: {
        background: 'bg-black/25',
      },
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-syne text-base font-semibold leading-6">
            Inscription confirmée
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="subscribeModal = false"
          />
        </div>
      </template>

      <p class="font-syne">
        Félicitation, vous êtes désormais inscrit à notre liste de contact !
        Rejoignez le Discord pour être informé des dernières nouveautés.
      </p>
      <a
        class="mt-5 flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-discord py-3 text-center font-medium text-white transition-colors hover:bg-dark-discord"
        href="https://discord.gg/MfqAvuca5W"
        target="_blank"
      >
        <Icon name="ic:baseline-discord" color="white" size="20" />
        <p>Rejoindre le Discord</p>
      </a>
    </UCard>
  </UModal>

  <div
    :class="
      'relative h-auto overflow-hidden !bg-white p-4 pb-16 lg:h-screen lg:max-h-screen ' +
      (screenZoom ? 'lg:p-10' : 'lg:px-20 lg:py-8')
    "
  >
    <p
      class="home__first_arab_text absolute -top-16 left-12 z-10 -translate-x-[200%] select-none font-samir text-[300px] text-beige-100"
    >
      مجالس
    </p>
    <p
      class="home__second_arab_text absolute -bottom-36 right-5 z-10 translate-x-[200%] select-none overflow-hidden font-samir text-[300px] text-beige-100"
    >
      مجالس
    </p>
    <div
      :class="
        'relative mx-auto flex h-auto w-full max-w-[2000px] flex-col rounded-[50px] bg-beige-50 p-10 text-6xl ' +
        (screenZoom ? 'md:p-14' : 'md:p-16') +
        ' lg:h-full lg:flex-row'
      "
    >
      <div
        class="relative z-20 flex h-full w-full flex-col justify-center gap-10 lg:w-[60%] lg:justify-center lg:gap-2"
      >
        <div>
          <div class="flex flex-row items-center gap-8">
            <NuxtImg
              src="/majaliss_logo.png"
              alt="Logo Majaliss"
              height="80px"
              class="home__item_left_effect h-20 opacity-0"
            />
            <div class="relative">
              <p
                class="home__item_left_effect rounded-2xl border-[1px] border-slate-200 bg-white px-5 py-3 font-syne text-sm text-black opacity-0"
              >
                Coming soon
              </p>
              <NuxtImg
                src="/images/landing/star.svg"
                alt="Etoile"
                height="40"
                class="home__stars absolute -right-14 top-0 scale-0"
              />
            </div>
          </div>
          <div class="relative">
            <h1
              class="home__item_left_effect my-7 font-dm-serif text-3xl text-custom-blue-100 opacity-0 sm:text-2xl lg:text-3xl"
            >
              Bienvenue sur Majaliss, la plateforme de référence dans la
              recherche de sciences religieuses.
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
            class="home__item_left_effect pr-4 font-syne text-base font-normal text-red-brown opacity-0 sm:text-lg lg:text-lg"
          >
            <span class="font-semibold">Pourquoi Majaliss ? </span>Parce que
            nous croyons que l'accès à l'éducation religieuse devrait être
            simple et direct ! <br /><br />

            <span class="font-semibold">Comment ça marche ?</span> Majaliss
            centralise les informations de tous les instituts religieux de
            France au même endroit pour vous permettre de les découvrir, de les
            comparer, et de choisir celui qui répond vraiment à vos attentes.
          </p>
        </div>

        <div v-if="!alreadySubscribe" class="lg:pr-16">
          <div>
            <p
              class="home__item_left_effect relative inline-block font-syne text-base font-semibold text-gold opacity-0 sm:text-sm lg:text-base"
            >
              Si tu veux que ce projet voit le jour, laisse nous ton mail !
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
            <Objective
              :objective-value="redisService.emailCounter"
              :objective-text-element="objectiveTextElement"
            />
          </div>
          <div
            class="home__item_left_effect relative mb-2 flex h-14 flex-col rounded-xl border-[1px] border-slate-200 bg-white px-3 py-3 font-syne opacity-0 sm:mb-0 sm:h-16 sm:flex-row sm:rounded-xl sm:px-6"
          >
            <input
              type="email"
              class="h-full w-full text-base focus:!outline-none sm:mb-2 sm:rounded-l-2xl"
              placeholder="exemple@gmail.com"
              v-model="emailInputValue"
            />

            <button
              class="hidden h-full w-2/6 rounded-xl bg-gold text-center font-syne text-base text-white transition-colors hover:bg-yellow-700 sm:block"
              @click="addContactToList"
            >
              Je soutiens
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
              class="home__stars absolute -bottom-9 left-[25%] scale-0"
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
            class="home__item_left_effect relative z-20 block h-14 w-full rounded-xl bg-gold text-center font-syne text-base text-white opacity-0 transition-colors hover:bg-yellow-700 sm:hidden"
            @click="addContactToList"
          >
            Je soutiens
          </button>
        </div>

        <!-- Already subscribe -->
        <div
          v-else
          class="home__item_left_effect mt-6 opacity-0 lg:pr-16"
          ref="alreadySubscribeElement"
        >
          <div
            class="relative mb-5 inline-block font-syne text-base text-red-brown sm:text-lg lg:text-lg"
          >
            <p>
              <span class="font-medium text-gold"
                >Vous êtes déjà inscrit à la liste de contact</span
              >, vous pouvez rejoindre le Discord dès maintenant pour être
              informé des dernières nouveautés !
            </p>
            <Objective :objective-value="redisService.emailCounter" />
            <a
              class="mt-5 flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-discord py-3 text-center font-medium text-white transition-colors hover:bg-dark-discord lg:w-2/4"
              href="https://discord.gg/MfqAvuca5W"
              target="_blank"
            >
              <Icon name="ic:baseline-discord" color="white" size="20" />
              <p class="text-base font-light">Rejoindre le Discord</p>
            </a>
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
          </div>
        </div>

        <!-- Socials media -->
        <div
          class="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:gap-2 lg:pr-16"
        >
          <div class="flex flex-row justify-center gap-6 lg:justify-start">
            <a
              href="https://twitter.com/majaliss_io"
              target="_blank"
              class="home__socials group flex h-12 w-12 items-center justify-center rounded-full bg-custom-blue-50 opacity-0 transition-colors hover:bg-custom-blue-100"
            >
              <Icon
                name="pajamas:twitter"
                size="18"
                class="text-custom-blue-100 transition-colors group-hover:text-custom-blue-50"
              />
            </a>
            <a
              href="https://www.instagram.com/majaliss_io/"
              target="_blank"
              class="home__socials group flex h-12 w-12 items-center justify-center rounded-full bg-custom-blue-50 opacity-0 transition-colors hover:bg-custom-blue-100"
            >
              <Icon
                name="ri:instagram-fill"
                size="18"
                class="text-custom-blue-100 transition-colors group-hover:text-custom-blue-50"
              />
            </a>
            <a
              href="https://www.tiktok.com/@majaliss_app?lang=fr"
              target="_blank"
              class="home__socials group flex h-12 w-12 items-center justify-center rounded-full bg-custom-blue-50 opacity-0 transition-colors hover:bg-custom-blue-100"
            >
              <Icon
                name="fa-brands:tiktok"
                size="18"
                class="text-custom-blue-100 transition-colors group-hover:text-custom-blue-50"
              />
            </a>
          </div>
          <div
            class="home__mawaqit flex flex-row items-center justify-center gap-3 opacity-0"
          >
            <p class="font-figtree text-xs uppercase text-neutral-500">
              Powered by
            </p>
            <NuxtImg
              src="/images/landing/mawaqit_logo_light.png"
              alt="Etoile"
              height="40"
              width="100"
            />
          </div>
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
          :modules="modules"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }"
          :keyboard="{
            enabled: true,
          }"
          :mousewheel="true"
          :initial-slide="1"
        >
          <SwiperSlide
            v-for="(institute, index) in institutes"
            :key="index"
            v-slot="{ isActive }"
          >
            <LandingMosqueeCard :isActive="isActive" v-bind="institute" />
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
          :modules="modules"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }"
        >
          <SwiperSlide
            v-for="(institute, index) in institutes"
            :key="index"
            v-slot="{ isActive }"
          >
            <LandingMosqueeCard :isActive="isActive" v-bind="institute" />
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
