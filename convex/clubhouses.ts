import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { internal } from './_generated/api';
import { asyncMap } from 'convex-helpers';

export const destruct = internalMutation({
  args: {
    messageId: v.id('clubhouses'),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) return;
    if (message.contentType !== 'text' && message.storageId) {
      await ctx.storage.delete(message.storageId);
      await ctx.db.delete(args.messageId);
    } else {
      await ctx.db.delete(args.messageId);
    }
  },
});

export const create = mutation({
  args: {
    clubSlug: v.string(),
    content: v.string(),
    contentType: v.string(),
    storageId: v.optional(v.id('_storage')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    if (args.storageId) {
      const contentUrl = await ctx.storage.getUrl(args.storageId);

      const messageId = await ctx.db.insert('clubhouses', {
        userId: userId,
        clubSlug: args.clubSlug,
        content: contentUrl || '',
        contentType: args.contentType,
        storageId: args.storageId,
      });

      await ctx.scheduler.runAfter(86400000, internal.clubhouses.destruct, {
        messageId,
      });

      return messageId;
    } else {
      const messageId = await ctx.db.insert('clubhouses', {
        userId: userId,
        clubSlug: args.clubSlug,
        content: args.content,
        contentType: args.contentType,
      });

      await ctx.scheduler.runAfter(86400000, internal.clubhouses.destruct, {
        messageId,
      });

      return messageId;
    }
  },
});

export const reply = mutation({
  args: {
    clubSlug: v.string(),
    content: v.string(),
    contentType: v.string(),
    storageId: v.optional(v.id('_storage')),
    parentId: v.id('clubhouses'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    if (args.storageId) {
      const contentUrl = await ctx.storage.getUrl(args.storageId);

      const messageId = await ctx.db.insert('clubhouses', {
        userId: userId,
        clubSlug: args.clubSlug,
        content: contentUrl || '',
        contentType: args.contentType,
        storageId: args.storageId,
        parentId: args.parentId,
      });

      await ctx.scheduler.runAfter(86400000, internal.clubhouses.destruct, {
        messageId,
      });

      return messageId;
    } else {
      const messageId = await ctx.db.insert('clubhouses', {
        userId: userId,
        clubSlug: args.clubSlug,
        content: args.content,
        contentType: args.contentType,
        parentId: args.parentId,
      });

      await ctx.scheduler.runAfter(86400000, internal.clubhouses.destruct, {
        messageId,
      });

      return messageId;
    }
  },
});

export const clubMessages = query({
  args: {
    clubSlug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const messages = await ctx.db
      .query('clubhouses')
      .withIndex('by_clubSlug', (q) => q.eq('clubSlug', args.clubSlug))
      .collect();

    return await asyncMap(messages, async (message) => ({
      ...message,
      userInfo: await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', message.userId))
        .first(),
    }));
  },
});

// export const messagesCount = query({
//   args: {
//     clubSlug: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const messages = await ctx.db
//       .query('messages')
//       .withIndex('by_postId', (q) => q.eq('postId', args.postId))
//       .collect();

//     return messages;
//   },
// });
