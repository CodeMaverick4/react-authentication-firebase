import { Routes, Route, Redirect, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import { tokenContext } from './context/tokenContext';

function App() {
  const {accessToken} = useContext(tokenContext);
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile' element={accessToken ?  <UserProfile /> : <Navigate to="/" replace/>} /> 
        <Route path='*' element={<Navigate to="/" replace/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
