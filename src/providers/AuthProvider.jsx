import React, { createContext, useEffect, useState } from 'react'
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { app } from '../firebase/firebase.config';


export const AuthContext = createContext(null);
const auth = getAuth(app);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const  [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const createUser = (email, password) =>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
      setLoading(true);
      return signInWithEmailAndPassword(email, password);
    }


    const googleSignIn = () =>{
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
  }

  

  const facebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error('Facebook sign-in failed:', error);
      throw error;
    }
  };

  // const facebookSignIn = () => {
  //   setLoading(true);
  //   return signInWithPopup(auth, facebookProvider);
  
  // };

    const logOut = () =>{
      setLoading(true);
      return signOut(auth);
    }

    useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser);
      console.log('current user', currentUser);
      setLoading(false);
     });
     return () =>{
      return unsubscribe();
     }
    }, [])
    const userEmail = user ? user.email : null;

    const authInfo = {
      auth,
       user,
       setUser,
       loading,
       createUser,
       signIn,
       googleSignIn,
       facebookSignIn,
       userEmail,
       logOut
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
