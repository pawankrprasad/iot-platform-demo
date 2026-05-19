import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsBootstrapped } from '../store';
import { AppLoader } from '@components';

/** Blocks unauthenticated users — redirects to /account/login */
export function ProtectedRoute({ children }) {
  const bootstrapped = useSelector(selectIsBootstrapped);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!bootstrapped) return <AppLoader />;
  return isAuthenticated ? children : <Navigate to="/account/login" replace />;
}

/** Blocks already-authenticated users from public pages (login, forgot-password) */
export function PublicRoute({ children }) {
  const bootstrapped = useSelector(selectIsBootstrapped);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!bootstrapped) return <AppLoader />;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
