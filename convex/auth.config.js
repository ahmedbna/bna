export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CONVEX_CLERK_ISSUER,
      applicationID: 'convex',
    },
  ],
};
