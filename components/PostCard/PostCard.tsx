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
    votes: {
      id: number;
      voteType: number;
      createdAt: string;
      userId: number;
      postId: number;
    }[];
    comments: {
      id: number;
      content: string;
      user: { id: number; username: string };
      children: any[];
      postId: number;
    }[];
  };
  user: { id: number; username: string } | null;
  onVote: (postId: number, voteType: number) => void;
  onReply: (postId: number, content: string, parentId?: number | null) => void;
  onDeletePost: (postId: number) => void;
  onDeleteComment: (commentId: number) => void;
}

const PostCard = ({
  post,
  user,
  onVote,
  onReply,
  onDeletePost,
  onDeleteComment,
}: PostCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleComments = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.postCard}>
      <h2>{post.title}</h2>
      <hr />
      <p>{post.content}</p>
      <br />
      <hr />
      <p>by {post.user?.username || "Unknown User"}</p>
      <div className={styles.voteButtons}>
        <button onClick={() => onVote(post.id, 1)} className={styles.upvote}>
          <BiUpvote />
        </button>
        <button onClick={() => onVote(post.id, -1)} className={styles.downvote}>
          <BiDownvote />
        </button>
      </div>
      <p>
        Votes:{" "}
        {Array.isArray(post.votes)
          ? post.votes.reduce((total, vote) => total + vote.voteType, 0)
          : 0}
      </p>
      <button onClick={toggleComments} className={styles.toggleComments}>
        {expanded ? "Hide Comments" : "See Comments"}
      </button>
      {expanded && (
        <CommentSection
          postId={post.id}
          comments={post.comments}
          user={user}
          onReply={onReply}
          onDelete={onDeleteComment}
        />
      )}
      {user && post.user && user.id === post.user.id && (
        <button
          onClick={() => onDeletePost(post.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default PostCard;
