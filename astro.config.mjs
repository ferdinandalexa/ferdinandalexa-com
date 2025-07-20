import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: 'https://ferdinandalexa.com',
  integrations: [mdx()],
  output: "static",
  adapter: vercel(),
  server: {
    allowedHosts: true
  }
});