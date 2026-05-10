import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, Button } from '@components';
import { Stepper, Grid, TextInput, Textarea, Text, Badge as MantineBadge, Group } from '@mantine/core';

export default function AddRole() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
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
            <PageHeader title="Add New Role" sub="Create a custom role with specific permissions" crumbs={['Home', 'User Management', 'Roles', 'Add Role']} actions={[<Button size='xs' onClick={() => navigate('/user-management/roles')}>Cancel</Button>]} />
            <Card>
                <Stepper active={step} onStepClick={setStep} mb="md">
                    <Stepper.Step label="Role Details" description="Name and description">
                        <Grid mt="sm">
                            <Grid.Col span={12}>
                                <TextInput
                                    label="Role Name"
                                    description="A unique name for this role"
                                    placeholder="e.g. Asset Auditor"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Textarea
                                    label="Description"
                                    description="What is this role for?"
                                    placeholder="Specify what this role is for..."
                                    rows={3}
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stepper.Step>
                    <Stepper.Step label="Permissions" description="Select access rights">
                        <Grid mt="sm" gutter="lg">
                            {modules.map(m => (
                                <Grid.Col span={12} key={m.id}>
                                    <Text fw={600} size="sm" mb="xs">{m.label}</Text>
                                    <Group gap="xs">
                                        {m.perms.map(p => {
                                            const active = form.permissions.includes(`${m.id}:${p}`);
                                            return (
                                                <MantineBadge
                                                    key={p}
                                                    variant={active ? 'filled' : 'outline'}
                                                    color={active ? 'default' : 'gray'}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => togglePerm(m.id, p)}
                                                >{p}</MantineBadge>
                                            );
                                        })}
                                    </Group>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Grid mt="sm">
                            <Grid.Col span={12}>
                                <Text size="sm" c="dimmed">Role Name</Text>
                                <Text fw={600}>{form.name || 'Unnamed Role'}</Text>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Text size="sm" c="dimmed">Description</Text>
                                <Text fw={600}>{form.description || 'No description provided'}</Text>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Text size="sm" c="dimmed" mb="xs">Permissions</Text>
                                <Group gap="xs">
                                    {form.permissions.length > 0
                                        ? form.permissions.map(p => <MantineBadge key={p} variant="light" color="default">{p.replace(':', ' - ')}</MantineBadge>)
                                        : <Text size="sm">No permissions selected</Text>}
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Stepper.Completed>
                </Stepper>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button variant="default"  onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/user-management/roles')}>Back</Button>
                    {step < 2 ? <Button onClick={() => setStep(s => s + 1)}>Next</Button> : <Button variant="success" onClick={() => navigate('/user-management/roles')}>Create Role</Button>}
                </div>
            </Card>
        </div>
    );
}
