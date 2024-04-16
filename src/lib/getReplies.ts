import { Doc } from '@/convex/_generated/dataModel';

export const getReplies = (comments: any) => {
  return comments.reduce((acc, comment) => {
    if (!comment.parentId) {
      acc.push({ ...comment, replies: [] });
    } else {
      const parentComment = acc.find((c) => c._id === comment.parentId);
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push(comment);
      }
    }
    return acc;
  }, []);
};
