// File: components/CommentSection/Comment.tsx
import { useState } from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment, user, onDelete, onReply }: CommentProps) => {
  const [replying, setReplying] = useState(false);

  return (
    <div className={styles.comment}>
      <p>{comment.content}</p>
      <p>By {comment.user ? comment.user.username : "Unknown User"}</p>
      {user?.id === comment.user?.id && (
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      )}
      <button onClick={() => setReplying(!replying)}>
        {replying ? "Cancel" : "Reply"}
      </button>
      {replying && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.currentTarget.replyContent.value;
            onReply(comment.postId, content, comment.id);
            e.currentTarget.reset();
            setReplying(false);
          }}
        >
          <textarea name="replyContent" placeholder="Add a reply" required />
          <button type="submit">Reply</button>
        </form>
      )}
      {comment.children &&
        comment.children.length > 0 &&
        comment.children.map((childComment) => (
          <Comment
            key={childComment.id}
            comment={childComment}
            user={user}
            onDelete={onDelete}
            onReply={onReply}
          />
        ))}
    </div>
  );
};

export default Comment;
