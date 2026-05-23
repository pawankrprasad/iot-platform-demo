import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader } from '../components';


export function ScheduledReports({ nav }) {
    const { dark } = useTheme();
    return (<div>
        <PageHeader title="Scheduled Reports" crumbs={['Home', 'Reports', 'Scheduled']} actions={[<Btn key="a">+ Create</Btn>, <Btn key="b" variant="ghost" onClick={() => nav('reports')}>Back</Btn>]} />
        <Card><DataTable cols={[
            { key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'frequency', label: 'Frequency' }, { key: 'next', label: 'Next Run' },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Active' ? '#10b981' : '#64748b')}>{v}</span> }
        ]} rows={[
            { name: 'Weekly Device', type: 'Device Status', frequency: 'Weekly', next: 'Mon 8:00 AM', status: 'Active' },
            { name: 'Monthly Alerts', type: 'Alert Summary', frequency: 'Monthly', next: '1st of month', status: 'Active' },
            { name: 'Daily Fleet', type: 'Performance', frequency: 'Daily', next: 'Tomorrow 7AM', status: 'Paused' }
        ]} /></Card>
    </div>);
}
