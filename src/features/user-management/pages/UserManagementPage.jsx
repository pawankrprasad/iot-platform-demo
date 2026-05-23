import { useNavigate, useLocation } from 'react-router-dom';
import { PageHeader, Button } from '@components';
import { Tabs } from '@mantine/core';
import UserList from './UserList';
import RoleList from './RoleList';

const BASE = '/user-management';

const TABS = [
    { value: 'users',  label: 'Users',  addLabel: '+ Add User',  addPath: `${BASE}/users/add`,  content: <UserList /> },
    { value: 'roles',  label: 'Roles',  addLabel: '+ Add Role',  addPath: `${BASE}/roles/add`,  content: <RoleList /> },
];

/**
 * Main User Management list page — colocated inside the feature folder.
 * Active tab is derived from the URL so browser back/forward keeps tabs in sync.
 *   /user-management/users  → Users tab
 *   /user-management/roles  → Roles tab
 */
export default function UserManagementPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Derive tab from URL — no useState needed
    const tab = pathname.includes('/roles') ? 'roles' : 'users';

    const handleTabChange = (value) => {
        navigate(`/user-management/${value}`);
    };

    return (
        <div>
            <PageHeader
                title="User Management"
                sub="Manage users, roles, and permissions"
                crumbs={['Home', 'User Management', tab === 'users' ? 'Users' : 'Roles']}
                actions={
                    tab === 'users'
                        ? [<Button size="xs" key="add-user" onClick={() => navigate('/user-management/users/add')}>+ Add User</Button>]
                        : [<Button size="xs" key="add-role" onClick={() => navigate('/user-management/roles/add')}>+ Add Role</Button>]
                }
            />

            <Tabs value={tab} onChange={handleTabChange} mb="md">
                <Tabs.List mb="md">
                    <Tabs.Tab value="users">Users</Tabs.Tab>
                    <Tabs.Tab value="roles">Roles</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="users">
                    <UserList />
                </Tabs.Panel>

                <Tabs.Panel value="roles">
                    <RoleList />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}
