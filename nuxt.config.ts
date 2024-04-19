import type { _fontFamily } from '#tailwind-config/theme'
import tailwindConfig from './tailwind.config.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxt/image'],
    css: ['./assets/css/global.css'],
    tailwindcss: {
        cssPath: ['./assets/css/tailwind.css', { injectPosition: 0 }],
        configPath: './tailwind.config.js',
        exposeConfig: false,
        config: {
            ...tailwindConfig,
        },
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
