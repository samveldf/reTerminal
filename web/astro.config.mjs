// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import relativeLinks from 'astro-relative-links';
import icon from 'astro-icon';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [relativeLinks(), icon()],

  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
