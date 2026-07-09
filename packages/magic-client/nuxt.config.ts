import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-07-09',

  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  css: ['~/assets/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },
});
