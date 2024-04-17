import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const react = mutation({
  args: {
    clubhouseId: v.id('clubhouses'),
    reaction: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const existingReaction = await ctx.db
      .query('reactions')
      .withIndex('by_clubhouseId', (q) => q.eq('clubhouseId', args.clubhouseId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!existingReaction) {
      await ctx.db.insert('reactions', {
        userId: userId,
        reaction: args.reaction,
        clubhouseId: args.clubhouseId,
      });
    } else {
      await ctx.db.patch(existingReaction._id, { reaction: args.reaction });
      // await ctx.db.delete(existingReaction._id);
    }
  },
});

export const commentReactions = query({
  args: {
    clubhouseId: v.id('clubhouses'),
  },
  handler: async (ctx, args) => {
    const reactions = await ctx.db
      .query('reactions')
      .withIndex('by_clubhouseId', (q) => q.eq('clubhouseId', args.clubhouseId))
      .collect();

    return await asyncMap(reactions, async (reaction) => {
      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', reaction.userId))
        .first();

      return {
        ...reaction,
        userInfo,
      };
    });
  },
});
