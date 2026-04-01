import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader } from '../components';
import { FILES, DEVICES } from '../mock-data';

export function FileManagement({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [tab, setTab] = useState('library'); const [cat, setCat] = useState('All');
    const cats = ['All', 'Firmware', 'Config', 'Menu', 'Media'];
    const filtered = cat === 'All' ? FILES : FILES.filter(f => f.category === cat);
    return (<div>
        <PageHeader title="File Management" sub="Upload, manage, and deploy files" crumbs={['Home', 'Files']} actions={[<Btn key="u" onClick={() => nav('upload-file')}>Upload File</Btn>]} />
        <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
            {['library', 'transfers', 'history'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
        </div>
        {tab === 'library' && <Card>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>{cats.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid ' + (cat === c ? '#3b82f6' : dark ? '#ffffff18' : '#e2e8f0'), background: cat === c ? '#3b82f6' : 'transparent', color: cat === c ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12 }}>{c}</button>)}</div>
            <DataTable cols={[
                { key: 'name', label: 'Filename' }, { key: 'category', label: 'Category', render: v => <span style={styles(dark).badge('#8b5cf6')}>{v}</span> },
                { key: 'version', label: 'Version' }, { key: 'size', label: 'Size' }, { key: 'uploaded', label: 'Uploaded' },
                { key: 'id', label: 'Actions', render: () => <div style={{ display: 'flex', gap: 6 }}><Btn variant="ghost" onClick={() => nav('select-targets')}>Deploy</Btn><Btn variant="ghost">Download</Btn></div> }
            ]} rows={filtered} />
        </Card>}
        {tab === 'transfers' && <Card><DataTable cols={[
            { key: 'file', label: 'File' }, { key: 'device', label: 'Target' },
            { key: 'progress', label: 'Progress', render: v => <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 100, height: 6, background: dark ? '#2d3748' : '#e2e8f0', borderRadius: 3 }}><div style={{ width: v + '%', height: '100%', background: '#3b82f6', borderRadius: 3 }} /></div><span style={{ fontSize: 11 }}>{v}%</span></div> },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Success' ? '#10b981' : v === 'Failed' ? '#ef4444' : v === 'In Progress' ? '#3b82f6' : '#64748b')}>{v}</span> }
        ]} rows={[
            { file: 'firmware_v3.2.bin', device: 'DEV-1001', progress: 100, status: 'Success' },
            { file: 'config_production.json', device: 'DEV-1003', progress: 65, status: 'In Progress' },
            { file: 'menu_v2.xml', device: 'DEV-1005', progress: 0, status: 'Pending' },
            { file: 'app_installer.apk', device: 'DEV-1007', progress: 0, status: 'Failed' }
        ]} /></Card>}
        {tab === 'history' && <Card><DataTable cols={[
            { key: 'file', label: 'File' }, { key: 'target', label: 'Target' }, { key: 'date', label: 'Date' },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(v === 'Success' ? '#10b981' : '#ef4444')}>{v}</span> }
        ]} rows={[
            { file: 'firmware_v3.1.bin', target: 'Fleet A', date: '2d ago', status: 'Success' },
            { file: 'config_v1.4.json', target: 'Acme Corp', date: '5d ago', status: 'Success' },
            { file: 'media_pack_q4.zip', target: 'Floor 1', date: '1w ago', status: 'Failed' }
        ]} /></Card>}
    </div>);
}

export function UploadFile({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [drag, setDrag] = useState(false);
    return (<div>
        <PageHeader title="Upload File" crumbs={['Home', 'Files', 'Upload']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('files')}>Cancel</Btn>]} />
        <Card>
            <div onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={() => setDrag(false)}
                style={{ border: '2px dashed ' + (drag ? '#3b82f6' : dark ? '#ffffff20' : '#e2e8f0'), borderRadius: 10, padding: '40px 20px', textAlign: 'center', marginBottom: 20, transition: 'all .2s' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Drag and drop files here</div>
                <div style={{ color: '#64748b', fontSize: 12.5, marginBottom: 12 }}>or click to browse</div>
                <Btn>Browse Files</Btn>
            </div>
            <div style={st.grid(2)}>

                <div>
                    <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Brand</label>
                    <select style={{ ...st.select, width: '100%' }}>
                        <option>Generic</option>
                        <option>Brand A</option>
                        <option>Brand B</option>
                    </select>
                </div>
                <div>
                    <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Model</label>
                    <select style={{ ...st.select, width: '100%' }}>
                        <option>All Models</option>
                        <option>Model X</option>
                        <option>Model Y</option>
                    </select>
                </div>


                <div>
                    <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Category</label>
                    <select style={{ ...st.select, width: '100%' }}>
                        <option>Firmware</option>
                        <option>Config</option>
                        <option>Menu</option>
                        <option>Media</option>
                        <option>Software</option>
                    </select>
                </div>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Version</label><input style={st.input} placeholder="e.g. 3.2.1" /></div>
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Name</label>
                    <input style={st.input} placeholder="Name this file..." />
                </div>
                <div style={{ gridColumn: 'span 2' }}><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Description</label><input style={st.input} placeholder="Describe this file..." /></div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Btn variant="ghost" onClick={() => nav('files')}>Cancel</Btn><Btn onClick={() => nav('files')}>Upload</Btn>
            </div>
        </Card>
    </div>);
}

export function SelectTargets({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [tab, setTab] = useState('units');
    return (<div>
        <PageHeader title="Select Targets" sub="Choose devices for deployment" crumbs={['Home', 'Files', 'Deploy', 'Targets']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('files')}>Back</Btn>]} />
        <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
            {['units', 'tags', 'fleets'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
        </div>
        <Card>
            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {tab === 'units' && DEVICES.map(d => <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9'), fontSize: 12.5 }}><input type="checkbox" /><strong>{d.id}</strong><span style={{ color: '#64748b' }}>{d.model}</span><div style={{ marginLeft: 'auto' }}><span style={styles(dark).badge(styles(dark).statusColor[d.status])}>{d.status}</span></div></div>)}
                {tab === 'fleets' && ['Fleet A (8 devices)', 'Fleet B (6 devices)', 'Fleet C (10 devices)'].map(f => <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') }}><input type="checkbox" /><span>{f}</span></div>)}
                {tab === 'tags' && ['production', 'floor1', 'floor2', 'warehouse', 'test'].map(t => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') }}><input type="checkbox" /><span style={styles(dark).badge('#8b5cf6')}>{t}</span></div>)}

            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}><Btn variant="ghost" onClick={() => nav('files')}>Cancel</Btn><Btn onClick={() => nav('files')}>Schedule Transfer</Btn></div>
        </Card>
    </div>);
}
