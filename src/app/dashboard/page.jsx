"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "~/lib/firebase-config";
import { signOut } from "firebase/auth";
import useAuth from "~/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/lib/firebase-config";

const Dashboard = () => {
  const [user, loading] = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchUsername = async () => {
    try {
      if (!user?.uid) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUsername(userDoc.data().displayName);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsername();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>
        Welcome, {username || user.displayName} ({user.email})!
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default function DashboardPage() {
  return <Dashboard />;
}
