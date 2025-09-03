import { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = emailRef.current.value;

    try {
      setIsLoading(true);
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user)
        alert("Login successfull...")
        setIsLoading(false);
        return
      }
      else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user)
        alert("SignUp successfull...")
        setIsLoading(false);
        return
      }
      
    } catch (err) {
      setIsLoading(false);
      console.log(err.message)
      alert(err.message)
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button type='submit' >{isLoading ? "Sending request..." : isLogin ? "Login" : "Create Account"}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
