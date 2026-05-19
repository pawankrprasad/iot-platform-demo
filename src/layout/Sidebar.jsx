import { Box, Stack, Text, NavLink, Divider } from '@mantine/core';
import {
  MdDashboard, MdWifi, MdStorage, MdNotifications,
  MdFolder, MdDescription, MdPeople, MdBusiness,
  MdLabel, MdLocationOn,
} from 'react-icons/md';
import { customColors as c } from '../lib/themeColors';

const NAV = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, color: c.blue, path: '/' },
    ],
  },
  {
    section: 'Operations',
    items: [
      { id: 'connectivity',     label: 'Connectivity',       icon: MdWifi,          color: c.emerald, path: '/connectivity' },
      { id: 'assets',           label: 'Asset Management',   icon: MdStorage,       color: c.indigo,  path: '/assets' },
      { id: 'alerts',           label: 'Alerts & Analytics', icon: MdNotifications, color: c.red,     path: '/alerts' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'files',            label: 'File Management',    icon: MdFolder,      color: c.orange,  path: '/files' },
      { id: 'reports',          label: 'Reports',            icon: MdDescription, color: c.yellow,  path: '/reports' },
      { id: 'user-management',  label: 'User Management',    icon: MdPeople,      color: c.violet,  path: '/user-management' },
      { id: 'orgs',             label: 'Organizations',      icon: MdBusiness,    color: c.cyan,    path: '/orgs' },
      { id: 'brands',           label: 'Brand Management',   icon: MdLabel,       color: c.magenta, path: '/brands' },
      { id: 'locations',        label: 'Location Management',icon: MdLocationOn,  color: c.lime,    path: '/locations' },
    ],
  },
];

export default function Sidebar({ nav, activeId }) {
  return (
    <Box
      w={220}
      h="100vh"
      style={{
        background: 'var(--mantine-color-body)',
        borderRight: '1px solid var(--mantine-color-dark-8)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <Box px="md" py="lg" style={{ borderBottom: '1px solid var(--mantine-color-dark-5)' }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/logo.png" alt="Logo" style={{ width: '20%', height: 'auto' }} />
          <Box>
            <Text
              fw={900}
              size="sm"
              style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: 1 }}
            >
              SMATRYX
            </Text>
            <Text size="xs" c="dimmed" lh={1.2}>IoT Platform</Text>
          </Box>
        </Box>
      </Box>

      {/* Nav groups */}
      <Stack gap={0} pt="xs" style={{ flex: 1 }}>
        {NAV.map((group, gi) => (
          <Box key={group.section}>
            {gi > 0 && <Divider my={4} />}
            <Text
              size="xs"
              fw={600}
              tt="uppercase"
              c="dimmed"
              px="md"
              py={6}
              style={{ letterSpacing: 1 }}
            >
              {group.section}
            </Text>
            {group.items.map((item) => (
              <NavLink
                key={item.id}
                label={item.label}
                leftSection={<item.icon size={16} color={item.color} />}
                active={activeId === item.id}
                onClick={() => nav(item.path)}
                styles={{
                  root: {borderRadius: 5, margin: '1px 6px', width: 'calc(100% - 12px)' },
                }}
              />
            ))}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
