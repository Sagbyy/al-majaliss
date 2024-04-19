<script setup lang="ts">
defineProps<{
    name: string
    address: string
    image: string
    description: string
    website: string
    free: boolean
    isActive: boolean
}>()
</script>

<template>
    <div
        :class="
            'h-auto w-auto bg-white text-sm p-8 rounded-[32px] flex flex-col gap-5 font-syne shadow-md transition-transform ease-out duration-1000' +
            (isActive ? ' -rotate-2 ' : '') +
            ' hover:-rotate-2'
        "
    >
        <div class="flex flex-row items-center gap-5 font-syne">
            <NuxtImg
                :src="image"
                :alt="name"
                height="70px"
                width="70px"
                class="rounded-full"
            />
            <div class="w-full flex flex-col gap-2">
                <div class="flex flex-row justify-between items-center">
                    <p class="text-custom-orange-150 text-[20px] font-dm-serif">
                        {{ name }}
                    </p>
                    <p class="border-[1px] p-2 text-sm rounded-xl text-nowrap">
                        Cours gratuit
                    </p>
                </div>
                <p class="text-sm text-neutral-500 font-syne">
                    {{ address }}
                </p>
            </div>
        </div>
        <div class="text-center text-neutral-500 flex flex-row justify-between">
            <div class="cursor-pointer group">
                <div
                    class="p-4 rounded-full bg-beige-50 mb-2 transition-colors group-hover:bg-custom-orange-150"
                >
                    <Icon
                        name="material-symbols:call"
                        size="20px"
                        class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
                    />
                </div>
                <p>Appeler</p>
            </div>
            <div class="cursor-pointer group">
                <div
                    class="p-4 rounded-full bg-beige-50 mb-2 transition-colors group-hover:bg-custom-orange-150"
                >
                    <Icon
                        name="tabler:click"
                        size="20px"
                        class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
                    />
                </div>
                <p>Site web</p>
            </div>
            <div class="cursor-pointer group">
                <div
                    class="p-4 rounded-full bg-beige-50 mb-2 transition-colors group-hover:bg-custom-orange-150"
                >
                    <Icon
                        name="bxl:instagram-alt"
                        size="20px"
                        class="text-custom-orange-150 transition-colors group-hover:text-beige-50"
                    />
                </div>
                <p>Instagram</p>
            </div>
            <div class="cursor-pointer group">
                <div class="p-4 rounded-full bg-beige-50 mb-2">
                    <Icon
                        name="simple-icons:telegram"
                        color="#934220"
                        size="20px"
                    />
                </div>
                <p>Telegram</p>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div
                class="flex flex-row justify-center gap-5 p-3 text-base border-[1px] rounded-xl"
            >
                <NuxtImg
                    src="/images/landing/sciences_islamiques.svg"
                    alt="Avatar"
                />
                <p>Science islamique</p>
            </div>
            <div
                class="flex flex-row justify-center gap-5 p-3 text-base border-[1px] rounded-xl"
            >
                <NuxtImg
                    src="/images/landing/sciences_du_coran.svg"
                    alt="Coran"
                />
                <p>Science du Coran</p>
            </div>
            <div
                class="flex flex-row justify-center gap-5 p-3 text-base border-[1px] rounded-xl"
            >
                <NuxtImg
                    src="/images/landing/langue_arabe.svg"
                    alt="Lettre shine"
                />
                <p>Langue arabe</p>
            </div>
        </div>
    </div>
</template>
