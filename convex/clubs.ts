import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { asyncMap } from 'convex-helpers';
import { getAll } from 'convex-helpers/server/relationships';

export const get = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const club = await ctx.db
      .query('clubs')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();

    if (!club) return;

    const posts = await asyncMap(club.posts, async (postId) => {
      const post = await ctx.db.get(postId);

      if (!post) return;
      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return {
        ...post,
        userInfo,
      };
    });

    const publishedPosts = posts.filter((post) => post?.isPublished);

    return {
      ...club,
      publishedPosts,
    };
  },
});

export const getPostsByClub = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const club = await ctx.db
      .query('clubs')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();

    if (!club?.posts) return [];

    const posts = club?.posts ? await getAll(ctx.db, club.posts) : [];

    if (!posts) return [];

    return await asyncMap(posts, async (post) => {
      if (!post) return;

      const userInfo = await ctx.db
        .query('users')
        .withIndex('by_userId', (q) => q.eq('userId', post.userId))
        .first();

      return {
        ...post,
        userInfo,
      };
    });
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    postId: v.id('posts'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('You must be logged in to create a post');
    }

    const existingClub = await ctx.db
      .query('clubs')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .filter((q) => q.eq(q.field('slug'), args.slug))
      .first();

    const post = await ctx.db.get(args.postId);

    if (existingClub) {
      const existingPost = existingClub.posts.find(
        (postId) => postId === args.postId
      );

      if (existingPost) return;

      const club = await ctx.db.patch(existingClub._id, {
        posts: existingClub.posts
          ? [...existingClub.posts, args.postId]
          : [args.postId],
      });

      if (post) {
        const newPost = await ctx.db.patch(args.postId, {
          clubs: post.clubs
            ? [...post?.clubs, existingClub._id]
            : [existingClub._id],
        });
      }

      return club;
    } else {
      const newClub = await ctx.db.insert('clubs', {
        name: args.name,
        slug: args.slug,
        posts: [args.postId],
      });

      if (post) {
        const newPost = await ctx.db.patch(args.postId, {
          clubs: post.clubs ? [...post?.clubs, newClub] : [newClub],
        });
      }

      return newClub;
    }
  },
});
