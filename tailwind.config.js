import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  plugins: [
    iconsPlugin({
      collections: getIconCollections('all'),
    }),
  ],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#F9F6F1',
          100: '#F5EFE7',
        },
        'custom-orange': {
          100: '#C05325',
          150: '#934220',
        },
        'red-brown': '#564646',
      },
      fontFamily: {
        samir: ['SamirKhouajaMaghribi', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        'dm-serif': ['DM Serif Text', 'serif'],
      },
      dropShadow: {
        'landing-card': '0 10px 40px 0 rgba(195, 195, 195, 0.25)',
      },
    },
  },
}

export default tailwindConfig
