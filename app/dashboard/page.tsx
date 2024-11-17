"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setUser({ name: "John Doe" });
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <div>Welcome to your Dashboard, {user?.name}</div>;
};

export default Dashboard;
