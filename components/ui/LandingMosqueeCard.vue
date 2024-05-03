<script setup lang="ts">
defineProps<{
  name: string
  address: string
  image: string
  type: string
  courses: {
    islamic: boolean
    quran: boolean
    arabic: boolean
  }
  socials: {
    phone: string | null
    website: string | null
    instagram: string | null
    telegram: string | null
  }
  isActive: boolean
}>()
</script>

<template>
  <div
    :class="
      'flex h-auto w-auto min-w-64 flex-col gap-5 rounded-[32px] bg-white p-6 font-syne text-sm shadow-md drop-shadow-landing-card transition-transform duration-1000 ease-out sm:p-8' +
      (isActive ? ' -rotate-2 hover:rotate-0' : '') +
      ' hover:-rotate-2'
    "
  >
    <div class="flex flex-row items-center gap-2 font-syne lg:gap-5">
      <NuxtImg
        :src="image"
        :alt="name"
        class="h-12 w-12 rounded-full lg:h-[70px] lg:w-[70px]"
      />
      <div class="flex w-full flex-col">
        <div
          class="items-left flex flex-row items-center justify-between gap-2"
        >
          <p
            class="text-custom-blue-100 font-dm-serif text-[14px] lg:text-[20px]"
          >
            {{ name }}
          </p>
          <p
            class="inline-block max-w-16 text-nowrap rounded-xl border-[1px] p-1 text-center text-[8.5px] lg:max-w-max lg:p-2 lg:text-sm"
          >
            {{ type }}
          </p>
        </div>
        <p class="font-syne text-[10px] text-neutral-500 lg:text-sm">
          {{ address }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-row justify-center gap-3 text-center text-[10px] text-neutral-500 lg:gap-5 lg:px-6 lg:text-base"
    >
      <a
        :href="'tel:' + socials.phone"
        v-if="socials.phone"
        class="group w-1/4 cursor-pointer"
      >
        <div
          class="mx-auto mb-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-beige-50 transition-colors group-hover:bg-gold lg:h-[50px] lg:w-[50px]"
        >
          <Icon
            name="material-symbols:call"
            size="20px"
            class="w-3 text-gold transition-colors group-hover:text-beige-50 lg:w-5"
          />
        </div>
        <p>Appeler</p>
      </a>
      <a
        :href="socials.website"
        target="_blank"
        v-if="socials.website"
        class="group w-1/4 cursor-pointer"
      >
        <div
          class="mx-auto mb-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-beige-50 transition-colors group-hover:bg-gold lg:h-[50px] lg:w-[50px]"
        >
          <Icon
            name="tabler:click"
            size="20px"
            class="w-3 text-gold transition-colors group-hover:text-beige-50 lg:w-5"
          />
        </div>
        <p>Site web</p>
      </a>
      <a
        :href="socials.instagram"
        target="_blank"
        v-if="socials.instagram"
        class="group w-1/4 cursor-pointer"
      >
        <div
          class="mx-auto mb-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-beige-50 transition-colors group-hover:bg-gold lg:h-[50px] lg:w-[50px]"
        >
          <Icon
            name="bxl:instagram-alt"
            size="20px"
            class="w-3 text-gold transition-colors group-hover:text-beige-50 lg:w-5"
          />
        </div>
        <p>Instagram</p>
      </a>
      <a
        :href="socials.telegram"
        target="_blank"
        v-if="socials.telegram"
        class="group w-1/4 cursor-pointer"
      >
        <div
          class="mx-auto mb-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-beige-50 transition-colors group-hover:bg-gold lg:h-[50px] lg:w-[50px]"
        >
          <Icon
            name="simple-icons:telegram"
            size="20px"
            class="w-3 text-gold transition-colors group-hover:text-beige-50 lg:w-5"
          />
        </div>
        <p>Telegram</p>
      </a>
    </div>
    <div class="flex flex-col gap-3">
      <div
        v-if="courses.islamic"
        class="flex flex-row items-center justify-center gap-5 rounded-xl border-[1px] p-3 text-xs lg:text-sm"
      >
        <NuxtImg
          src="/images/landing/sciences_islamiques.svg"
          alt="Avatar"
          class="w-4 lg:w-6"
        />
        <p>Science islamique</p>
      </div>
      <div
        v-if="courses.quran"
        class="flex flex-row items-center justify-center gap-5 rounded-xl border-[1px] p-3 text-xs lg:text-sm"
      >
        <NuxtImg
          src="/images/landing/sciences_du_coran.svg"
          alt="Coran"
          class="w-4 lg:w-6"
        />
        <p>Science du Coran</p>
      </div>
      <div
        v-if="courses.arabic"
        class="flex flex-row items-center justify-center gap-5 rounded-xl border-[1px] p-3 text-xs lg:text-sm"
      >
        <NuxtImg
          src="/images/landing/arab_language.svg"
          alt="Lettre shine"
          class="w-4 lg:w-6"
        />
        <p>Langue arabe</p>
      </div>
    </div>
  </div>
</template>
