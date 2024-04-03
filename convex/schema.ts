import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    userId: v.string(),
    title: v.string(),
    color1: v.string(),
    color2: v.string(),
    content: v.optional(v.array(v.any())),
    imageUrl: v.optional(v.string()),
    coverImage: v.optional(v.id('_storage')),
    isPublished: v.boolean(),
    userInfo: v.optional(v.any()),
  })
    .index('by_userId', ['userId'])
    .searchIndex('search_title', {
      searchField: 'title',
    }),

  users: defineTable({
    tokenIdentifier: v.string(),
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    isVerified: v.optional(v.boolean()),
    posts: v.optional(v.array(v.id('posts'))),
  })
    .index('by_userId', ['userId'])
    .index('by_name', ['name'])
    .index('by_token', ['tokenIdentifier']),
});
