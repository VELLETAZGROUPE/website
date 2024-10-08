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
  safelist: [
    "lg:col-span-4",
    "lg:col-span-3",
    "lg:col-span-6",
    "after:opacity-0",
    "after:opacity-10",
    "after:opacity-20",
    "after:opacity-30",
    "after:opacity-40",
    "after:opacity-50",
    "after:opacity-60",
    "after:opacity-70",
    "after:opacity-80",
    "after:opacity-90",
    "backdrop-blur-sm",
    "backdrop-blur-xl",
    "backdrop-blur-3xl",
  ],
  plugins: [],
};
