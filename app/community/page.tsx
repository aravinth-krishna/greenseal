"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import PostCard from "@/components/PostCard/PostCard";
import { useRouter } from "next/navigation";

interface PostComment {
  id: number;
  content: string;
  user: { id: number; username: string };
  children: PostComment[];
  postId: number;
}

const Community = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
    user: { id: number; username: string };
    votes: { voteType: number }[];
    comments: PostComment[];
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/login");
      }
    };

    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchUser();
    fetchPosts();
  }, [router]);

  const handleNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleVote = async (postId: number, voteType: number) => {
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
      body: JSON.stringify({ postId, voteType }),
    });

    if (res.ok) {
      const updatedPosts = await fetch("/api/posts");
      const data: Post[] = await updatedPosts.json();
      setPosts(data);
    }
  };

  const handleDeletePost = async (postId: number) => {
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

  const handleNewComment = async (
    postId: number,
    content: string,
    parentId: number | null = null
  ) => {
    if (!user) {
      alert("You must be logged in to comment");
      return;
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ postId, content, parentId }),
    });

    if (res.ok) {
      const updatedPosts = await fetch("/api/posts");
      const data: Post[] = await updatedPosts.json();
      setPosts(data);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user) {
      alert("You must be logged in to delete a comment");
      return;
    }

    const res = await fetch("/api/comments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ commentId }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((post) => ({
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
        }))
      );
    }
  };

  return (
    <div className={styles.communityContainer}>
      <h1 className={styles.heading}>Community Posts</h1>
      <div className={styles.motivationalSection}>
        <h2>Welcome to our Community!</h2>
        <p>
          Connect, share, and grow with like-minded individuals.
          <br /> Make a Positive change for the People
        </p>
        <p>
          “Alone we can do so little; together we can do so much.” <br />– Helen
          Keller
        </p>
      </div>

      <h2>Let&apos;s share your thoughts</h2>
      <form onSubmit={handleNewPost} className={styles.newPostForm}>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
          onDeletePost={handleDeletePost}
        />
        <textarea
          placeholder="Post Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      <div className={styles.postsList}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              onVote={handleVote}
              onReply={handleNewComment}
              onDeleteComment={handleDeleteComment}
            />
          ))
        ) : (
          <p className={styles.noPosts}>No posts yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default Community;
