import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader } from '../components';
import { ALERTS, alertFreqData } from '../mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { AiFillAlert, AiTwotoneAlert, } from "react-icons/ai";
import { RiAlertFill } from "react-icons/ri";
import { LuTriangleAlert } from "react-icons/lu";

import { Tabs, useMantineTheme, Paper, Grid, Group, Stack, Text, Badge, Button, Timeline } from '@mantine/core';

export default function AlertsAnalytics({ nav }) {
  const { dark } = useTheme(); const st = styles(dark);
  const theme = useMantineTheme();
  const c = theme.other.colors;
  const [filter, setFilter] = useState('All');
  const [tab, setTab] = useState('overview');
  const sevs = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const filtered = filter === 'All' ? ALERTS : ALERTS.filter(a => a.severity === filter);
  const counts = { Critical: ALERTS.filter(a => a.severity === 'Critical').length, High: ALERTS.filter(a => a.severity === 'High').length, Medium: ALERTS.filter(a => a.severity === 'Medium').length, Low: ALERTS.filter(a => a.severity === 'Low').length };
  return (
    <div>
      <PageHeader title="Alerts & Analytics" sub="Monitor and analyse alerts" crumbs={['Home', 'Alerts']} />
      
       <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
          <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="md">
        <div style={st.grid(4)}>
          <StatCard label="Critical" value={counts.Critical} color={c.red} icon={<AiFillAlert color={c.red} />} onClick={() => setFilter('Critical')} />
          <StatCard label="High" value={counts.High} color={c.orange} icon={<AiTwotoneAlert color={c.orange} />} onClick={() => setFilter('High')} />
          <StatCard label="Medium" value={counts.Medium} color={c.yellow} icon={<RiAlertFill color={c.yellow} />} onClick={() => setFilter('Medium')} />
          <StatCard label="Low" value={counts.Low} color={c.blue} icon={<LuTriangleAlert color={c.blue} />} onClick={() => setFilter('Low')} />
        </div>
        <Card>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {sevs.map(s => <button key={s} onClick={() => setFilter(s)} style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid ' + (filter === s ? '#3b82f6' : dark ? '#ffffff18' : '#e2e8f0'), background: filter === s ? '#3b82f6' : 'transparent', color: filter === s ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12, fontWeight: filter === s ? 600 : 400 }}>{s}</button>)}
          </div>
          <DataTable cols={[
            { key: 'id', label: 'Alert ID' }, { key: 'device', label: 'Device' },
            { key: 'severity', label: 'Severity', render: v => <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> },
            { key: 'message', label: 'Message' }, { key: 'time', label: 'Time' },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? c.red : c.emerald)}>{v}</span> }
          ]} rows={filtered} onRow={() => nav('alert-detail')} />
        </Card>
      </Tabs.Panel>
      <Tabs.Panel value="history" pt="md">
        <Card><DataTable cols={[
          { key: 'id', label: 'ID' }, { key: 'device', label: 'Device' }, { key: 'message', label: 'Message' },
          { key: 'severity', label: 'Severity', render: v => <span style={styles(dark).badge(styles(dark).severityColor[v])}>{v}</span> },
          { key: 'time', label: 'Time' }, { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? c.red : c.emerald)}>{v}</span> }
        ]} rows={ALERTS} /></Card>
      </Tabs.Panel>
      <Tabs.Panel value="analytics" pt="md">
        <div style={st.grid(2)}>
          <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Alert Frequency</div><ResponsiveContainer width="100%" height={220}><BarChart data={alertFreqData}><CartesianGrid strokeDasharray="3 3" stroke={dark ? '#ffffff0a' : '#f0f0f0'} /><XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} /><YAxis tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip contentStyle={{ background: dark ? '#1e2535' : '#fff', border: 'none', borderRadius: 8, fontSize: 11 }} /><Bar dataKey="Critical" fill={c.red} stackId="a" /><Bar dataKey="High" fill={c.orange} stackId="a" /><Bar dataKey="Medium" fill={c.yellow} stackId="a" /><Bar dataKey="Low" fill={c.blue} stackId="a" radius={[4, 4, 0, 0]} /><Legend /></BarChart></ResponsiveContainer></Card>
          <Card><div style={{ fontWeight: 600, marginBottom: 12 }}>Distribution</div><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={[{ name: 'Critical', value: counts.Critical }, { name: 'High', value: counts.High }, { name: 'Medium', value: counts.Medium }, { name: 'Low', value: counts.Low }]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => name + ': ' + value}>{[c.red, c.orange, c.yellow, c.blue].map((col, i) => <Cell key={i} fill={col} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card>
        </div>
      </Tabs.Panel>
       </Tabs>
    </div>
  );
}
export function AlertDetail({ nav }) {
  const theme = useMantineTheme();
  const c = theme.other.colors;
  const a = ALERTS[0];

  const severityColor = {
    Critical: 'red', High: 'orange', Medium: 'yellow', Low: 'blue',
  };

  const DETAILS = [
    ['ID', a.id], ['Device', a.device], ['Severity', a.severity],
    ['Message', a.message], ['Status', a.status], ['Time', a.time],
  ];

  const TIMELINE = [
    { title: 'Alert triggered',  color: 'red',    time: '2h ago' },
    { title: 'Acknowledged',     color: 'orange', time: '1h 45m ago' },
    { title: 'Investigation',    color: 'blue',   time: '1h 30m ago' },
    { title: 'Resolved',         color: 'green',  time: '1h ago' },
  ];

  return (
    <div>
      <PageHeader
        title={'Alert: ' + a.id}
        sub={a.message}
        crumbs={['Home', 'Alerts', a.id]}
        actions={[
          <Button key="r" size="xs">Resolve</Button>,
          <Button key="b" size="xs" variant='default' onClick={() => nav('alerts')}>Back</Button>,
        ]}
      />
      <Grid align="stretch">
        <Grid.Col span={6}>
           <Paper withBorder p="md" radius="md" h="100%">
            <Text fw={600} mb="sm">Details</Text>
            <Stack gap={0}>
              {DETAILS.map(([k, v], i) => (
                <Group
                  key={k}
                  justify="space-between"
                  py="xs"
                  style={{ borderBottom: i < DETAILS.length - 1 ? '1px solid var(--mantine-color-dark-5)' : 'none' }}
                >
                  <Text size="xs" c="dimmed">{k}</Text>
                  {k === 'Severity'
                    ? <Badge color={severityColor[v]} variant="light" size="sm">{v}</Badge>
                    : k === 'Status'
                      ? <Badge color={v === 'Active' ? 'red' : 'teal'} variant="light" size="sm">{v}</Badge>
                      : <Text size="xs" fw={600}>{v}</Text>}
                </Group>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Timeline active={TIMELINE.length - 1} bulletSize={20} lineWidth={2}>
              {TIMELINE.map((e) => (
                <Timeline.Item key={e.title} title={e.title} color={e.color}>
                  <Text size="xs" c="dimmed">{e.time}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}