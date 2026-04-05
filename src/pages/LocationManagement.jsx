import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader } from '../components';

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
  const { dark } = useTheme();
  
  const handleViewLocation = (location) => {
    alert(`Viewing details for: ${location.name}`);
  };
  
  return (
    <div>
      <PageHeader 
        title="Location Management" 
        sub="Manage locations and monitor device deployments" 
        crumbs={['Home', 'Location Management']}
        actions={[
          <Btn key="add" onClick={() => alert('Add New Location functionality coming soon!')}>
            + Add Location
          </Btn>
        ]} 
      />
      <Card>
        <DataTable 
          cols={[
            { key: 'name', label: 'Location Name' },
            { key: 'address', label: 'Address' },
            { 
              key: 'deviceCount', 
              label: 'Device Count', 
              render: (v) => <span style={styles(dark).badge('#3b82f6')}>{v}</span> 
            },
            { 
              key: 'status', 
              label: 'Status', 
              render: (v) => <span style={styles(dark).badge(v === 'Active' ? '#10b981' : '#64748b')}>{v}</span> 
            },
            { 
              key: 'id', 
              label: 'Actions', 
              render: (_, row) => (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="ghost" onClick={() => handleViewLocation(row)}>View</Btn>
                </div>
              ) 
            }
          ]} 
          rows={sampleLocations} 
        />
      </Card>
    </div>
  );
}
