import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  posts: defineTable({
    userId: v.string(),
    title: v.string(),
    color1: v.string(),
    color2: v.string(),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.string()),
    // clubs: v.optional(v.array(v.id('clubs'))),
    clubs: v.optional(v.array(v.any())),
    userInfo: v.optional(v.any()),
  })
    .index('by_userId', ['userId'])
    .index('by_publised', ['isPublished'])
    .searchIndex('search_title', {
      searchField: 'title',
    }),

  users: defineTable({
    tokenIdentifier: v.string(),
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    heading: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    isVerified: v.optional(v.boolean()),
    posts: v.optional(v.array(v.id('posts'))),
  })
    .index('by_userId', ['userId'])
    .index('by_name', ['name'])
    .index('by_token', ['tokenIdentifier']),

  likes: defineTable({
    userId: v.string(),
    postId: v.id('posts'),
  })
    .index('by_userId', ['userId'])
    .index('by_postId', ['postId']),

  saves: defineTable({
    userId: v.string(),
    postId: v.id('posts'),
  })
    .index('by_userId', ['userId'])
    .index('by_postId', ['postId']),

  comments: defineTable({
    userId: v.string(),
    postId: v.id('posts'),
    content: v.string(),
    userInfo: v.optional(v.any()),
  })
    .index('by_userId', ['userId'])
    .index('by_postId', ['postId']),

  follows: defineTable({
    userId: v.string(),
    followerId: v.string(),
    userInfo: v.optional(v.any()),
  })
    .index('by_userId', ['userId'])
    .index('by_follower', ['followerId']),

  waitings: defineTable({
    userId: v.string(),
    email: v.string(),
  })
    .index('by_userId', ['userId'])
    .index('by_email', ['email']),

  clubs: defineTable({
    name: v.string(),
    slug: v.string(),
    posts: v.array(v.id('posts')),
    followerIds: v.optional(v.array(v.string())),
  })
    .index('by_name', ['name'])
    .index('by_slug', ['slug']),

  clubhouses: defineTable({
    userId: v.string(),
    clubSlug: v.string(),
    content: v.string(),
    contentType: v.string(),
    userInfo: v.optional(v.any()),
    parentId: v.optional(v.id('clubhouses')),
  }).index('by_clubSlug', ['clubSlug']),
});
