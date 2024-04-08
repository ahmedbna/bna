import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const save = mutation({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated!');
    }
    const userId = identity.subject;

    const post = await ctx.db.get(args.postId);

    if (!post) {
      throw new Error('Post Not Found!');
    }

    if (!post.isPublished) {
      throw new Error('Cannot save darft post!');
    }

    const existingSave = await ctx.db
      .query('saves')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!existingSave) {
      await ctx.db.insert('saves', { userId: userId, postId: args.postId });
    } else {
      await ctx.db.delete(existingSave._id);
    }
  },
});

export const postSaves = query({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const saves = await ctx.db
      .query('saves')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .collect();

    return saves;
  },
});

export const saves = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const saves = await ctx.db
      .query('saves')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .collect();

    if (!saves) {
      throw new Error('Not found');
    }

    return await asyncMap(saves, async (save) => {
      const post = await ctx.db.get(save.postId);

      if (!post) {
        throw new Error('Post Not found');
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
    });
  },
});
