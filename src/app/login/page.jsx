"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "~/styles/pages/blog.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "~/lib/firebase-config";
import useAuth from "~/hooks/useAuth";

const Login = ({ setUser }) => {
  const [user] = useAuth();
  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const userAuth = result.user;
      if (setUser) {
        setUser({
          email: userAuth.email,
          displayName: userAuth.displayName,
        });
      }
      router.push("/blog");
    });
  };

  useEffect(() => {
    if (user) {
      router.push("/blog");
    }
  }, [user, router]);

  if (user) return null;

  return (
    <div className="login_page">
      <h1>Sign In with Google</h1>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
};

export default function LoginPage() {
  return <Login />;
}
