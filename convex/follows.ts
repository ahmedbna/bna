import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const follow = mutation({
  args: {
    followerId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated!');
    }
    const userId = identity.subject;

    if (userId === args.followerId) {
      throw new Error('Cannot follow yourself!');
    }

    const existingFollow = await ctx.db
      .query('follows')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter(
        (q) =>
          q.eq(q.field('userId'), userId) &&
          q.eq(q.field('followerId'), args.followerId)
      )
      .first();

    if (!existingFollow) {
      await ctx.db.insert('follows', {
        userId: userId,
        followerId: args.followerId,
      });
    } else {
      await ctx.db.delete(existingFollow._id);
    }
  },
});
