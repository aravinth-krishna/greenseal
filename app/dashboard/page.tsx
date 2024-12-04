// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaUsers, FaNewspaper, FaSignOutAlt } from "react-icons/fa";
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
        router.push("/login");
      }
    } catch {
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
      <header className={styles.header}>
        <h1>Welcome, {user?.username}</h1>
        <p>Your personalized dashboard for quick navigation and insights.</p>
      </header>

      <section className={styles.links}>
        <Link href="/search" className={styles.card}>
          <FaSearch className={styles.icon} />
          <h2>Explore</h2>
          <p>Discover new companies and trends in ESG.</p>
        </Link>

        <Link href="/community" className={styles.card}>
          <FaUsers className={styles.icon} />
          <h2>Community</h2>
          <p>Connect and share insights with like-minded professionals.</p>
        </Link>

        <Link href="/news" className={styles.card}>
          <FaNewspaper className={styles.icon} />
          <h2>News</h2>
          <p>Stay updated with the latest environmental and social news.</p>
        </Link>
      </section>

      <button onClick={handleLogout} className={styles.logoutButton}>
        <FaSignOutAlt size={24} className={styles.icon} />
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
