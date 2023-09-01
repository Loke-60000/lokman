import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // If the user logs in via Google, use the displayName from the Google account
        if (userAuth.providerData[0].providerId === 'google.com') {
          setUser({
            email: userAuth.email,
            displayName: userAuth.displayName,
          });
          setLoading(false);
        } else {
          const userDocRef = doc(collection(db, 'users'), userAuth.uid);

          const userUnsubscribe = onSnapshot(userDocRef, (doc) => {
            const userData = doc.data();
            setUser({
              email: userAuth.email,
              displayName: userData?.displayName,
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
