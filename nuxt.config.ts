require('dotenv').config()

export default defineNuxtConfig({
  devtools: { enabled: true },
  // Modules
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts', '@nuxt/image'],

  // Compiler
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['lite-youtube'].includes(tag),
    },
  },

  // Envrioment Variables
  runtimeConfig: {
    public: {
      brevoApiKey: process.env.NUXT_ENV_BREVO_API_KEY,
    },
  },

  // CSS
  css: ['./assets/css/global.css', './assets/css/landing.css'],

  // Meta
  app: {
    head: {
      title: 'Majaliss - Trouvez un institut près de chez vous',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Notre mission est de faciliter l'accès aux sciences religieuses en référençant tous les instituts de France dans un seul et même endroit afin que tu puisses les comparer entre eux et choisir celui qui te correspond vraiment !",
        },
        {
          name: "application-name",
          content: "Majaliss"
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Majaliss"
        },
        {
          name: "author",
          content: "Majaliss"
        },
        
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/majaliss_logo.svg' },
      ],
    },
  },

  // TailwindCSS Config
  tailwindcss: {
    cssPath: ['./assets/css/tailwind.css', { injectPosition: 0 }],
    configPath: './tailwind.config.js',
    exposeConfig: false,
  },

  // Google Fonts Config
  googleFonts: {
    families: {
      Syne: [400, 500, 600, 700],
      'DM Serif Text': true,
    },
  },

  // UI Config
  colorMode: {
    preference: 'light',
  },

  // Nitro
  nitro: {
    storage: {
      redis: {
        driver: process.env.NITRO_STORAGE_DRIVER,
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USER_NAME,
        password: process.env.REDIS_USER_PASSWORD,
        db: 0,
      }
    }
  }
})
