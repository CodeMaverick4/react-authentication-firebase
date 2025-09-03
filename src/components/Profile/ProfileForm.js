import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../context/tokenContext';

const ProfileForm = () => {
  const {setAccessToken} = useContext(tokenContext)
  const navigate = useNavigate();
  const newPasswordRef = useRef(null);

  const handleChangePassword = async (e) => {
    e.preventDefault()
    const newPass = newPasswordRef.current.value;
    const user = auth.currentUser;
    try {
      // Re-authenticate with the current email and password
      const oldPassword = prompt("Enter your current password to confirm:");
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      await reauthenticateWithCredential(user, credential);

      // Now update password
      await updatePassword(user, newPass);
      alert("Password updated successfully!");
      setAccessToken(null)
    } catch (error) {
      alert(error.message);
      console.error("Error updating password:", error.message);
    }
  }
  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
