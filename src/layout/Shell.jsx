import { Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Text, Group, Menu, Avatar, Divider, Paper } from '@mantine/core';
import { logoutAction } from '../store';
import Sidebar from './Sidebar';
import { NAV, ROUTE_MAP } from '../config/nav';

const TopBar = ({ title }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const signOut = async () => {
        try { await import('../api').then((m) => m.authApi.logout()); } catch { /* ignore */ }
        dispatch(logoutAction());
        navigate('/account/login', { replace: true });
    };

    return (
        <Paper px="md" h={52} style={{ flexShrink: 0, borderRadius: 0 }}>
            <Group h="100%" justify="space-between">
                <Text fw={600} fz="sm">{title}</Text>

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
    )
}

export default function Shell() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

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
    const activeId = activeItem?.id;
    const activeLabel = activeItem?.label ?? 'IoT Platform';

    return (
        <div className="main-app">
            <Sidebar nav={nav} activeId={activeId} />

            <div className="main-header">
                {/* ── Top bar ── */}
                <TopBar title={activeLabel} />

                {/* ── Page content — nav is provided via outlet context ── */}
                <div className="main-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet context={{ nav }} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

