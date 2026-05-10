import { useState } from 'react';
import { Card, Btn, Badge, PageHeader, Button } from '@components';
import { Stepper, Tabs, Grid, TextInput, Textarea, Select, Text, Badge as MantineBadge, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { USERS } from '../../../mock-data';
import RoleList from './RoleList';


const UserList = () => {
    const [tab, setTab] = useState('users');
    return (
        <Card>
            <DataTable
                columns={[
                    { accessor: 'name', title: 'Name' },
                    { accessor: 'email', title: 'Email' },
                    {
                        accessor: 'role', title: 'Role', render: (row) => (
                            <Badge variant='dark' label={row.role} />
                        )
                    },
                    { accessor: 'status', title: 'Status', render: (row) => <Badge label={row.status} /> },
                    { accessor: 'lastLogin', title: 'Last Login' },
                    {
                        accessor: 'id', title: 'Actions', render: () => (
                            <div style={{ display: 'flex', gap: 6 }}>
                                <Button size='xs' variant="ghost">Edit</Button>
                                <Button size='xs' variant="filled" color="red">Delete</Button>
                            </div>
                        )
                    },
                ]}
                records={USERS}
            />

        </Card>

    );
}

export default UserList;
