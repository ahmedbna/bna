import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const add = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const userId = identity.subject;

    const waiting = await ctx.db.insert('waitings', {
      userId,
      email: args.email,
    });

    return waiting;
  },
});
