import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader, SearchBar } from '../components';
import { DEVICES, connTrendData } from '../mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useMantineTheme } from '@mantine/core';

export function ConnectivityOverview({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const theme = useMantineTheme();
  const c = theme.other.colors;
  const online = DEVICES.filter(d => d.status === 'Online').length;
  const offline = DEVICES.filter(d => d.status === 'Offline').length;
  const warning = DEVICES.filter(d => d.status === 'Warning').length;
  return (
    <div>
      <PageHeader title="Connectivity Management" sub="Monitor device connection status" crumbs={['Home', 'Connectivity']} />
      <div style={st.grid(3)}>
        <StatCard label="Online" value={online} color={c.emerald} icon="🟢" onClick={() => nav('connectivity-online')} sub="Click to view" />
        <StatCard label="Offline" value={offline} color={c.red} icon="🔴" onClick={() => nav('connectivity-offline')} sub="Click to view" />
        <StatCard label="Warning" value={warning} color={c.orange} icon="🟡" sub="Degraded" />
      </div>
      <div style={st.grid(2)}>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Connection Trends (7d)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={connTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.dark[5]} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: theme.colors.dark[2] }} /><YAxis tick={{ fontSize: 10, fill: theme.colors.dark[2] }} />
              <Tooltip contentStyle={{ background: theme.colors.dark[7], border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="online" stroke={c.emerald} strokeWidth={2} dot={false} name="Online" />
              <Line type="monotone" dataKey="offline" stroke={c.red} strokeWidth={2} dot={false} name="Offline" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Recent Events</div>
          {[
            { icon: '🟢', msg: 'DEV-1001 came online', time: '2m ago' },
            { icon: '🔴', msg: 'DEV-1005 went offline', time: '12m ago' },
            { icon: '🟡', msg: 'DEV-1010 signal degraded', time: '25m ago' },
            { icon: '🟢', msg: 'DEV-1003 reconnected', time: '1h ago' },
            { icon: '🔴', msg: 'DEV-1015 timeout', time: '2h ago' },
          ].map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') : 'none', alignItems: 'center' }}>
              <span>{e.icon}</span><div style={{ flex: 1, fontSize: 12.5 }}>{e.msg}</div><div style={{ fontSize: 11, color: '#64748b' }}>{e.time}</div>
            </div>
          ))}
        </Card>
      </div>
      <Card>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>All Devices</div>
        <DataTable cols={[
          { key: 'id', label: 'Device ID' }, { key: 'model', label: 'Model' }, { key: 'location', label: 'Location' },
          { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span> },
          { key: 'lastSeen', label: 'Last Seen' }, { key: 'ip', label: 'IP' }
        ]} rows={DEVICES.slice(0, 10)} onRow={() => nav('device-detail')} />
      </Card>
    </div>
  );
}
export function DeviceList({ filter, nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [search, setSearch] = useState('');
  const rows = DEVICES.filter(d => d.status === filter && (d.id.includes(search) || d.model.toLowerCase().includes(search.toLowerCase())));
  return (
    <div>
      <PageHeader title={filter + ' Devices'} sub={rows.length + ' devices ' + filter.toLowerCase()} crumbs={['Home', 'Connectivity', filter]}
        actions={[<Btn key="b" variant="ghost" onClick={() => nav('connectivity')}>Back</Btn>]} />
      <Card>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <SearchBar placeholder="Search..." value={search} onChange={setSearch} />
          <select style={st.select}><option>All Locations</option><option>Floor 1</option><option>Warehouse A</option></select>
        </div>
        <DataTable cols={[
          { key: 'id', label: 'Device ID' }, { key: 'serial', label: 'Serial' }, { key: 'model', label: 'Model' }, { key: 'brand', label: 'Brand' },
          { key: 'customer', label: 'Customer' }, { key: 'location', label: 'Location' }, { key: 'lastSeen', label: 'Last Seen' },
          { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span> }
        ]} rows={rows} onRow={() => nav('device-detail')} />
      </Card>
    </div>
  );
}
export function NetworkConfig({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab, setTab] = useState('wifi');
  return (
    <div>
      <PageHeader title="Network Configuration" sub="Configure WiFi and Ethernet" crumbs={['Home', 'Connectivity', 'Network Config']}
        actions={[<Btn key="s">Save Changes</Btn>]} />
      <Card>
        <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 20 }}>
          {['wifi', 'ethernet', 'dns', 'proxy'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.toUpperCase()}</button>)}
        </div>
        {tab === 'wifi' && <div style={st.grid(2)}>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>SSID</label><input style={{ ...st.input, marginTop: 4 }} defaultValue="FleetNet_5G" /></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>Password</label><input type="password" style={{ ...st.input, marginTop: 4 }} defaultValue="secret" /></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>Security</label><select style={{ ...st.select, marginTop: 4, width: '100%' }}><option>WPA2</option><option>WPA3</option></select></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>Band</label><select style={{ ...st.select, marginTop: 4, width: '100%' }}><option>5 GHz</option><option>2.4 GHz</option></select></div>
        </div>}
        {tab === 'ethernet' && <div style={st.grid(2)}>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>IP Mode</label><select style={{ ...st.select, marginTop: 4, width: '100%' }}><option>DHCP</option><option>Static</option></select></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>IP Address</label><input style={{ ...st.input, marginTop: 4 }} defaultValue="192.168.1.50" /></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>Subnet</label><input style={{ ...st.input, marginTop: 4 }} defaultValue="255.255.255.0" /></div>
          <div><label style={{ fontSize: 12, color: '#64748b' }}>Gateway</label><input style={{ ...st.input, marginTop: 4 }} defaultValue="192.168.1.1" /></div>
        </div>}
        {(tab === 'dns' || tab === 'proxy') && <div style={{ padding: '20px 0', color: '#64748b', textAlign: 'center' }}>Configure {tab.toUpperCase()} settings here.</div>}
      </Card>
    </div>
  );
}