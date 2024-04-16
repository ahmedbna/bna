import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const members = query({
  args: {
    clubSlug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('clubhouseguests')
      .withIndex('by_clubSlug', (q) => q.eq('clubSlug', args.clubSlug))
      .collect();
  },
});

export const join = mutation({
  args: {
    clubId: v.id('clubs'),
    clubSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated!');
    }
    const userId = identity.subject;

    const existingMember = await ctx.db
      .query('clubhouseguests')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .filter(
        (q) =>
          q.eq(q.field('userId'), userId) &&
          q.eq(q.field('clubSlug'), args.clubSlug)
      )
      .first();

    if (existingMember) return;

    await ctx.db.insert('clubhouseguests', {
      userId: userId,
      clubId: args.clubId,
      clubSlug: args.clubSlug,
    });
  },
});
