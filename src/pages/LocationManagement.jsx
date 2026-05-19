import { Card, PageHeader } from '../components';
import { DataTable } from 'mantine-datatable';
import { Paper, ActionIcon } from '@mantine/core';
import { FiEye } from 'react-icons/fi';
import { Badge } from '@components';

const sampleLocations = [
  { id: 1, name: 'New York Headquarters', address: '123 Main St, New York, NY 10001', deviceCount: 145, status: 'Active' },
  { id: 2, name: 'San Francisco Office', address: '456 Market St, San Francisco, CA 94102', deviceCount: 89, status: 'Active' },
  { id: 3, name: 'London Branch', address: '789 Oxford St, London, UK W1D 2HG', deviceCount: 67, status: 'Active' },
  { id: 4, name: 'Tokyo Center', address: '321 Shibuya, Tokyo, Japan 150-0002', deviceCount: 112, status: 'Active' },
  { id: 5, name: 'Berlin Hub', address: '654 Unter den Linden, Berlin, Germany 10117', deviceCount: 78, status: 'Active' },
  { id: 6, name: 'Singapore Facility', address: '987 Marina Bay, Singapore 018956', deviceCount: 134, status: 'Active' },
  { id: 7, name: 'Sydney Warehouse', address: '147 George St, Sydney, NSW 2000', deviceCount: 56, status: 'Inactive' },
  { id: 8, name: 'Toronto Plant', address: '258 Bay St, Toronto, ON M5H 2Y4', deviceCount: 91, status: 'Active' },
  { id: 9, name: 'Dubai Station', address: '369 Sheikh Zayed Rd, Dubai, UAE', deviceCount: 103, status: 'Active' },
];

export default function LocationManagement() {
  const handleViewLocation = (location) => {
    alert(`Viewing details for: ${location.name}`);
  };

  return (
    <div>
      <PageHeader
        title="Location Management"
        sub="Manage locations and monitor device deployments"
        crumbs={['Home', 'Location Management']}
      />
      <Card withBorder radius="md">
        <DataTable
          columns={[
            { accessor: 'name', title: 'Location Name' },
            { accessor: 'address', title: 'Address' },
            {
              accessor: 'deviceCount',
              title: 'Device Count',
              render: ({ deviceCount }) => (
                <Badge label={deviceCount} color="dark.4" variant="light" />
              ),
            },
            {
              accessor: 'status',
              title: 'Status',
              render: ({ status }) => (
                <Badge label={status} />
              ),
            },
            {
              accessor: 'id',
              title: 'Actions',
              width: 80,
              render: (row) => (
                <ActionIcon variant="subtle" color="gray" onClick={() => handleViewLocation(row)}>
                  <FiEye size={15} />
                </ActionIcon>
              ),
            },
          ]}
          records={sampleLocations}
          withTableBorder={false}
          verticalSpacing="xs"
        />
      </Card>
    </div>
  );
}
