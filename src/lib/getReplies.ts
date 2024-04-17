export const getReplies = (comments: any) => {
  return comments.reduce((acc: any, comment: any) => {
    if (!comment.parentId) {
      acc.push({ ...comment, replies: [] });
    } else {
      const parentComment = acc.find((c: any) => c._id === comment.parentId);
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];
        parentComment.replies.push(comment);
      }
    }
    return acc;
  }, []);
};
