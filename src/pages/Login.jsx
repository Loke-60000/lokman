import React, { useEffect } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ user, setUser }) => {
  if (user) {
    return null;
  }

  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const userAuth = result.user;
      setUser({
        email: userAuth.email,
        displayName: userAuth.displayName,
      });
      navigate('/lokman/blog');
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/blog');
    }
  }, [user, navigate]);

  return (
    <div className='login_page'>
      <h1>Sign In with Google</h1>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
