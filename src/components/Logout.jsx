import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Logout = ({ isAuth, setIsAuth }) => {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        navigate('/lokman/blog');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
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
