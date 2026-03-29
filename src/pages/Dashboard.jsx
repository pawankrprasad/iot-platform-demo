import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader } from '../components';
import { DEVICES, BRANDS, ALERTS, telemetryData, alertFreqData } from '../mock-data';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ nav }) {
  const { dark } = useTheme();
  const st = styles(dark);
  const online = DEVICES.filter(d => d.status === 'Online').length;
  const offline = DEVICES.filter(d => d.status === 'Offline').length;
  const critical = ALERTS.filter(a => a.severity === 'Critical' && a.status === 'Active').length;
  const non_critical = ALERTS.filter(a => a.severity === 'Medium' || a.severity === 'Low' && a.status === 'Active').length;
  return (
    <div>
      <PageHeader title="Executive Dashboard" sub="Platform-wide operational overview" crumbs={['Home', 'Dashboard']}
        actions={[
          <select style={st.select} key="tf"><option>Last 24h</option><option>Last 7d</option><option>Last 30d</option></select>,
          <Btn key="r" variant="ghost">Refresh</Btn>
        ]} />
      <div style={st.grid(4)}>
        <StatCard label="Total Brands" value={BRANDS.length} color="#e917bbff" icon="🏢" onClick={() => nav('brands')} sub="Brands" />
        <StatCard label="Total Devices" value={DEVICES.length} color="#3b82f6" icon="📡" onClick={() => nav('assets')} sub="View inventory" />
        <StatCard label="Locations" value={9} color="#C6CC14" icon="📍" />
        <StatCard label="Users" value={56} color="#7C14CC" icon="👥" onClick={() => nav('users')} />
      </div>
      <div style={st.grid(4)}>

        <StatCard label="Active Devices" value={online} color="#10b981" icon="🟢" onClick={() => nav('connectivity-online')} sub="Online now" />
        <StatCard label="Offline" value={offline} color="#afafaeff" icon="🔴" onClick={() => nav('connectivity-offline')} />
        <StatCard label="Active Alerts" value={critical} color="#ef4444" icon="🚨" onClick={() => nav('alerts')} sub="Critical" />
        <StatCard label="Active Alerts" value={non_critical} color="#dfa269ff" icon="⚠️" onClick={() => nav('alerts')} sub="Non-Critical" />

      </div>
      <div style={st.grid(2)}>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Device Telemetry (24h)</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={telemetryData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#ffffff0a' : '#f0f0f0'} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={{ background: dark ? '#1e2535' : '#fff', border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="url(#g1)" name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#10b981" fill="url(#g2)" name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Alert Frequency (7d)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertFreqData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#ffffff0a' : '#f0f0f0'} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={{ background: dark ? '#1e2535' : '#fff', border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="Critical" stackId="a" fill="#ef4444" /><Bar dataKey="High" stackId="a" fill="#f97316" />
              <Bar dataKey="Medium" stackId="a" fill="#eab308" /><Bar dataKey="Low" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Recent Alerts</div>
          <Btn variant="ghost" onClick={() => nav('alerts')}>View All</Btn>
        </div>
        <DataTable
          cols={[
            { key: 'id', label: 'Alert ID' }, { key: 'device', label: 'Device' },
            { key: 'severity', label: 'Severity', render: v => <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> },
            { key: 'message', label: 'Message' }, { key: 'time', label: 'Time' },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? '#ef4444' : '#10b981')}>{v}</span> },
          ]}
          rows={ALERTS.slice(0, 6)} onRow={() => nav('alert-detail')} />
      </Card>
    </div>
  );
}