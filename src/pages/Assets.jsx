import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader, SearchBar, Stepper } from '../components';
import { DEVICES, telemetryData, telemetryStats } from '../mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { exportCSV } from '../utils/exportCSV';


import { FaCalculator } from "react-icons/fa";
import { RiWifiOffLine, RiAlertFill } from "react-icons/ri";
import { AiFillAlert, AiFillProduct } from "react-icons/ai";


export function AssetManagement({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [search, setSearch] = useState('');
  const filtered = DEVICES.filter(d => d.id.includes(search) || d.model.toLowerCase().includes(search.toLowerCase()) || d.customer.toLowerCase().includes(search.toLowerCase()));

  const assetCols = [
    { key: 'id', label: 'Device ID' }, { key: 'serial', label: 'Serial' }, { key: 'model', label: 'Model' }, { key: 'brand', label: 'Brand' },
    { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span> },
    { key: 'location', label: 'Location' }, { key: 'firmware', label: 'Firmware' }, { key: 'lastSeen', label: 'Last Seen' }
  ];

  return (
    <div>
      <PageHeader title="Asset Management" sub="Device inventory and lifecycle management" crumbs={['Home', 'Asset Management']}
        actions={[<Btn key="e" variant="ghost" onClick={() => exportCSV(assetCols, filtered, 'assets')}>Export CSV</Btn>, <Btn key="a" onClick={() => nav('add-device')}>+ Add Device</Btn>]} />
      <Card>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          <SearchBar placeholder="Search devices..." value={search} onChange={setSearch} />
          <select style={st.select}><option>All Status</option><option>Online</option><option>Offline</option></select>
          <select style={st.select}><option>All Brands</option><option>Bosch</option><option>Siemens</option></select>
        </div>
        <DataTable cols={assetCols} rows={filtered} onRow={() => nav('asset-detail')} />
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: 12 }}>
          <span>Showing {filtered.length} of {DEVICES.length}</span>
          <div style={{ display: 'flex', gap: 6 }}>{[1, 2, 3].map(p => <button key={p} style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid ' + (dark ? '#ffffff15' : '#e2e8f0'), background: p === 1 ? '#3b82f6' : 'transparent', color: p === 1 ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12 }}>{p}</button>)}</div>
        </div>
      </Card>
    </div>
  );
}
export function AddDevice({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ serial: '', code: '', brand: '', model: '', location: '' });
  const Field = ({ label, name, placeholder }) => (<div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>{label}</label><input style={st.input} placeholder={placeholder} value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} /></div>);
  return (
    <div>
      <PageHeader title="Add New Device" sub="Register a device" crumbs={['Home', 'Assets', 'Add Device']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('assets')}>Cancel</Btn>]} />
      <Stepper steps={['Device Info', 'Assignment', 'Review']} current={step} />
      <Card>
        {step === 1 && <div style={st.grid(2)}>
          <Field label="Serial Number" name="serial" placeholder="SN123456" />
          <Field label="Device Code" name="code" placeholder="EDG-001" />
          <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Brand</label><select style={{ ...st.select, width: '100%' }} value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}><option value="">Select Brand</option><option>Bosch</option><option>Siemens</option></select></div>
          <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Model</label><select style={{ ...st.select, width: '100%' }} value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}><option value="">Select Model</option><option>EdgeNode X1</option><option>EdgeNode X2</option></select></div>
        </div>
        }
        {step === 2 && <div style={st.grid(2)}>
          <div>
            <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Country</label>
            <select style={{ ...st.select, width: '100%' }}>
              <option value="">Select Country</option>
              <option>United States</option>
              <option>Germany</option>
              <option>France</option>
              <option>United Kingdom</option>
              <option>Japan</option>
            </select>
          </div>
          <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>City</label>
            <select style={{ ...st.select, width: '100%' }}>
              <option value="">Select City</option>
              <option>New York</option>
              <option>Berlin</option>
              <option>Paris</option>
              <option>London</option>
              <option>Tokyo</option>
            </select>
          </div>
          <Field label="Location" name="location" placeholder="Floor 1" />
          <div>
            <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Timezone</label>
            <select style={{ ...st.select, width: '100%' }}>
              <option value="">Select Timezone</option>
              <option>UTC (UTC+0)</option>
              <option>America/New_York (UTC-5)</option>
              <option>America/Los_Angeles (UTC-8)</option>
              <option>Europe/Berlin (UTC+1)</option>
              <option>Asia/Kolkata (UTC 5:30)</option>
              <option>Asia/Tokyo (UTC+9)</option>
            </select>
          </div>

          <Field label="Tags" name="tags" placeholder="production, floor1" />
          <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Fleet</label><select style={{ ...st.select, width: '100%' }}><option>Fleet A</option><option>Fleet B</option></select></div>
        </div>}
        {step === 3 && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 16, fontSize: 12.5 }}>{Object.entries(form).map(([k, v]) => v && <p key={k}><span style={{ color: '#64748b' }}>{k}: </span><strong>{v}</strong></p>)}</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => step > 1 ? setStep(s => s - 1) : nav('assets')}>Back</Btn>
          {step < 3 ? <Btn onClick={() => setStep(s => s + 1)}>Next</Btn> : <Btn variant="success" onClick={() => nav('assets')}>Register Device</Btn>}
        </div>
      </Card>
    </div>
  );
}
export function AssetDetail({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [tab, setTab] = useState('info');
  const d = DEVICES[0];
  return (
    <div>
      <PageHeader title={d.id} sub={d.model + ' · ' + d.brand} crumbs={['Home', 'Assets', d.id]}
        actions={[<Btn key="b" variant="ghost" onClick={() => nav('assets')}>Back</Btn>]} />
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <span style={styles(dark).badge(styles(dark).statusColor[d.status])}>{d.status}</span>

      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
        {['info', 'dashboard', 'history'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
      </div>
      {tab === 'info' && <div style={st.grid(2)}>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Device Info</div>{[['ID', d.id], ['Serial', d.serial], ['Model', d.model], ['Brand', d.brand], ['Firmware', d.firmware], ['IP', d.ip]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid ' + (dark ? '#ffffff06' : '#f8fafc'), fontSize: 12.5 }}><span style={{ color: '#64748b' }}>{k}</span><strong>{v}</strong></div>)}</Card>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Assignment</div>
          {[['Location', d.location], ['Device Time', new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }) + ' (UTC)'], ['Fleet', 'Fleet A'], ['Tags', 'production, floor1']].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid ' + (dark ? '#ffffff06' : '#f8fafc'), fontSize: 12.5 }}><span style={{ color: '#64748b' }}>{k}</span><strong>{v}</strong></div>)}</Card>
      </div>}
      {tab === 'dashboard' && <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', cursor: 'pointer', marginRight: 12 }}>
            Apply to All
          </label>
          <select style={st.select} key="tf">
            <option>Last 24h</option>
            <option>Last 7d</option>
            <option>Last 30d</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
          {[
            { label: 'Total Product Produced', value: telemetryStats.totalProductProduced.toLocaleString(), icon: <AiFillProduct color='#3b82f6' />, color: '#3b82f6', bg: dark ? '#1e3a5f22' : '#eff6ff', trend: '+3.2% this month' },
            { label: 'Avg Product Count / Day', value: telemetryStats.avgProductPerDay.toLocaleString(), icon: <FaCalculator color='#10b981' />, color: '#10b981', bg: dark ? '#064e3b22' : '#f0fdf4', trend: '+1.8% vs last week' },
            { label: 'Critical Error Count', value: telemetryStats.criticalErrorCount, icon: <AiFillAlert color='#ef4444' />, color: '#ef4444', bg: dark ? '#7f1d1d22' : '#fff1f2', trend: '−2 since yesterday' },
            { label: 'Total Alerts', value: telemetryStats.totalAlerts, icon: <AiFillAlert color='#f59e0b' />, color: '#f59e0b', bg: dark ? '#78350f22' : '#fffbeb', trend: `${telemetryStats.totalAlerts} active alerts` },
          ].map(({ label, value, icon, color, bg, trend }) => (
            <div key={label} style={{ background: dark ? '#1a2035' : '#fff', border: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 20, background: bg, borderRadius: 8, padding: '4px 8px' }}>{icon}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color, letterSpacing: '-0.5px' }}>{value}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{trend}</div>
            </div>
          ))}
        </div>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Live Telemetry</div><ResponsiveContainer width="100%" height={250}><LineChart data={telemetryData}><CartesianGrid strokeDasharray="3 3" stroke={dark ? '#ffffff0a' : '#f0f0f0'} /><XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ background: dark ? '#1e2535' : '#fff', border: 'none', borderRadius: 8, fontSize: 11 }} /><Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} name="CPU %" /><Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} dot={false} name="Memory %" /><Legend /></LineChart></ResponsiveContainer></Card>
      </div>}

      {(tab === 'history') && <Card><div style={{ padding: '30px 0', textAlign: 'center', color: '#64748b' }}>No {tab} data yet.</div></Card>}
    </div>
  );
}