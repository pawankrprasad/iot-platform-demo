import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, SectionCard, Btn, PageHeader, Select, Button, IconButton, Badge } from '../components';
import { DEVICES, BRANDS, ALERTS, telemetryData, alertFreqData } from '../mock-data';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { FaLayerGroup, FaSatelliteDish, FaLocationArrow, FaUsers, FaWifi } from "react-icons/fa6";
import { RiWifiOffLine, RiAlertFill } from "react-icons/ri";
import { AiFillAlert } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { DataTable } from 'mantine-datatable';
import { Grid, useMantineTheme } from '@mantine/core';



export default function Dashboard({ nav }) {
  const { dark } = useTheme();
  const theme = useMantineTheme();
  const st = styles(dark);
  const online = DEVICES.filter(d => d.status === 'Online').length;
  const offline = DEVICES.filter(d => d.status === 'Offline').length;
  const critical = ALERTS.filter(a => a.severity === 'Critical' && a.status === 'Active').length;
  const non_critical = ALERTS.filter(a => a.severity === 'Medium' || a.severity === 'Low' && a.status === 'Active').length;
  return (
    <div>
      <PageHeader title="Executive Dashboard" sub="Platform-wide operational overview" crumbs={['Home', 'Dashboard']}
        actions={[
          <Select 
            value={'24h'} 
            size='xs'
            style={{ width: 100 }}
            data={
              [
                { value: '24h', label: 'Last 24h' },
                { value: '7d', label: 'Last 7d' },
                { value: '30d', label: 'Last 30d' }
              ]
            } />,
            <IconButton size='md' variant="default">
              <IoMdRefresh />
            </IconButton>,
        ]} />
        <Grid align='stretch'>
          <Grid.Col span={3}>
            <StatCard label="Total Brands" value={BRANDS.length} color="#e917bbff" icon={<FaLayerGroup color='#e917bbff' />} onClick={() => nav('brands')} sub="Brands" />
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Total Devices" value={DEVICES.length} color="#3b82f6" icon={<FaSatelliteDish color='#3b82f6' />} onClick={() => nav('assets')} sub="View inventory" />
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Locations" value={9} color="#C6CC14" icon={<FaLocationArrow color='#C6CC14'/>} onClick={()=>nav('locations')}/>
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Users" value={56} color="#7C14CC" icon={<FaUsers color='#7C14CC' />} onClick={() => nav('users')} />
          </Grid.Col>
        </Grid>
      
      <Grid align="stretch">
        <Grid.Col span={3}>
          <StatCard label="Active Devices" value={online} color="#10b981" icon={<FaWifi color='#10b981' />} onClick={() => nav('connectivity-online')} sub="Online now" />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Offline" value={offline} color="#afafaeff" icon={<RiWifiOffLine color='#afafaeff' />} onClick={() => nav('connectivity-offline')} />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Active Alerts" value={critical} color="#ef4444" icon={<AiFillAlert color='#ef4444' />} onClick={() => nav('alerts')} sub="Critical" />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Active Alerts" value={non_critical} color="#dfa269ff" icon={<RiAlertFill color='#dfa269ff' />} onClick={() => nav('alerts')} sub="Non-Critical" />
        </Grid.Col>
      </Grid>
      <Grid align="stretch">
        <Grid.Col span={6}>
          <SectionCard title="Device Telemetry (24h)">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={telemetryData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.dark[5]} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: theme.colors.dark[2] }} /><YAxis tick={{ fontSize: 10, fill: theme.colors.dark[2] }} />
              <Tooltip contentStyle={{ background: theme.colors.dark[7], border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="url(#g1)" name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#10b981" fill="url(#g2)" name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
          </SectionCard>
        </Grid.Col>
        <Grid.Col span={6}>
          <SectionCard title="Alert Frequency (7d)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertFreqData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.dark[5]} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: theme.colors.dark[2] }} /><YAxis tick={{ fontSize: 10, fill: theme.colors.dark[2] }} />
              <Tooltip contentStyle={{ background: theme.colors.dark[7], border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="Critical" stackId="a" fill="#ef4444" /><Bar dataKey="High" stackId="a" fill="#f97316" />
              <Bar dataKey="Medium" stackId="a" fill="#eab308" /><Bar dataKey="Low" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </SectionCard>
        </Grid.Col>
      </Grid>
      <SectionCard title="Recent Alerts" actions={[
        <Button size='sm' variant="subtle" onClick={() => nav('alerts')}>View All</Button>,
        ]}>
        <DataTable
          columns={[
            { accessor: 'id', title: 'Alert ID' },
            { accessor: 'device', title: 'Device' },
            { accessor: 'severity', title: 'Severity', render: (row) => (
              <Badge label={row.severity} />
            ) },
            { accessor: 'message', title: 'Message' },
            { accessor: 'time', title: 'Time' },
            { accessor: 'status', title: 'Status', render: (row) => (
              <Badge label={row.status} />

            ) },
          ]}
          records={ALERTS.slice(0, 6)}
          onRowClick={() => nav('alert-detail')} />
      </SectionCard>
    </div>
  );
}