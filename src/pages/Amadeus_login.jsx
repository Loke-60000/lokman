import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

const AmadeusLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirects to the dashboard page
    } catch (error) {
      console.log(error);
      setError('Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, {
        displayName: username
      });

      // Save the user's display name to Firestore
      const userDocRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userDocRef, {
        displayName: username,
      });

      navigate('/dashboard'); // Redirects to the dashboard page
    } catch (error) {
      console.log(error);
      setError('Unable to create account');
    }
  };

  const handleSubmit = isRegistering ? handleRegister : handleLogin;

  const toggleForm = () => {
    setError('');
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {isRegistering && (
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        )}
        <br />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={toggleForm}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default AmadeusLogin;
