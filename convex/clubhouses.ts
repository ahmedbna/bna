import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const create = mutation({
  args: {
    clubSlug: v.string(),
    content: v.string(),
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const comment = await ctx.db.insert('clubhouses', {
      userId: userId,
      clubSlug: args.clubSlug,
      content: args.content,
      contentType: args.contentType,
    });

    return comment;
  },
});

export const reply = mutation({
  args: {
    clubSlug: v.string(),
    content: v.string(),
    contentType: v.string(),
    parentId: v.id('clubhouses'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const comment = await ctx.db.insert('clubhouses', {
      userId: userId,
      clubSlug: args.clubSlug,
      content: args.content,
      contentType: args.contentType,
      parentId: args.parentId,
    });

    return comment;
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id('clubhouses'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const existingComment = await ctx.db.get(args.commentId);

    if (!existingComment) {
      throw new Error('Not found');
    }

    if (existingComment.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await ctx.db.delete(args.commentId);
  },
});

// export const commentsCount = query({
//   args: {
//     clubSlug: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const comments = await ctx.db
//       .query('comments')
//       .withIndex('by_postId', (q) => q.eq('postId', args.postId))
//       .collect();

//     return comments;
//   },
// });

export const clubComments = query({
  args: {
    clubSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const comments = await ctx.db
      .query('clubhouses')
      .withIndex('by_clubSlug', (q) => q.eq('clubSlug', args.clubSlug))
      .collect();

    return await asyncMap(comments, async (comment) => ({
      ...comment,
      userInfo: await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', comment.userId))
        .first(),
    }));
  },
});

export const clearDayComment = internalMutation(async (ctx) => {
  const comments = await ctx.db
    .query('clubhouses')
    // .filter((q) => q.gte('creationTime', 342443223))
    .collect();

  // for (const message of await ctx.db.query('clubhouses').collect()) {
  //   await ctx.db.delete(message._id);
  // }
});
