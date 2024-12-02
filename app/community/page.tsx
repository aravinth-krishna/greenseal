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
      id: number;
      username: string;
    };
    votes: {
      voteType: number;
    }[];
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      }
    };

    fetchPosts();
    fetchUser();
  }, []);

  const handleNewPost = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        title: newPost.title,
        content: newPost.content,
      }),
    });

    if (res.ok) {
      const newPostData: Post = await res.json();
      setPosts((prev) => [newPostData, ...prev]);
      setNewPost({ title: "", content: "" });
    }
  };

  const handleVote = async (
    postId: number,
    voteType: number
  ): Promise<void> => {
    if (!user) {
      alert("You must be logged in to vote");
      return;
    }

    const res = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        postId,
        voteType,
      }),
    });

    if (res.ok) {
      const updatedPosts = await fetch("/api/posts");
      const data: Post[] = await updatedPosts.json();
      setPosts(data);
    }
  };

  const handleDelete = async (postId: number): Promise<void> => {
    if (!user) {
      alert("You must be logged in to delete a post");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ postId }),
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
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
              {user?.id === post.user.id && (
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
