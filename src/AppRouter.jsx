import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useTheme, styles } from './context/ThemeContext';
import Sidebar from './layout/Sidebar';
import Login from './pages/Login';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ConnectivityOverview = lazy(() => import('./pages/Connectivity').then((m) => ({ default: m.ConnectivityOverview })));
const DeviceList = lazy(() => import('./pages/Connectivity').then((m) => ({ default: m.DeviceList })));
const AssetManagement = lazy(() => import('./pages/Assets').then((m) => ({ default: m.AssetManagement })));
const AddDevice = lazy(() => import('./pages/Assets').then((m) => ({ default: m.AddDevice })));
const AssetDetail = lazy(() => import('./pages/Assets').then((m) => ({ default: m.AssetDetail })));
const AlertsAnalytics = lazy(() => import('./pages/Alerts'));
const AlertDetail = lazy(() => import('./pages/Alerts').then((m) => ({ default: m.AlertDetail })));
const Reports = lazy(() => import('./pages/Reports').then((m) => ({ default: m.Reports })));
const GenerateReport = lazy(() => import('./pages/Reports').then((m) => ({ default: m.GenerateReport })));
const ScheduledReports = lazy(() => import('./pages/Reports').then((m) => ({ default: m.ScheduledReports })));
const FileManagement = lazy(() => import('./pages/FileManagement').then((m) => ({ default: m.FileManagement })));
const UploadFile = lazy(() => import('./pages/FileManagement').then((m) => ({ default: m.UploadFile })));
const SelectTargets = lazy(() => import('./pages/FileManagement').then((m) => ({ default: m.SelectTargets })));
const UserManagement = lazy(() => import('./pages/UserManagement').then((m) => ({ default: m.UserManagement })));
const AddUser = lazy(() => import('./pages/UserManagement').then((m) => ({ default: m.AddUser })));
const AddRole = lazy(() => import('./pages/UserManagement').then((m) => ({ default: m.AddRole })));
const OrgManagement = lazy(() => import('./pages/OrgManagement').then((m) => ({ default: m.OrgManagement })));
const BrandManagement = lazy(() => import('./pages/BrandManagement'));
const LocationManagement = lazy(() => import('./pages/LocationManagement'));

const NAV = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: 'grid', path: '/' }] },
  { section: 'Operations', items: [{ id: 'connectivity', label: 'Connectivity', icon: 'wifi', path: '/connectivity' }, { id: 'assets', label: 'Asset Management', icon: 'server', path: '/assets' }, { id: 'alerts', label: 'Alerts & Analytics', icon: 'bell', path: '/alerts' }] },
  { section: 'Management', items: [{ id: 'files', label: 'File Management', icon: 'folder', path: '/files' }, { id: 'reports', label: 'Reports', icon: 'file', path: '/reports' }, { id: 'users', label: 'User Management', icon: 'users', path: '/users' }, { id: 'orgs', label: 'Organizations', icon: 'building', path: '/orgs' }] },
];

const ICONS = { grid: '&#9632;', wifi: '&#128225;', server: '&#128194;', bell: '&#128276;', folder: '&#128193;', file: '&#128196;', users: '&#128101;', building: '&#127970;' };

