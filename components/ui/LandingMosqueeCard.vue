<script setup lang="ts">
defineProps<{
  name: string
  address: string
  image: string
  description: string
  website: string
  courses: {
    islamic: boolean
    quran: boolean
    arabic: boolean
  }
  type: string
  isActive: boolean
}>()
</script>

<template>
  <div
    :class="
      'flex drop-shadow-landing-card h-auto w-auto flex-col gap-5 rounded-[32px] bg-white p-8 font-syne text-sm shadow-md transition-transform duration-1000 ease-out' +
      (isActive ? ' -rotate-2 hover:rotate-0' : '') +
      ' hover:-rotate-2'
    "
  >
    <div class="flex flex-row items-center gap-5 font-syne">
      <NuxtImg
        :src="image"
        :alt="name"
        class="h-12 w-12 rounded-full lg:h-[70px] lg:w-[70px]"
      />
      <div class="flex w-full flex-col lg:gap-2">
        <div class="flex flex-row items-center justify-between gap-3">
          <p
            class="font-dm-serif text-[14px] text-custom-orange-150 lg:text-[20px]"
          >
            {{ name }}
          </p>
          <p
            class="text-nowrap rounded-xl border-[1px] p-1 px-3 text-[10px] lg:p-2 lg:text-sm"
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
      class="flex flex-row justify-between gap-5 text-center text-neutral-500 px-6"
    >
      <div class="group cursor-pointer">
        <div
          class="mx-auto mb-2 w-[50px] rounded-full bg-beige-50 p-4 transition-colors group-hover:bg-custom-orange-150"
        >
          <Icon
            name="material-symbols:call"
            size="20px"
            class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
          />
        </div>
        <p>Appeler</p>
      </div>
      <div class="group cursor-pointer">
        <div
          class="mx-auto mb-2 w-[50px] rounded-full bg-beige-50 p-4 transition-colors group-hover:bg-custom-orange-150"
        >
          <Icon
            name="tabler:click"
            size="20px"
            class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
          />
        </div>
        <p>Site web</p>
      </div>
      <div class="group cursor-pointer">
        <div
          class="mx-auto mb-2 w-[50px] rounded-full bg-beige-50 p-4 transition-colors group-hover:bg-custom-orange-150"
        >
          <Icon
            name="bxl:instagram-alt"
            size="20px"
            class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
          />
        </div>
        <p>Instagram</p>
      </div>
      <div class="group cursor-pointer">
        <div
          class="mx-auto mb-2 w-[50px] rounded-full bg-beige-50 p-4 transition-colors group-hover:bg-custom-orange-150"
        >
          <Icon
            name="simple-icons:telegram"
            size="20px"
            class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
          />
        </div>
        <p>Telegram</p>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div v-if="courses.islamic"
        class="flex flex-row justify-center gap-5 rounded-xl border-[1px] p-3 text-sm"
      >
        <NuxtImg src="/images/landing/sciences_islamiques.svg" alt="Avatar" />
        <p>Science islamique</p>
      </div>
      <div
      v-if="courses.quran"
        class="flex flex-row justify-center gap-5 rounded-xl border-[1px] p-3 text-sm"
      >
        <NuxtImg src="/images/landing/sciences_du_coran.svg" alt="Coran" />
        <p>Science du Coran</p>
      </div>
      <div
      v-if="courses.arabic"
        class="flex flex-row justify-center gap-5 rounded-xl border-[1px] p-3 text-sm"
      >
        <NuxtImg src="/images/landing/langue_arabe.svg" alt="Lettre shine" />
        <p>Langue arabe</p>
      </div>
    </div>
  </div>
</template>
