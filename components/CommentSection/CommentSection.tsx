// File: components/CommentSection/CommentSection.tsx
import Comment from "@/components/Comment/Comment";
import styles from "./CommentSection.module.css";

interface PostComment {
  id: number;
  content: string;
  user: { id: number; username: string } | null;
  postId: number;
  parentId: number | null;
  children?: PostComment[];
}

interface CommentSectionProps {
  postId: number;
  comments: PostComment[];
  user: { id: number; username: string } | null;
  onDelete: (commentId: number) => void;
  onReply: (postId: number, content: string, parentId: number | null) => void;
}

const CommentSection = ({
  postId,
  comments = [],
  user,
  onDelete,
  onReply,
}: CommentSectionProps) => {
  return (
    <div className={styles.commentsSection}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = e.currentTarget.commentContent.value;
          onReply(postId, content, null);
          e.currentTarget.reset();
        }}
      >
        <textarea name="commentContent" placeholder="Add a comment" required />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
