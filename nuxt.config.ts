// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxt/image'],
    css: ['./assets/css/global.css'],
    tailwindcss: {
        cssPath: ['./assets/css/tailwind.css', { injectPosition: 0 }],
        configPath: './tailwind.config.js',
        exposeConfig: false,
    },
    googleFonts: {
        families: {
            Syne: [400, 500, 600, 700],
            'DM Serif Text': true,
        },
    },
    colorMode: {
        preference: 'dark',
    },
})
