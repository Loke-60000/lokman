import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedIsAuth = localStorage.getItem('isAuth');
    if (storedIsAuth) {
      setIsAuth(JSON.parse(storedIsAuth));
    }
    setLoading(false);
  }, []);

  return [isAuth, setIsAuth, loading];
};

export default useAuth;
