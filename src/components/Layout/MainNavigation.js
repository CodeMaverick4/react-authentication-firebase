import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { tokenContext } from '../../context/tokenContext';

const MainNavigation = () => {
  const {accessToken,setAccessToken} = useContext(tokenContext);
  const handleLogout = ()=>{
    setAccessToken(null);
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
