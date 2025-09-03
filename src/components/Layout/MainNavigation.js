import { Link, useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { tokenContext } from '../../context/tokenContext';

const MainNavigation = () => {
  const { accessToken, setAccessToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('autoLogoutTimer');

    navigate("/")
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!accessToken && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {accessToken && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {accessToken && <li>
            <button onClick={handleLogout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
