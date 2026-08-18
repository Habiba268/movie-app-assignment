import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  type User
} from 'firebase/auth';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
      {user ? (
        <div>
          <h3>Welcome, {user.email}!</h3>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign In / Sign Up</h2>
          <input 
            type="email" 
            placeholder="Email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
          />
          <input 
            type="password" 
            placeholder="Password..." 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
          />
          <button onClick={handleSignIn} style={{ marginRight: '10px' }}>Sign In</button>
          <button onClick={handleSignUp} style={{ marginRight: '10px' }}>Sign Up</button>
          <button onClick={handleGoogleSignIn} style={{ marginTop: '10px', display: 'block' }}>
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};