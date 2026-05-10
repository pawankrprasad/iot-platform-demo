import { useState } from 'react';
import { Card, Btn, Badge, PageHeader, Button } from '@components';
import { Stepper, Tabs, Grid, TextInput, Textarea, Select, Text, Badge as MantineBadge, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { USERS } from '../../../mock-data';

const RoleList = () => {

    return (
        <Card>
            <DataTable
                columns={[
                    { accessor: 'name', title: 'Role' },
                    { accessor: 'users', title: 'Users' },
                    { accessor: 'permissions', title: 'Permissions' },
                    { accessor: 'id', title: 'Actions', render: () => <Button size='xs' variant="ghost">Edit</Button> },
                ]}
                records={[
                    { id: 1, name: 'Admin', users: 2, permissions: 'Full access' },
                    { id: 2, name: 'Customer', users: 2, permissions: 'View devices, alerts' },
                    { id: 3, name: 'Viewer', users: 1, permissions: 'Read-only' },
                    { id: 4, name: 'Fleet Manager', users: 0, permissions: 'Manage fleets' },
                ]}
            />
        </Card>
    )
}

export default RoleList;