import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  site: 'https://ferdinandalexa.com',
  integrations: [mdx()],
  output: "hybrid",
  adapter: netlify()
});