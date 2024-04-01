import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const get = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').collect();

    return posts;
  },
});

export const getDraftPost = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error('Not found');
    }

    if (post.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (!post.isPublished) {
      return post;
    }
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    coverImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const userId = identity.subject;

    const post = await ctx.db.insert('posts', {
      coverImage: args.coverImage,
      title: args.title,
      excerpt: args.excerpt,
      userId,
      isPublished: false,
    });

    return post;
  },
});

export const publish = mutation({
  args: {
    id: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const userId = identity.subject;

    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error('Post not found');
    }

    if (existingPost.userId !== userId) {
      throw new Error('You can only edit your own posts');
    }

    const post = await ctx.db.patch(args.id, {
      isPublished: true,
    });

    return post;
  },
});

export const draft = mutation({
  args: {
    id: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const userId = identity.subject;

    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error('Post not found');
    }

    if (existingPost.userId !== userId) {
      throw new Error('You can only edit your own posts');
    }

    const post = await ctx.db.patch(args.id, {
      isPublished: false,
    });

    return post;
  },
});

export const searchPosts = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      // .withSearchIndex('by_title', (q) => q.search('title', args.query))
      .filter((q) => q.eq(q.field('isPublished'), true))
      .collect();

    return posts;
  },
});
