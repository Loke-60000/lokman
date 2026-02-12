"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { auth, db } from "~/lib/firebase-config";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        if (userAuth.providerData[0].providerId === "google.com") {
          setUser({
            email: userAuth.email,
            displayName: userAuth.displayName,
            uid: userAuth.uid,
          });
          setLoading(false);
        } else {
          const userDocRef = doc(collection(db, "users"), userAuth.uid);

          const userUnsubscribe = onSnapshot(userDocRef, (doc) => {
            const userData = doc.data();
            setUser({
              email: userAuth.email,
              displayName: userData?.displayName,
              uid: userAuth.uid,
            });
            setLoading(false);
          });

          return () => {
            userUnsubscribe();
          };
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return [user, loading];
};

export default useAuth;
