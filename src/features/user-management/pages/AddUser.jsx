import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, styles } from '@context/ThemeContext';
import { PageHeader, Card, Button } from '@components';
import { Stepper, Grid, TextInput, Select } from '@mantine/core';

export default function AddUser() {
    const navigate = useNavigate();
    const { dark } = useTheme();
    const st = styles(dark);
    const [step, setStep] = useState(0);
    const [roleMode, setRoleMode] = useState('existing');
    const [roleValue, setRoleValue] = useState('Customer');
    return (<div>
        <PageHeader title="Add New User" sub="Onboard a new user" crumbs={['Home', 'User Management', 'Users', 'Add User']} actions={[<Button size='xs' onClick={() => navigate('/user-management/users')}>Cancel</Button>]} />
        <Card>
        <Stepper active={step} onStepClick={setStep} mb="md">
            <Stepper.Step label="User Details" description="Basic information">
                <Grid mt="sm">
                    <Grid.Col span={6}>
                        <TextInput label="First Name" placeholder="John" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Last Name" placeholder="Doe" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Email" placeholder="john@company.com" type="email" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Phone Number" placeholder="+1 555 000 0000" />
                    </Grid.Col>
                </Grid>
            </Stepper.Step>
            <Stepper.Step label="Role Assignment" description="Assign a role">
                <div style={{ fontWeight: 600, marginBottom: 16 }}>Role Assignment</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    {['default', 'existing'].map(m => <button key={m} onClick={() => setRoleMode(m)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid ' + (roleMode === m ? '#3b82f6' : dark ? '#ffffff18' : '#e2e8f0'), background: roleMode === m ? '#3b82f6' : 'transparent', color: roleMode === m ? '#fff' : dark ? '#94a3b8' : '#4a5568', cursor: 'pointer', fontSize: 12 }}>{m === 'default' ? 'Default Role' : 'Existing Role'}</button>)}
                </div>
                {roleMode === 'existing' && 
                    <Select
                        label="Assign Role"
                        placeholder="Select a role"
                        value={roleValue}
                        onChange={setRoleValue}
                        data={['Admin', 'Customer', 'Viewer', 'Fleet Manager']}
                        style={{ maxWidth: 300 }}
                    />
                }
                {roleMode === 'default' && <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 12, fontSize: 12.5 }}>Default role <strong>Viewer</strong> will be assigned.</div>}
            </Stepper.Step>
            <Stepper.Completed>
                <div style={{ background: dark ? '#0f1117' : '#f8fafc', borderRadius: 8, padding: 16, fontSize: 12.5 }}>
                    <p>Name: <strong>John Doe</strong></p>
                    <p>Email: <strong>john@company.com</strong></p>
                    <p>Org: <strong>Org Alpha</strong></p>
                    <p>Role: <strong>{roleMode === 'default' ? 'Viewer' : 'Customer'}</strong></p>
                </div>
            </Stepper.Completed>
        </Stepper>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Button size='sm' variant="default" onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/user-management/users')}>Back</Button>
            {step < 2 ? <Button size='sm' onClick={() => setStep(s => s + 1)}>Next</Button> : <Button variant="success" onClick={() => navigate('/user-management/users')}>Create User</Button>}
        </div>
        </Card>
    </div>);
}