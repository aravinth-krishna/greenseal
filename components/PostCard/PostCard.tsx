// File: components/PostCard/PostCard.tsx
import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import CommentSection from "@/components/CommentSection/CommentSection";
import styles from "./PostCard.module.css";

const PostCard = ({
  post,
  user,
  onVote,
  onDeletePost,
  onDeleteComment,
  onReply,
}: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleComments = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.postCard}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By {post.user?.username || "Unknown User"}</p>
      <div className={styles.voteButtons}>
        <button onClick={() => onVote(post.id, 1)}>
          <BiUpvote />
        </button>
        <button onClick={() => onVote(post.id, -1)}>
          <BiDownvote />
        </button>
      </div>
      <p>
        Votes:{" "}
        {Array.isArray(post.votes)
          ? post.votes.reduce((total, vote) => total + vote.voteType, 0)
          : 0}
      </p>
      {user?.id === post.user.id && (
        <button onClick={() => onDeletePost(post.id)}>Delete</button>
      )}
      <button onClick={toggleComments}>
        {expanded ? "Hide Comments" : "See Comments"}
      </button>
      {expanded && (
        <CommentSection
          postId={post.id}
          comments={post.comments}
          user={user}
          onDelete={onDeleteComment}
          onReply={onReply}
        />
      )}
    </div>
  );
};

export default PostCard;
