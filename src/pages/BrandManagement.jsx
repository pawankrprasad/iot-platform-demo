import { useTheme, styles } from '../context/ThemeContext';
import { Card, Btn, DataTable, PageHeader } from '../components';

const sampleBrands = [
  { id: 1, logo: '🏢', name: 'Brand A', totalDevices: 120, description: 'Leading IoT solutions provider' },
  { id: 2, logo: '🔧', name: 'Brand B', totalDevices: 80, description: 'Industrial automation experts' },
  { id: 3, logo: '⚡', name: 'Brand C', totalDevices: 200, description: 'Smart energy management' },
  { id: 4, logo: '🌐', name: 'Brand D', totalDevices: 50, description: 'Connected device specialists' },
];

export default function BrandManagement() {
  const { dark } = useTheme();
  
  return (
    <div>
      <PageHeader 
        title="Brand Management" 
        sub="Manage brands and their device integrations" 
        crumbs={['Home', 'Brand Management']}
      />
      <Card>
        <DataTable 
          cols={[
            { key: 'logo', label: 'Logo', render: (v) => <span style={{ fontSize: 24 }}>{v}</span> },
            { key: 'name', label: 'Brand Name' },
            { key: 'totalDevices', label: 'Total Devices', render: (v) => <span style={styles(dark).badge('#3b82f6')}>{v}</span> },
            { key: 'description', label: 'Description' },
            { 
              key: 'id', 
              label: 'Actions', 
              render: () => (
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="ghost">Edit</Btn>
                  
                </div>
              ) 
            }
          ]} 
          rows={sampleBrands} 
        />
      </Card>
    </div>
  );
}