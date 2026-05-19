import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { StatCard, Card, Btn, DataTable, PageHeader, Stepper } from '../components';
import { REPORTS, DEVICES } from '../mock-data';


export function GenerateReport({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [step, setStep] = useState(1);
    const [tab, setTab] = useState('units');
    return (<div>
        <PageHeader title="Generate Report" sub="Configure a new report" crumbs={['Home', 'Reports', 'Generate']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('reports')}>Cancel</Btn>]} />
        <Stepper steps={['Report Type', 'Filters', 'Select Targets', 'Preview']} current={step} />
        <Card>
            {step === 1 && <div style={st.grid(2)}>{['Device Status', 'Alert Summary', 'Performance', 'Connectivity', 'Firmware Audit', 'Custom'].map(t => <div key={t} style={{ border: '2px solid ' + (dark ? '#3b82f640' : '#bfdbfe'), borderRadius: 8, padding: 14, cursor: 'pointer' }} onClick={() => setStep(2)}><div style={{ fontWeight: 600 }}>{t}</div><div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>Generate report</div></div>)}</div>}
            {step === 2 && <div style={st.grid(2)}>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Date Range</label><select style={{ ...st.select, width: '100%' }}><option>Last 7 days</option><option>Last 30 days</option></select></div>

                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Format</label><select style={{ ...st.select, width: '100%' }}><option>CSV</option><option>XLSX</option></select></div>
                <div style={{ gridColumn: 'span 2' }}><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Recipients</label><input style={st.input} placeholder="email@example.com" /></div>
            </div>}
            {step === 3 &&
                <div>
                    <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
                        {['units', 'tags', 'fleets'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
                    </div>

                    <div style={{ maxHeight: 280, overflowY: 'auto' }}>


                        {tab === 'units' && DEVICES.map(d => <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9'), fontSize: 12.5 }}><input type="checkbox" />{d.id}</div>)}
                        {tab === 'fleets' && ['Fleet A (8 devices)', 'Fleet B (6 devices)', 'Fleet C (10 devices)'].map(f => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') }}><input type="checkbox" /><span>{f}</span></div>)}
                        {tab === 'tags' && ['production', 'floor1', 'floor2', 'warehouse', 'test'].map(t => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') }}><input type="checkbox" /><span style={styles(dark).badge('#8b5cf6')}>{t}</span></div>)}

                    </div>
                </div>

            }



            {step === 4 && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 16, fontSize: 12.5 }}><p>Type: <strong>Device Status</strong></p><p>Range: <strong>Last 7 days</strong></p><p>Format: <strong>PDF</strong></p><p>Units: <strong>{DEVICES.length}</strong></p></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <Btn variant="ghost" onClick={() => step > 1 ? setStep(s => s - 1) : nav('reports')}>Back</Btn>
                {step < 4 ? <Btn onClick={() => setStep(s => s + 1)}>Next</Btn> : <Btn variant="success" onClick={() => nav('reports')}>Generate</Btn>}
            </div>
        </Card>
    </div>);
}
