"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  if (loading) return <p>Loading...</p>;

  return <div>Welcome to your Dashboard, {user?.username}</div>;
};

export default Dashboard;
