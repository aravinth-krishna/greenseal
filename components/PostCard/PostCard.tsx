// File: components/PostCard/PostCard.tsx
import { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import CommentSection from "@/components/CommentSection/CommentSection";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    user: { id: number; username: string };
    votes: number;
    comments: {
      id: number;
      content: string;
      user: { id: number; username: string };
    }[];
  };
  user: { id: number; username: string } | null;
  onVote: (postId: number, vote: number) => void;
  onReply: (postId: number, content: string, parentId: number | null) => void;
}

const PostCard = ({ post, user, onVote, onReply }: PostCardProps) => {
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
      <p>Votes: {post.votes}</p>
      <button onClick={toggleComments}>
        {expanded ? "Hide Comments" : "See Comments"}
      </button>
      {expanded && (
        <CommentSection
          postId={post.id}
          comments={post.comments}
          user={user}
          onReply={onReply}
        />
      )}
    </div>
  );
};

export default PostCard;
