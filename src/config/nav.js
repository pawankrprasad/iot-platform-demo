export const NAV = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'grid', path: '/' },
    ],
  },
  {
    section: 'Operations',
    items: [
      { id: 'connectivity', label: 'Connectivity',       icon: 'wifi',   path: '/connectivity' },
      { id: 'assets',       label: 'Asset Management',   icon: 'server', path: '/assets' },
      { id: 'alerts',       label: 'Alerts & Analytics', icon: 'bell',   path: '/alerts' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'files',           label: 'File Management',   icon: 'folder',   path: '/files' },
      { id: 'reports',         label: 'Reports',            icon: 'file',     path: '/reports' },
      { id: 'user-management', label: 'User Management',   icon: 'users',    path: '/user-management' },
      { id: 'orgs',            label: 'Organizations',      icon: 'building', path: '/orgs' },
      { id: 'brands',          label: 'Brand Management',   icon: 'label',    path: '/brands' },
      { id: 'locations',       label: 'Location Management',icon: 'location', path: '/locations' },
    ],
  },
];

export const ROUTE_MAP = {
  dashboard:           '/',
  connectivity:        '/connectivity',
  'connectivity-online':  '/connectivity/online',
  'connectivity-offline': '/connectivity/offline',
  'network-config':    '/connectivity/network-config',
  assets:              '/assets',
  'add-device':        '/assets/add-device',
  'asset-detail':      '/assets/detail',
  'device-detail':     '/assets/detail',
  alerts:              '/alerts',
  'alert-detail':      '/alerts/detail',
  reports:             '/reports',
  'generate-report':   '/reports/generate',
  'scheduled-reports': '/reports/scheduled',
  files:               '/files',
  'upload-file':       '/files/upload',
  'select-targets':    '/files/select-targets',
  'user-management':   '/user-management',
  'add-user':          '/user-management/users/add',
  'add-role':          '/user-management/roles/add',
  orgs:                '/orgs',
  brands:              '/brands',
  locations:           '/locations',
};
