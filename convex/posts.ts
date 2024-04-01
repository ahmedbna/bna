import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const get = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').collect();

    return posts;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    coverImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const userId = identity.subject;

    const post = await ctx.db.insert('posts', {
      title: args.title,
      coverImage: args.coverImage,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return post;
  },
});
