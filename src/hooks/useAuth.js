import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        localStorage.setItem('email', user.email);
      } else {
        setEmail('');
        localStorage.removeItem('email');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [email, loading];
};

export default useAuth;
