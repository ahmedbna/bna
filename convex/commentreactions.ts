import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const react = mutation({
  args: {
    commentId: v.id('comments'),
    reaction: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const existingReaction = await ctx.db
      .query('commentreactions')
      .withIndex('by_commentId', (q) => q.eq('commentId', args.commentId))
      .filter((q) => q.eq(q.field('userId'), userId))
      .first();

    if (!existingReaction) {
      await ctx.db.insert('commentreactions', {
        userId: userId,
        reaction: args.reaction,
        commentId: args.commentId,
      });
    } else {
      await ctx.db.patch(existingReaction._id, { reaction: args.reaction });
      // await ctx.db.delete(existingReaction._id);
    }
  },
});

export const commentReactions = query({
  args: {
    commentId: v.id('comments'),
  },
  handler: async (ctx, args) => {
    const reactions = await ctx.db
      .query('commentreactions')
      .withIndex('by_commentId', (q) => q.eq('commentId', args.commentId))
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
