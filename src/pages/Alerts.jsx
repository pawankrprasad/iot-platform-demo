import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader } from '../components';
import { ALERTS, alertFreqData } from '../mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { AiFillAlert, AiTwotoneAlert, } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { LuTriangleAlert } from "react-icons/lu";

export default function AlertsAnalytics({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const [filter, setFilter] = useState('All');
  const [tab, setTab] = useState('overview');
  const sevs = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const filtered = filter === 'All' ? ALERTS : ALERTS.filter(a => a.severity === filter);
  const counts = { Critical: ALERTS.filter(a => a.severity === 'Critical').length, High: ALERTS.filter(a => a.severity === 'High').length, Medium: ALERTS.filter(a => a.severity === 'Medium').length, Low: ALERTS.filter(a => a.severity === 'Low').length };
  return (
    <div>
      <PageHeader title="Alerts & Analytics" sub="Monitor and analyse alerts" crumbs={['Home', 'Alerts']} />
      <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
        {['overview', 'history', 'analytics'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
      </div>
      {tab === 'overview' && <>
        <div style={st.grid(4)}>
          <StatCard label="Critical" value={counts.Critical} color="#ef4444" icon={<AiFillAlert color='#ef4444' />} onClick={() => setFilter('Critical')} />
          <StatCard label="High" value={counts.High} color="#f97316" icon={<AiTwotoneAlert color='#f97316' />} onClick={() => setFilter('High')} />
          <StatCard label="Medium" value={counts.Medium} color="#eab308" icon={<RiAlertFill color='#eab308' />} onClick={() => setFilter('Medium')} />
          <StatCard label="Low" value={counts.Low} color="#3b82f6" icon={<LuTriangleAlert color='#3b82f6' />} onClick={() => setFilter('Low')} />
        </div>
        <Card>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {sevs.map(s => <button key={s} onClick={() => setFilter(s)} style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid ' + (filter === s ? '#3b82f6' : dark ? '#ffffff18' : '#e2e8f0'), background: filter === s ? '#3b82f6' : 'transparent', color: filter === s ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12, fontWeight: filter === s ? 600 : 400 }}>{s}</button>)}
          </div>
          <DataTable cols={[
            { key: 'id', label: 'Alert ID' }, { key: 'device', label: 'Device' },
            { key: 'severity', label: 'Severity', render: v => <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> },
            { key: 'message', label: 'Message' }, { key: 'time', label: 'Time' },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? '#ef4444' : '#10b981')}>{v}</span> }
          ]} rows={filtered} onRow={() => nav('alert-detail')} />
        </Card>
      </>}
      {tab === 'analytics' && <div style={st.grid(2)}>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Alert Frequency</div><ResponsiveContainer width="100%" height={220}><BarChart data={alertFreqData}><CartesianGrid strokeDasharray="3 3" stroke={dark ? '#ffffff0a' : '#f0f0f0'} /><XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ background: dark ? '#1e2535' : '#fff', border: 'none', borderRadius: 8, fontSize: 11 }} /><Bar dataKey="Critical" fill="#ef4444" stackId="a" /><Bar dataKey="High" fill="#f97316" stackId="a" /><Bar dataKey="Medium" fill="#eab308" stackId="a" /><Bar dataKey="Low" fill="#3b82f6" stackId="a" radius={[4, 4, 0, 0]} /><Legend /></BarChart></ResponsiveContainer></Card>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Distribution</div><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={[{ name: 'Critical', value: counts.Critical }, { name: 'High', value: counts.High }, { name: 'Medium', value: counts.Medium }, { name: 'Low', value: counts.Low }]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => name + ': ' + value}>{['#ef4444', '#f97316', '#eab308', '#3b82f6'].map((c, i) => <Cell key={i} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card>
      </div>}
      {tab === 'history' && <Card><DataTable cols={[
        { key: 'id', label: 'ID' }, { key: 'device', label: 'Device' }, { key: 'message', label: 'Message' },
        { key: 'severity', label: 'Severity', render: v => <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> },
        { key: 'time', label: 'Time' }, { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? '#ef4444' : '#10b981')}>{v}</span> }
      ]} rows={ALERTS} /></Card>}
    </div>
  );
}
export function AlertDetail({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const a = ALERTS[0];
  return (
    <div>
      <PageHeader title={'Alert: ' + a.id} sub={a.message} crumbs={['Home', 'Alerts', a.id]}
        actions={[<Btn key="r" variant="success">Resolve</Btn>, <Btn key="b" variant="ghost" onClick={() => nav('alerts')}>Back</Btn>]} />
      <div style={st.grid(2)}>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Details</div>{[['ID', a.id], ['Device', a.device], ['Severity', a.severity], ['Message', a.message], ['Status', a.status], ['Time', a.time]].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid ' + (dark ? '#ffffff06' : '#f8fafc'), fontSize: 12.5 }}><span style={{ color: '#64748b' }}>{k}</span>{k === 'Severity' ? <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> : k === 'Status' ? <span style={styles(dark).badge(v === 'Active' ? '#ef4444' : '#10b981')}>{v}</span> : <strong>{v}</strong>}</div>)}</Card>
        <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Timeline</div>{[{ icon: '🔴', msg: 'Alert triggered', time: '2h ago' }, { icon: '👁️', msg: 'Acknowledged', time: '1h 45m ago' }, { icon: '🔍', msg: 'Investigation', time: '1h 30m ago' }].map((e, i) => <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') : undefined, fontSize: 12 }}><span>{e.icon}</span><div style={{ flex: 1 }}>{e.msg}</div><div style={{ color: '#64748b', fontSize: 11 }}>{e.time}</div></div>)}</Card>
      </div>
    </div>
  );
}