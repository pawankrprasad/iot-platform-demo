import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import AccountLayout from './layout/AccountLayout';
import Shell from './layout/Shell';
import { AuthBootstrap } from './AuthBootstrap';
import { ProtectedRoute, PublicRoute } from './router/guards';
import { createNavPage } from './router/createNavPage';

const router = createBrowserRouter([
  // ── Public: account layout ─────────────────────────────────────────────
  {
    path: '/account/*',
    element: (
      <PublicRoute>
        <AccountLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: 'login',
        lazy: async () => {
          const { default: Login } = await import('@features/account/pages/Login');
          return { Component: Login };
        },
      },
      {
        path: 'forgot-password',
        lazy: async () => {
          const { default: ForgotPassword } = await import('@features/account/pages/ForgotPassword');
          return { Component: ForgotPassword };
        },
      },
    ],
  },

  // ── Protected: app shell ───────────────────────────────────────────────
  {
    path: '/*',
    element: (
      <ProtectedRoute>
        <Shell />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard
      {
        path: '',
        lazy: async () => {
          const { default: Dashboard } = await import('./features/dashboard/pages/Dashboard');
          return { Component: createNavPage(Dashboard) };
        },
      },

      // Connectivity
      {
        path: 'connectivity',
        lazy: async () => {
          const { ConnectivityOverview } = await import('./pages/Connectivity');
          return { Component: createNavPage(ConnectivityOverview) };
        },
      },
      {
        path: 'connectivity/online',
        lazy: async () => {
          const { DeviceList } = await import('./pages/Connectivity');
          return { Component: createNavPage(DeviceList, { filter: 'Online' }) };
        },
      },
      {
        path: 'connectivity/offline',
        lazy: async () => {
          const { DeviceList } = await import('./pages/Connectivity');
          return { Component: createNavPage(DeviceList, { filter: 'Offline' }) };
        },
      },

      // Assets
      {
        path: 'assets',
        lazy: async () => {
          const { AssetManagement } = await import('./pages/Assets');
          return { Component: createNavPage(AssetManagement) };
        },
      },
      {
        path: 'assets/add-device',
        lazy: async () => {
          const { AddDevice } = await import('./pages/Assets');
          return { Component: createNavPage(AddDevice) };
        },
      },
      {
        path: 'assets/detail',
        lazy: async () => {
          const { AssetDetail } = await import('./pages/Assets');
          return { Component: createNavPage(AssetDetail) };
        },
      },

      // Alerts
      {
        path: 'alerts',
        lazy: async () => {
          const { default: AlertsAnalytics } = await import('./pages/Alerts');
          return { Component: createNavPage(AlertsAnalytics) };
        },
      },
      {
        path: 'alerts/detail',
        lazy: async () => {
          const { AlertDetail } = await import('./pages/Alerts');
          return { Component: createNavPage(AlertDetail) };
        },
      },

      // Reports
      {
        path: 'reports',
        lazy: async () => {
          const { Reports } = await import('./pages/Reports');
          return { Component: createNavPage(Reports) };
        },
      },
      {
        path: 'reports/generate',
        lazy: async () => {
          const { GenerateReport } = await import('./pages/Reports');
          return { Component: createNavPage(GenerateReport) };
        },
      },
      {
        path: 'reports/scheduled',
        lazy: async () => {
          const { ScheduledReports } = await import('./pages/Reports');
          return { Component: createNavPage(ScheduledReports) };
        },
      },

      // File Management
      {
        path: 'files',
        lazy: async () => {
          const { FileManagement } = await import('./pages/FileManagement');
          return { Component: createNavPage(FileManagement) };
        },
      },
      {
        path: 'files/upload',
        lazy: async () => {
          const { UploadFile } = await import('./pages/FileManagement');
          return { Component: createNavPage(UploadFile) };
        },
      },
      {
        path: 'files/select-targets',
        lazy: async () => {
          const { SelectTargets } = await import('./pages/FileManagement');
          return { Component: createNavPage(SelectTargets) };
        },
      },

      // User Management
      {
        path: 'user-management',
        children: [
          // index → redirect to /user-management/users
          { index: true, element: <Navigate to="users" replace /> },

          // List pages — same component, active tab driven by URL
          {
            path: 'users',
            lazy: async () => {
              const { default: UserManagementPage } = await import('./features/user-management/pages/UserManagementPage');
              return { Component: UserManagementPage };
            },
          },
          {
            path: 'roles',
            lazy: async () => {
              const { default: UserManagementPage } = await import('./features/user-management/pages/UserManagementPage');
              return { Component: UserManagementPage };
            },
          },

          // Form pages — Admin only
          {
            path: 'users/add',
            lazy: async () => {
              const [{ default: AddUser }, { default: RequirePermission }] = await Promise.all([
                import('./features/user-management/pages/AddUser'),
                import('./guards/RequirePermission'),
              ]);
              const Guarded = () => (
                <RequirePermission roles={['Admin']} fallback="/user-management/users">
                  <AddUser />
                </RequirePermission>
              );
              return { Component: Guarded };
            },
          },
          {
            path: 'roles/add',
            lazy: async () => {
              const [{ default: AddRole }, { default: RequirePermission }] = await Promise.all([
                import('./features/user-management/pages/AddRole'),
                import('./guards/RequirePermission'),
              ]);
              const Guarded = () => (
                <RequirePermission roles={['Admin']} fallback="/user-management/roles">
                  <AddRole />
                </RequirePermission>
              );
              return { Component: Guarded };
            },
          },
        ],
      },

      // Org / Brand / Location Management
      {
        path: 'orgs',
        lazy: async () => {
          const { OrgManagement } = await import('./pages/OrgManagement');
          return { Component: createNavPage(OrgManagement) };
        },
      },
      {
        path: 'brands',
        lazy: async () => {
          const { default: BrandManagement } = await import('./pages/BrandManagement');
          return { Component: BrandManagement };
        },
      },
      {
        path: 'locations',
        lazy: async () => {
          const { default: LocationManagement } = await import('./pages/LocationManagement');
          return { Component: LocationManagement };
        },
      },

      // Catch-all
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <>
      {/* AuthBootstrap only uses Redux — safe outside RouterProvider */}
      <AuthBootstrap />
      <RouterProvider router={router} />
    </>
  );
}

