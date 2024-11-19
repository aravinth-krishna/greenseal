"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const Community = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
    user: {
      username: string;
    };
    votes: {
      voteType: number;
    }[];
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  interface NewPost {
    title: string;
    content: string;
  }

  const handleNewPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        title: newPost.title,
        content: newPost.content,
      } as NewPost),
    });

    if (res.ok) {
      const newPostData: Post = await res.json();
      setPosts((prev) => [newPostData, ...prev]);
      setNewPost({ title: "", content: "" });
    }
  };

  interface Vote {
    userId: number;
    postId: number;
    voteType: number;
  }

  const handleVote = async (
    postId: number,
    voteType: number
  ): Promise<void> => {
    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1, // Replace with the logged-in user's ID
        postId,
        voteType,
      } as Vote),
    });

    if (res.ok) {
      const updatedPosts = await fetch("/api/posts");
      const data: Post[] = await updatedPosts.json();
      setPosts(data);
    }
  };

  return (
    <div className={styles.communityContainer}>
      <h1>Community</h1>

      <form onSubmit={handleNewPost} className={styles.newPostForm}>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <button type="submit">Post</button>
      </form>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to contribute!</p>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>By {post.user?.username || "Unknown User"}</p>

              <div className={styles.voteButtons}>
                <button onClick={() => handleVote(post.id, 1)}>
                  <BiUpvote />
                </button>
                <button onClick={() => handleVote(post.id, -1)}>
                  <BiDownvote />
                </button>
              </div>

              <p>
                Votes:{" "}
                {Array.isArray(post.votes)
                  ? post.votes.reduce((total, vote) => total + vote.voteType, 0)
                  : 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
