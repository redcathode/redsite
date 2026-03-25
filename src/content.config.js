import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        published: z.boolean(),
    })
});

export const collections = {
    'blog': blogCollection,
};
