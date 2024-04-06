import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const save = mutation({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

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

// export const userSaves = query({
//   args: {
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error('Not authenticated');
//     }
//     const userId = identity.subject;

//     const saves = await ctx.db
//       .query('saves')
//       .withIndex('by_userId', (q) => q.eq('userId', userId))
//       .collect();

//     return saves;
//   },
// });
