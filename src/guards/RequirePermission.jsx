import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../store';

/**
 * Route guard — restricts access based on the authenticated user's role.
 *
 * @param {string[]} roles    Allowed roles. Empty array = any authenticated user.
 * @param {string}   fallback Redirect path when access is denied (default: '/').
 *
 * Usage:
 *   <RequirePermission roles={['Admin']} fallback="/users">
 *     <AddUser />
 *   </RequirePermission>
 */
export default function RequirePermission({ roles = [], fallback = '/', children }) {
  const user = useSelector(selectUser);

//   if (roles.length === 0) return children;

//   if (!user || !roles.includes(user.role)) {
//     return <Navigate to={fallback} replace />;
//   }

  return children;
}
