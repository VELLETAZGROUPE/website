import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  site: "https://groupe-velletaz.com/",
  integrations: [tailwind(), sitemap(), purgecss()],
});