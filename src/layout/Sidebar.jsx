import { useTheme, styles } from '../context/ThemeContext';

const NAV = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: 'grid', path: '/' }] },
  {
    section: 'Operations',
    items: [
      { id: 'connectivity', label: 'Connectivity', icon: 'wifi', path: '/connectivity' },
      { id: 'assets', label: 'Asset Management', icon: 'server', path: '/assets' },
      { id: 'alerts', label: 'Alerts & Analytics', icon: 'bell', path: '/alerts' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'files', label: 'File Management', icon: 'folder', path: '/files' },
      { id: 'reports', label: 'Reports', icon: 'file', path: '/reports' },
      { id: 'users', label: 'User Management', icon: 'users', path: '/users' },
      { id: 'orgs', label: 'Organizations', icon: 'building', path: '/orgs' },
      { id: 'brands', label: 'Brand Management', icon: 'tags', path: '/brands' },
      { id: 'locations', label: 'Location Management', icon: 'location', path: '/locations' },
    ],
  },
];

const ICONS = {
  grid: '&#9632;',
  wifi: '&#128225;',
  server: '&#128194;',
  bell: '&#128276;',
  folder: '&#128193;',
  file: '&#128196;',
  users: '&#128101;',
  building: '&#127970;',
  tags: '&#128233;',
  location: '&#128205;',
};

export default function Sidebar({ nav, activeId, dark }) {
  const st = styles(dark);

  return (
    <div style={st.sidebar}>
      <div style={st.sidebarLogo}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/assets/logo.png" alt="Logo" style={{ width: '20%', height: '20%' }} />
          <div>
            <div style={st.orbitronLogoText}>SMATRYX</div>
            <div style={st.logoSub}>IoT Platform</div>
          </div>
        </div>
      </div>
      {NAV.map((group) => (
        <div key={group.section}>
          <div style={st.navSection}>{group.section}</div>
          {group.items.map((item) => (
            <div key={item.id} style={st.navItem(activeId === item.id)} onClick={() => nav(item.path)}>
              <span dangerouslySetInnerHTML={{ __html: ICONS[item.icon] || '•' }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}

    </div>
  );
}
