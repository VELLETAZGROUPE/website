/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
    },
  },
  safelist: ["lg:col-span-4", "lg:col-span-3", "lg:col-span-6"],
  plugins: [],
};
