import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://ferdinandalexa.com',
  integrations: [mdx()],
  output: "hybrid",
  adapter: vercel()
});