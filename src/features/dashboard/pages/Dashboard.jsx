
import { StatCard, SectionCard, PageHeader, Select, Button, IconButton, Badge } from '../../../components';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { FaLayerGroup, FaSatelliteDish, FaLocationArrow, FaUsers, FaWifi } from "react-icons/fa6";
import { RiWifiOffLine, RiAlertFill } from "react-icons/ri";
import { AiFillAlert } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { DataTable } from 'mantine-datatable';
import { Grid, useMantineTheme } from '@mantine/core';

import { DEVICES, BRANDS, ALERTS, telemetryData, alertFreqData } from '../../../mock-data';

import { TelemetryGraph } from '../components/TelemetryGraph';

export default function Dashboard({ nav }) {
  
  const theme = useMantineTheme();

  const online = DEVICES.filter(d => d.status === 'Online').length;
  const offline = DEVICES.filter(d => d.status === 'Offline').length;
  const critical = ALERTS.filter(a => a.severity === 'Critical' && a.status === 'Active').length;
  const non_critical = ALERTS.filter(a => (a.severity === 'Medium' || a.severity === 'Low') && a.status === 'Active').length;
  
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
            <StatCard label="Total Brands" value={BRANDS.length} color={theme.other.colors.magenta} icon={<FaLayerGroup color={theme.other.colors.magenta} />} onClick={() => nav('brands')} sub="Brands" />
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Total Devices" value={DEVICES.length} color={theme.other.colors.blue} icon={<FaSatelliteDish color={theme.other.colors.blue} />} onClick={() => nav('assets')} sub="View inventory" />
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Locations" value={9} color={theme.other.colors.lime} icon={<FaLocationArrow color={theme.other.colors.lime}/>} onClick={()=>nav('locations')}/>
          </Grid.Col>
          <Grid.Col span={3}>
            <StatCard label="Users" value={56} color={theme.other.colors.purple} icon={<FaUsers color={theme.other.colors.purple} />} onClick={() => nav('users')} />
          </Grid.Col>
        </Grid>
      
      <Grid align="stretch">
        <Grid.Col span={3}>
          <StatCard label="Active Devices" value={online} color={theme.other.colors.emerald} icon={<FaWifi color={theme.other.colors.emerald} />} onClick={() => nav('connectivity-online')} sub="Online now" />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Offline" value={offline} color={theme.other.colors.slate} icon={<RiWifiOffLine color={theme.other.colors.slate} />} onClick={() => nav('connectivity-offline')} />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Active Alerts" value={critical} color={theme.other.colors.red} icon={<AiFillAlert color={theme.other.colors.red} />} onClick={() => nav('alerts')} sub="Critical" />
        </Grid.Col>
        <Grid.Col span={3}>
          <StatCard label="Active Alerts" value={non_critical} color={theme.other.colors.amber} icon={<RiAlertFill color={theme.other.colors.amber} />} onClick={() => nav('alerts')} sub="Non-Critical" />
        </Grid.Col>
      </Grid>
      <Grid align="stretch">
        <Grid.Col span={6}>
          <TelemetryGraph data={telemetryData} title="Device Telemetry (24h)" />
        </Grid.Col>
        <Grid.Col span={6}>
          <SectionCard title="Alert Frequency (7d)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertFreqData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.dark[5]} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: theme.colors.dark[2] }} /><YAxis tick={{ fontSize: 10, fill: theme.colors.dark[2] }} />
              <Tooltip contentStyle={{ background: theme.colors.dark[7], border: 'none', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="Critical" stackId="a" fill={theme.other.colors.red} /><Bar dataKey="High" stackId="a" fill={theme.other.colors.orange} />
              <Bar dataKey="Medium" stackId="a" fill={theme.other.colors.amber} /><Bar dataKey="Low" stackId="a" fill={theme.other.colors.blue} radius={[4, 4, 0, 0]} />
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