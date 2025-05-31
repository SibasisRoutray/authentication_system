import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PublicLayout from './layout/PublicLayout';
import AuthLayout from './layout/AuthLayout';
import RequireAuth from './component/auth/RequireAuth';

import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import LandingPage from './pages/LandingPage';

function App() {

  
   const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);


  useEffect(() => {
  fetch('http://localhost:8080/api/auth/me', { credentials: 'include' })
    .then(res => {
      console.log('Auth check response:', res.status);
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    })
    .then(data => {
      console.log('Auth user data:', data);
      if (data.user) {
        dispatch(login(data.user));
      } else {
        dispatch(logout());
      }
    })
    .catch((err) => {
      console.log('Auth check error:', err.message);
      dispatch(logout());
    })
    .finally(() => {
      setIsAuthChecked(true);
      console.log('Auth check done, isAuthChecked set to true');
    });
}, [dispatch]);



  // Wait until auth check completes before rendering routes
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Auth Routes (no navbar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Route>

        {/* Protected Routes (with navbar + landing) */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <PublicLayout />
            </RequireAuth>
          }
        >
          <Route index element={<LandingPage />} />
        </Route>

        {/* Redirect unknown routes to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
