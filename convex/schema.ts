import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    coverImage: v.optional(v.string()),
    title: v.string(),
    excerpt: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
    isPublished: v.boolean(),
  })
    .index('by_user', ['userId'])
    .index('by_title', ['title']),
});
