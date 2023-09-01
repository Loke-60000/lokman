import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Dashboard = () => {
  const [user, loading] = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirects to the login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUsername(userDoc.data().displayName);
      }
    } catch (error) {
      console.error('Error fetching username:', error);
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
    navigate('/'); // Redirects to the login page if not logged in
    return null;
  }

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <p>
        Welcome, {username} ({user.email})!
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
