import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called storeUser without authentication present');
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // If we've seen this identity before but the data has changed, patch the value.
      if (
        user.name !== identity.name ||
        user.email !== identity.email ||
        user.phoneNumber !== identity.phoneNumber ||
        user.pictureUrl !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          email: identity.email,
          phoneNumber: identity.phoneNumber,
          pictureUrl: identity.pictureUrl,
        });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert('users', {
      userId: identity.subject!,
      name: identity.name!,
      email: identity.email!,
      phoneNumber: identity.phoneNumber!,
      pictureUrl: identity.pictureUrl!,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const update = mutation({
  args: {
    heading: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated!');
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', identity.subject))
      .unique();

    if (user !== null) {
      await ctx.db.patch(user._id, {
        heading: args.heading,
        bio: args.bio,
      });

      return user._id;
    }
  },
});

export const get = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated!');
    }

    const userId = args.userId ? args.userId : identity.subject;

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .unique();

    return user;
  },
});
