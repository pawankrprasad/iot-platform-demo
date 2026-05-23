import { Card, PageHeader , Badge} from '@components';
import { DataTable } from 'mantine-datatable';
import { ActionIcon, Text } from '@mantine/core';
import { FiEdit2 } from 'react-icons/fi';

const sampleBrands = [
  { id: 1, logo: '🏢', name: 'Brand A', totalDevices: 120, description: 'Leading IoT solutions provider' },
  { id: 2, logo: '🔧', name: 'Brand B', totalDevices: 80,  description: 'Industrial automation experts' },
  { id: 3, logo: '⚡', name: 'Brand C', totalDevices: 200, description: 'Smart energy management' },
  { id: 4, logo: '🌐', name: 'Brand D', totalDevices: 50,  description: 'Connected device specialists' },
];

export default function BrandManagement() {
  return (
    <div>
      <PageHeader
        title="Brand Management"
        sub="Manage brands and their device integrations"
        crumbs={['Home', 'Brand Management']}
      />
      <Card>
        <DataTable
          columns={[
            {
              accessor: 'logo',
              title: 'Logo',
              width: 70,
              render: ({ logo }) => <Text fz={16}>{logo}</Text>,
            },
            { accessor: 'name', title: 'Brand Name' },
            {
              accessor: 'totalDevices',
              title: 'Total Devices',
              render: ({ totalDevices }) => (
                <Badge label={totalDevices} color="dark" variant="light" />
              ),
            },
            { accessor: 'description', title: 'Description' },
            {
              accessor: 'id',
              title: 'Actions',
              width: 80,
              render: () => (
                <ActionIcon variant="subtle" color="gray">
                  <FiEdit2 size={15} />
                </ActionIcon>
              ),
            },
          ]}
          records={sampleBrands}
          withTableBorder={false}
          
        />
      </Card>
    </div>
  );
}