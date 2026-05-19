import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader, Stepper } from '../components';
import { REPORTS, DEVICES } from '../mock-data';

export function Reports({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    return (<div>
        <PageHeader title="Reports" sub="Generate, schedule, and download reports" crumbs={['Home', 'Reports']}
            actions={[<Btn key="g" onClick={() => nav('generate-report')}>+ Generate Report</Btn>, <Btn key="s" variant="ghost" onClick={() => nav('scheduled-reports')}>Scheduled</Btn>]} />
        <div style={st.grid(3)}><StatCard label="Generated" value={REPORTS.length} color="#3b82f6" icon="📄" /><StatCard label="Scheduled" value={2} color="#8b5cf6" icon="📅" /><StatCard label="Downloads" value={9} color="#10b981" icon="📥" /></div>
        <Card><div style={{ fontWeight: 600, marginBottom: 14 }}>Recent Reports</div>
            <DataTable cols={[
                { key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'generated', label: 'Generated' }, { key: 'format', label: 'Format' },
                { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge('#10b981')}>{v}</span> },
                { key: 'id', label: 'Actions', render: () => <div style={{ display: 'flex', gap: 6 }}><Btn variant="ghost">Download</Btn></div> }
            ]} rows={REPORTS} />
        </Card>
    </div>);
}

