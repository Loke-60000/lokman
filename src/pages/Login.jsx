import React, { useEffect } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ isAuth, setIsAuth }) => {
  if (isAuth) {
    return null;
  }

  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate('/lokman/blog');
    });
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/blog');
    }
  }, [isAuth, navigate]);

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
