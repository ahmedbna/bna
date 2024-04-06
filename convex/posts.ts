import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';
import randomColor from 'randomcolor';

export const get = query({
  handler: async (ctx) => {
    const posts = await ctx.db
      .query('posts')
      .withIndex('by_publised', (q) => q.eq('isPublished', true))
      .order('desc')
      .collect();

    return await asyncMap(posts, async (post) => {
      const coverUrl = post.coverImage
        ? await ctx.storage.getUrl(post.coverImage)
        : undefined;

      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return {
        ...post,
        imageUrl:
          coverUrl === undefined || coverUrl === null ? undefined : coverUrl,
        userInfo,
      };
    });
  },
});

export const getMyPosts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const posts = await ctx.db
      .query('posts')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .order('desc')
      .collect();

    return await asyncMap(posts, async (post) => {
      const coverUrl = post.coverImage
        ? await ctx.storage.getUrl(post.coverImage)
        : undefined;

      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return {
        ...post,
        imageUrl:
          coverUrl === undefined || coverUrl === null ? undefined : coverUrl,
        userInfo,
      };
    });
  },
});

export const getPostById = query({
  args: { postId: v.id('posts') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error('Not found');
    }

    if (post.isPublished) {
      const coverUrl = post.coverImage
        ? await ctx.storage.getUrl(post.coverImage)
        : undefined;

      const imageUrl =
        coverUrl === null || coverUrl === undefined ? undefined : coverUrl;

      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return { ...post, imageUrl, userInfo };
    } else {
      return null;
    }
  },
});

export const getMyDraftById = query({
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
      const coverUrl = post.coverImage
        ? await ctx.storage.getUrl(post.coverImage)
        : undefined;

      const imageUrl =
        coverUrl === null || coverUrl === undefined ? undefined : coverUrl;

      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return { ...post, imageUrl, userInfo };
    } else {
      return null;
    }
  },
});

export const getMyPublishById = query({
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

    if (post.isPublished) {
      const coverUrl = post.coverImage
        ? await ctx.storage.getUrl(post.coverImage)
        : undefined;

      const imageUrl =
        coverUrl === null || coverUrl === undefined ? undefined : coverUrl;

      return { ...post, imageUrl };
    } else {
      return null;
    }
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const userId = identity.subject;

    // Generate random colors
    const color1 = randomColor();
    const color2 = randomColor();

    const post = await ctx.db.insert('posts', {
      userId,
      title: 'Click to Make it Your Title...',
      isPublished: false,
      color1,
      color2,
    });

    return post;
  },
});

export const deletePost = mutation({
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
      throw new Error('Not found');
    }

    if (existingPost.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (existingPost.isPublished) {
      throw new Error('Post cannot be deleted as it is published!');
    }

    await ctx.db.delete(args.id);

    return { message: 'Deleted!' };
  },
});

export const searchPosts = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      .withSearchIndex('search_title', (q) => q.search('title', args.query))
      .filter((q) => q.eq(q.field('isPublished'), false))
      .take(20);

    return posts;
  },
});

export const update = mutation({
  args: {
    id: v.id('posts'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    coverImage: v.optional(v.id('_storage')),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated');
    }
    const userId = identity.subject;

    const existingPost = await ctx.db.get(args.id);

    if (!existingPost) {
      throw new Error('Not found');
    }

    if (existingPost.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedPost = {
      ...existingPost,
      title: args.title ?? existingPost.title,
      content: args.content ?? existingPost.content,
      coverImage: args.coverImage ?? existingPost.coverImage,
      imageUrl: args.imageUrl ?? existingPost.imageUrl,
      isPublished: args.isPublished ?? existingPost.isPublished,
    };

    await ctx.db.patch(args.id, updatedPost);

    return args.id;
  },
});
