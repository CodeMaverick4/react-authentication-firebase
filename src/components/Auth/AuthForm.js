import { useState, useRef, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import classes from './AuthForm.module.css';
import { tokenContext } from '../../context/tokenContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, setAccessToken } = useContext(tokenContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setIsLoading(true);
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = userCredential.user.accessToken
        console.log(token);
        setAccessToken(token);
        localStorage.setItem('token',token);
        alert("Login successfull...");
        setIsLoading(false);
        navigate('/profile')
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
