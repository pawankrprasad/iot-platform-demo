import { lazy } from 'react';

export const Dashboard = lazy(() => import('../features/dashboard/pages/Dashboard'));

export const ConnectivityOverview = lazy(() =>
  import('../pages/Connectivity').then((m) => ({ default: m.ConnectivityOverview }))
);
export const DeviceList = lazy(() =>
  import('../pages/Connectivity').then((m) => ({ default: m.DeviceList }))
);

export const AssetManagement = lazy(() =>
  import('../pages/Assets').then((m) => ({ default: m.AssetManagement }))
);
export const AddDevice = lazy(() =>
  import('../pages/Assets').then((m) => ({ default: m.AddDevice }))
);
export const AssetDetail = lazy(() =>
  import('../pages/Assets').then((m) => ({ default: m.AssetDetail }))
);

export const AlertsAnalytics = lazy(() => import('../pages/Alerts'));
export const AlertDetail = lazy(() =>
  import('../pages/Alerts').then((m) => ({ default: m.AlertDetail }))
);

export const Reports = lazy(() =>
  import('../pages/Reports').then((m) => ({ default: m.Reports }))
);
export const GenerateReport = lazy(() =>
  import('../pages/Reports').then((m) => ({ default: m.GenerateReport }))
);
export const ScheduledReports = lazy(() =>
  import('../pages/Reports').then((m) => ({ default: m.ScheduledReports }))
);

export const FileManagement = lazy(() =>
  import('../pages/FileManagement').then((m) => ({ default: m.FileManagement }))
);
export const UploadFile = lazy(() =>
  import('../pages/FileManagement').then((m) => ({ default: m.UploadFile }))
);
export const SelectTargets = lazy(() =>
  import('../pages/FileManagement').then((m) => ({ default: m.SelectTargets }))
);

export const OrgManagement = lazy(() =>
  import('../pages/OrgManagement').then((m) => ({ default: m.OrgManagement }))
);
export const BrandManagement    = lazy(() => import('../pages/BrandManagement'));
export const LocationManagement = lazy(() => import('../pages/LocationManagement'));

export const UserManagementRoutes = lazy(() =>
  import('@/features/user-management/UserManagementRoutes')
);
