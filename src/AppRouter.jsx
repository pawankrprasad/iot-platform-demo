import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@features/account/pages/Login';
import ForgotPassword from '@features/account/pages/ForgotPassword';
import AccountLayout from './layout/AccountLayout';
import Shell from './layout/Shell';
import { AuthBootstrap } from './AuthBootstrap';
import { ProtectedRoute, PublicRoute } from './router/guards';

export default function AppRouter() {
  return (
    <Router>
      <AuthBootstrap />
      <Routes>
        {/* Public account pages (login, forgot-password) */}
        <Route
          element={
            <PublicRoute>
              <AccountLayout />
            </PublicRoute>
          }
        >
          <Route path="/account/login"           element={<Login />} />
          <Route path="/account/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* All protected app pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

