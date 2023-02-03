import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date().transform((str) => new Date(str)),
    description: z.string(),
    draft: z.boolean().default(false)
  })
});

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.string(),
    description: z.string(),
    tools: z.string().array(),
    demo: z.string(),
    highlighted: z.boolean().default(false),
    top: z.number().optional()
  })
});

export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
};