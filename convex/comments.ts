import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';

export const comment = mutation({
  args: {
    postId: v.id('posts'),
    content: v.string(),
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const comment = await ctx.db.insert('comments', {
      userId: userId,
      postId: args.postId,
      content: args.content,
      contentType: args.contentType,
    });

    return comment;
  },
});

export const reply = mutation({
  args: {
    postId: v.id('posts'),
    content: v.string(),
    contentType: v.string(),
    parentId: v.id('comments'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const comment = await ctx.db.insert('comments', {
      userId: userId,
      postId: args.postId,
      content: args.content,
      contentType: args.contentType,
      parentId: args.parentId,
    });

    return comment;
  },
});

export const deletComment = mutation({
  args: {
    commentId: v.id('comments'),
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

export const commentsCount = query({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query('comments')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
      .collect();

    return comments;
  },
});

export const postComments = query({
  args: {
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const comments = await ctx.db
      .query('comments')
      .withIndex('by_postId', (q) => q.eq('postId', args.postId))
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
