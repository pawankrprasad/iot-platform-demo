import { Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Text, Group, Menu, Avatar, Divider, Paper } from '@mantine/core';
import { logoutAction } from '../store';
import Sidebar from './Sidebar';
import { NAV, ROUTE_MAP } from '../config/nav';
import {
  Dashboard,
  ConnectivityOverview, DeviceList,
  AssetManagement, AddDevice, AssetDetail,
  AlertsAnalytics, AlertDetail,
  Reports, GenerateReport, ScheduledReports,
  FileManagement, UploadFile, SelectTargets,
  OrgManagement, BrandManagement, LocationManagement,
  UserManagementRoutes,
} from '../router/lazyRoutes';

export default function Shell() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const dispatch   = useDispatch();

  const signOut = async () => {
    try { await import('../api').then((m) => m.authApi.logout()); } catch { /* ignore */ }
    dispatch(logoutAction());
    navigate('/account/login', { replace: true });
  };

  const nav = (idOrPath) => {
    const path = ROUTE_MAP[idOrPath] ?? idOrPath;
    if (typeof path === 'string') navigate(path);
  };

  const activeItem = NAV.flatMap((g) => g.items).find(
    (i) => location.pathname === i.path || location.pathname.startsWith(i.path + '/')
  );
  const activeId    = activeItem?.id;
  const activeLabel = activeItem?.label ?? 'IoT Platform';

  return (
    <div className="main-app">
      <Sidebar nav={nav} activeId={activeId} />

      <div className="main-header">
        {/* ── Top bar ── */}
        <Paper px="md" h={52} style={{ flexShrink: 0, borderRadius: 0 }}>
          <Group h="100%" justify="space-between">
            <Text fw={600} fz="sm">{activeLabel}</Text>

            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <Avatar
                  size={30}
                  radius="xl"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', cursor: 'pointer' }}
                  styles={{ placeholder: { background: 'transparent', color: '#fff' } }}
                >
                  A
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                <Box px="sm" py="xs">
                  <Text fw={700} fz="sm">Admin User</Text>
                  <Text fz="xs" c="dimmed">admin@smatryx.com</Text>
                </Box>
                <Divider />
                <Menu.Item onClick={signOut}>Sign out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Paper>

        {/* ── Page content ── */}
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/"                        element={<Dashboard nav={nav} />} />

              <Route path="/connectivity"            element={<ConnectivityOverview nav={nav} />} />
              <Route path="/connectivity/online"     element={<DeviceList filter="Online"  nav={nav} />} />
              <Route path="/connectivity/offline"    element={<DeviceList filter="Offline" nav={nav} />} />

              <Route path="/assets"                  element={<AssetManagement nav={nav} />} />
              <Route path="/assets/add-device"       element={<AddDevice nav={nav} />} />
              <Route path="/assets/detail"           element={<AssetDetail nav={nav} />} />

              <Route path="/alerts"                  element={<AlertsAnalytics nav={nav} />} />
              <Route path="/alerts/detail"           element={<AlertDetail nav={nav} />} />

              <Route path="/reports"                 element={<Reports nav={nav} />} />
              <Route path="/reports/generate"        element={<GenerateReport nav={nav} />} />
              <Route path="/reports/scheduled"       element={<ScheduledReports nav={nav} />} />

              <Route path="/files"                   element={<FileManagement nav={nav} />} />
              <Route path="/files/upload"            element={<UploadFile nav={nav} />} />
              <Route path="/files/select-targets"    element={<SelectTargets nav={nav} />} />

              <Route path="/user-management/*"       element={<UserManagementRoutes />} />
              <Route path="/orgs"                    element={<OrgManagement nav={nav} />} />
              <Route path="/brands"                  element={<BrandManagement />} />
              <Route path="/locations"               element={<LocationManagement />} />

              <Route path="*"                        element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
