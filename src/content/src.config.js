import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
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