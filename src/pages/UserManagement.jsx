import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader, Stepper } from '../components';
import { USERS } from '../mock-data';

export function UserManagement({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [tab, setTab] = useState('users');
    return (<div>
        <PageHeader title="User Management" sub="Manage users, roles, and permissions" crumbs={['Home', 'Users']}
            actions={tab === 'users' ? [<Btn key="a" onClick={() => nav('add-user')}>+ Add User</Btn>] : [<Btn key="r" onClick={() => nav('add-role')}>+ Add Role</Btn>]} />
        <div style={{ display: 'flex', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), marginBottom: 16 }}>
            {['users', 'roles'].map(t => <button key={t} style={st.tab(tab === t)} onClick={() => setTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
        </div>
        {tab === 'users' && <Card><DataTable cols={[
            { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role', render: v => <span style={styles(dark).badge(v === 'Admin' ? '#ef4444' : v === 'Customer' ? '#3b82f6' : '#64748b')}>{v}</span> },
            { key: 'status', label: 'Status', render: v => <span style={styles(dark).badge(styles(dark).statusColor[v])}>{v}</span> },
            { key: 'lastLogin', label: 'Last Login' }, { key: 'id', label: 'Actions', render: () => <div style={{ display: 'flex', gap: 6 }}><Btn variant="ghost">Edit</Btn><Btn variant="danger">Delete</Btn></div> }
        ]} rows={USERS} /></Card>}
        {tab === 'roles' && <Card><DataTable cols={[
            { key: 'name', label: 'Role' }, { key: 'users', label: 'Users' }, { key: 'permissions', label: 'Permissions' },
            { key: 'id', label: 'Actions', render: () => <Btn variant="ghost">Edit</Btn> }
        ]} rows={[
            { id: 1, name: 'Admin', users: 2, permissions: 'Full access' }, { id: 2, name: 'Customer', users: 2, permissions: 'View devices, alerts' },
            { id: 3, name: 'Viewer', users: 1, permissions: 'Read-only' }, { id: 4, name: 'Fleet Manager', users: 0, permissions: 'Manage fleets' }
        ]} /></Card>}
    </div>);
}

export function AddUser({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [step, setStep] = useState(1); const [roleMode, setRoleMode] = useState('existing');
    return (<div>
        <PageHeader title="Add New User" sub="Onboard a new user" crumbs={['Home', 'Users', 'Add User']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('users')}>Cancel</Btn>]} />
        <Stepper steps={['User Details', 'Role Assignment', 'Review']} current={step} />
        <Card>
            {step === 1 && <div style={st.grid(2)}>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>First Name</label><input style={st.input} placeholder="John" /></div>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Last Name</label><input style={st.input} placeholder="Doe" /></div>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Email</label><input style={st.input} placeholder="john@company.com" /></div>
                <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Phone Number</label><input style={st.input} placeholder="+1 555 000 0000" /></div>
            </div>}
            {step === 2 && <>
                <div style={{ fontWeight: 600, marginBottom: 16 }}>Role Assignment</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    {['default', 'existing'].map(m => <button key={m} onClick={() => setRoleMode(m)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid ' + (roleMode === m ? '#3b82f6' : dark ? '#ffffff18' : '#e2e8f0'), background: roleMode === m ? '#3b82f6' : 'transparent', color: roleMode === m ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12 }}>{m === 'default' ? 'Default Role' : m === 'existing' ? 'Existing Role' : 'Create New'}</button>)}
                </div>
                {roleMode === 'existing' && <select style={{ ...st.select, width: '100%', maxWidth: 300 }}><option>Admin</option><option>Customer</option><option>Viewer</option><option>Fleet Manager</option></select>}
                {roleMode === 'default' && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 12, fontSize: 12.5 }}>Default role <strong>Viewer</strong> will be assigned.</div>}

            </>}
            {step === 3 && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 16, fontSize: 12.5 }}><p>Name: <strong>John Doe</strong></p><p>Email: <strong>john@company.com</strong></p><p>Org: <strong>Org Alpha</strong></p><p>Role: <strong>{roleMode === 'new' ? 'New Role' : 'Customer'}</strong></p></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <Btn variant="ghost" onClick={() => step > 1 ? setStep(s => s - 1) : nav('users')}>Back</Btn>
                {step < 3 ? <Btn onClick={() => setStep(s => s + 1)}>Next</Btn> : <Btn variant="success" onClick={() => nav('users')}>Create User</Btn>}
            </div>
        </Card>
    </div>);
}

export function AddRole({ nav }) {
    const { dark } = useTheme(); const st = styles(dark);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', description: '', permissions: [] });

    const modules = [
        { id: 'assets', label: 'Asset Management', perms: ['Read', 'Write', 'Delete', 'Export'] },
        { id: 'alerts', label: 'Alerts & Analytics', perms: ['Read', 'Acknowledge', 'Delete'] },
        { id: 'files', label: 'File Management', perms: ['Read', 'Upload', 'Deploy', 'Delete'] },
        { id: 'users', label: 'User Management', perms: ['Read', 'Write', 'Delete'] },
    ];

    const togglePerm = (modId, perm) => {
        const key = `${modId}:${perm}`;
        setForm(f => ({
            ...f,
            permissions: f.permissions.includes(key)
                ? f.permissions.filter(p => p !== key)
                : [...f.permissions, key]
        }));
    };

    return (
        <div>
            <PageHeader title="Add New Role" sub="Create a custom role with specific permissions" crumbs={['Home', 'Users', 'Add Role']} actions={[<Btn key="b" variant="ghost" onClick={() => nav('users')}>Cancel</Btn>]} />
            <Stepper steps={['Role Details', 'Permissions', 'Review']} current={step} />
            <Card>
                {step === 1 && <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Role Name</label><input style={st.input} placeholder="e.g. Asset Auditor" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                    <div><label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 4 }}>Description</label><textarea style={{ ...st.input, height: 80, resize: 'none' }} placeholder="Specify what this role is for..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                </div>}
                {step === 2 && <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {modules.map(m => (
                        <div key={m.id}>
                            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: dark ? '#f8fafc' : '#1e293b' }}>{m.label}</div>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                {m.perms.map(p => {
                                    const active = form.permissions.includes(`${m.id}:${p}`);
                                    return (
                                        <button key={p} onClick={() => togglePerm(m.id, p)} style={{
                                            padding: '6px 12px', borderRadius: 6, border: '1px solid ' + (active ? '#3b82f6' : dark ? '#ffffff10' : '#e2e8f0'),
                                            background: active ? '#3b82f6' : 'transparent', color: active ? '#fff' : dark ? '#94a3b8' : '#4a5568',
                                            cursor: 'pointer', fontSize: 11.5
                                        }}>{p}</button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>}
                {step === 3 && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 16, fontSize: 12.5 }}>
                    <p><span style={{ color: '#64748b' }}>Role Name:</span> <strong>{form.name || 'Unnamed Role'}</strong></p>
                    <p><span style={{ color: '#64748b' }}>Description:</span> <strong>{form.description || 'No description provided'}</strong></p>
                    <p style={{ marginTop: 12, marginBottom: 6, color: '#64748b' }}>Permissions:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {form.permissions.length > 0 ? form.permissions.map(p => (
                            <span key={p} style={styles(dark).badge('#3b82f6')}>{p.replace(':', ' - ')}</span>
                        )) : <strong>No permissions selected</strong>}
                    </div>
                </div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Btn variant="ghost" onClick={() => step > 1 ? setStep(s => s - 1) : nav('users')}>Back</Btn>
                    {step < 3 ? <Btn onClick={() => setStep(s => s + 1)}>Next</Btn> : <Btn variant="success" onClick={() => nav('users')}>Create Role</Btn>}
                </div>
            </Card>
        </div>
    );
}
