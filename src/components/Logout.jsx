"use client";

import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/firebase-config";
import { useRouter } from "next/navigation";

const Logout = ({ isAuth, setIsAuth }) => {
  const router = useRouter();

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        if (setIsAuth) setIsAuth(false);
        router.push("/blog");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <button onClick={signUserOut}>Log Out</button>
    </>
  );
};

export default Logout;
