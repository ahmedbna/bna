import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const like = mutation({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const existingLike = await ctx.db
      .query('likes')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!existingLike) {
      await ctx.db.insert('likes', { userId: userId, postId: args.postId });
    } else {
      await ctx.db.delete(existingLike._id);
    }
  },
});

export const postlikes = query({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query('likes')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .collect();

    return likes;

    // return await asyncMap(likes, async (like) => {
    //   const usersLikes = await ctx.db
    //     .query('users')
    //     .withIndex('by_userId', (q) => q.eq('userId', like.userId));

    //   return usersLikes;
    // });
  },
});
