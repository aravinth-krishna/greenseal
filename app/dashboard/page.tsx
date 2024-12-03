"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      fetchUserData(token);
    }
  }, [router]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user data: ", response.statusText);
        router.push("/login");
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.dashboard}>
      <h1>Welcome to your Dashboard, {user?.username}</h1>
      <div className={styles.links}>
        <Link href="/search" className={styles.link}>
          Explore
        </Link>
        <Link href="/community" className={styles.link}>
          Community
        </Link>
        <Link href="/news" className={styles.link}>
          News
        </Link>
        <Link href="/profile" className={styles.link}>
          Profile
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
