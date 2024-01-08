import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "../firebase/firebase";

const auth = getAuth(app);

export const AuthContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);
  const [render, setRender] = useState(false);

  // 1. createUser
  const createUser = (email, password) => {
    setLoding(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // 2. ubdate name
  const updateName = (profile) => {
    setLoding(true);
    return updateProfile(auth.currentUser, profile);
  };
  // 3. verify email
  const verifyEmail = () => {
    setLoding(true);
    return sendEmailVerification(auth.currentUser);
  };

  // 4. googleSignin
  const googleSignin = (gProvider) => {
    setLoding(true);
    return signInWithPopup(auth, gProvider);
  };

  // 5. logOut
  const logOut = () => {
    setLoding(true);
    localStorage.removeItem("admin_token");
    return signOut(auth);
  };
  // 6. login
  const login = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // 7. forget password
  const forgetPassword = (email) => {
    setLoding(true);
    return sendPasswordResetEmail(auth, email);
  };
  // 7. singIn with github
  const githubSingIn = (gitProvider) => {
    setLoding(true);
    return signInWithPopup(auth, gitProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetch(`https://rsapp.unbolt.co/user?email=${currentUser.email}`)
          .then((res) => res.json())
          .then((data) => {
            data.uid = currentUser.uid;
            setUser(data);
            setLoding(false);
          });
      } else {
        setUser(null);
        setLoding(false);
      }
    });
    return () => unSubscribe();
  }, [render]);

  const authInfo = {
    user,
    loding,
    createUser,
    githubSingIn,
    updateName,
    verifyEmail,
    login,
    googleSignin,
    logOut,
    forgetPassword,
    setLoding,
    setUser,
    setRender,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Context;
