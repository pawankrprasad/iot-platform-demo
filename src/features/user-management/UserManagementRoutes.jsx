import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequirePermission from '../../guards/RequirePermission';

const UserManagementPage = lazy(() => import('./pages/UserManagementPage'));
const AddUser = lazy(() => import('./pages/AddUser'));
const AddRole = lazy(() => import('./pages/AddRole'));

/**
 * Owns all /users/* sub-routes.
 * Mounted once at path="/users/*" in the global AppRouter.
 *
 * Route tree:
 *   /user-management              → redirect → /user-management/users
 *   /user-management/users        → UserManagementPage  (Users tab)
 *   /user-management/roles        → UserManagementPage  (Roles tab)
 *   /user-management/users/add    → AddUser             (Admin only)
 *   /user-management/roles/add    → AddRole             (Admin only)
 */
export default function UserManagementRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="users" replace />} />

      {/* List pages — same component, tab derived from URL */}
      <Route path="users" element={<UserManagementPage />} />
      <Route path="roles" element={<UserManagementPage />} />

      {/* Form pages — Admin only */}
      <Route
        path="users/add"
        element={
          <RequirePermission roles={['Admin']} fallback="/user-management/users">
            <AddUser />
          </RequirePermission>
        }
      />

      <Route
        path="roles/add"
        element={
          <RequirePermission roles={['Admin']} fallback="/user-management/roles">
            <AddRole />
          </RequirePermission>
        }
      />
    </Routes>
  );
}