function Shell({ onSignOut }) {
  const { dark, setDark } = useTheme();
  const [search, setSearch] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const st = styles(dark);
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = () => {
    setUserMenuOpen(false);
    onSignOut();
    navigate('/login');
  };

  const routeMap = {
    'dashboard': '/',
    'connectivity': '/connectivity',
    'connectivity-online': '/connectivity/online',
    'connectivity-offline': '/connectivity/offline',
    'network-config': '/connectivity/network-config',
    'assets': '/assets',
    'add-device': '/assets/add-device',
    'asset-detail': '/assets/detail',
    'device-detail': '/assets/detail',
    'alerts': '/alerts',
    'alert-detail': '/alerts/detail',
    'reports': '/reports',
    'generate-report': '/reports/generate',
    'scheduled-reports': '/reports/scheduled',
    'files': '/files',
    'upload-file': '/files/upload',
    'select-targets': '/files/select-targets',
    'users': '/users',
    'add-user': '/users/add',
    'add-role': '/users/add-role',
    'orgs': '/orgs',
  };

  const nav = (idOrPath) => {
    const path = routeMap[idOrPath] || idOrPath;
    if (typeof path === 'string') navigate(path);
  };

  const activeId = NAV.flatMap(g => g.items).find((i) =>
    location.pathname === i.path || location.pathname.startsWith(i.path + '/')
  )?.id;

  return (
    <div style={st.app}>
      <Sidebar nav={nav} activeId={activeId} dark={dark} />

      <div style={st.main}>
        <div style={st.topbar}>
          <div style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{NAV.flatMap(g => g.items).find(i => i.id === activeId)?.label || 'IoT Platform'}</div>
          {/* <div style={{position:'relative'}}>
            <input style={{...st.input,width:200,paddingLeft:28}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div> */}
          {/* <button onClick={()=>setDark(d=>!d)} style={{background:dark?'#2d3748':'#f1f5f9',border:'none',borderRadius:6,padding:'5px 10px',cursor:'pointer',fontSize:14}}>{dark?'☀':'🌙'}</button> */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setUserMenuOpen((p) => !p)}
              style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}
            >
              A
            </div>
            {userMenuOpen && (
              <div style={{ position: 'absolute', right: 0, top: 38, width: 220, background: dark ? '#1e2535' : '#fff', border: '1px solid ' + (dark ? '#ffffff1f' : '#e2e8f0'), borderRadius: 8, boxShadow: '0 8px 16px rgba(0,0,0,0.15)', zIndex: 20 }}>
                <div style={{ padding: 12, borderBottom: '1px solid ' + (dark ? '#ffffff0f' : '#f1f5f9') }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Admin User</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>admin@smatryx.com</div>
                </div>
                <button onClick={signOut} style={{ width: '100%', padding: '10px', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', color: dark ? '#f8fafc' : '#1a202c' }}>Sign out</button>
              </div>
            )}
          </div>
        </div>

        <div style={st.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard nav={nav} />} />
              <Route path="/connectivity" element={<ConnectivityOverview nav={nav} />} />
              <Route path="/connectivity/online" element={<DeviceList filter="Online" nav={nav} />} />
              <Route path="/connectivity/offline" element={<DeviceList filter="Offline" nav={nav} />} />


              <Route path="/assets" element={<AssetManagement nav={nav} />} />
              <Route path="/assets/add-device" element={<AddDevice nav={nav} />} />
              <Route path="/assets/detail" element={<AssetDetail nav={nav} />} />

              <Route path="/alerts" element={<AlertsAnalytics nav={nav} />} />
              <Route path="/alerts/detail" element={<AlertDetail nav={nav} />} />

              <Route path="/reports" element={<Reports nav={nav} />} />
              <Route path="/reports/generate" element={<GenerateReport nav={nav} />} />
              <Route path="/reports/scheduled" element={<ScheduledReports nav={nav} />} />

              <Route path="/files" element={<FileManagement nav={nav} />} />
              <Route path="/files/upload" element={<UploadFile nav={nav} />} />
              <Route path="/files/select-targets" element={<SelectTargets nav={nav} />} />

              <Route path="/users" element={<UserManagement nav={nav} />} />
              <Route path="/users/add" element={<AddUser nav={nav} />} />
              <Route path="/users/add-role" element={<AddRole nav={nav} />} />
              <Route path="/orgs" element={<OrgManagement nav={nav} />} />

              <Route path="/brands" element={<BrandManagement />} />
              <Route path="/locations" element={<LocationManagement />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated
              ? <Shell onSignOut={handleSignOut} />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}
