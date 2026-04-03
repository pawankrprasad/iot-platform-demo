import HierarchyGrid from "../components/orgTree/HierarchyGrid";
import { PageHeader } from '../components';

/**
 * Generate large hierarchical data structure: Customer → Countries → Cities → Locations → Status
 * Total nodes: 661 (1 customer + 10 countries + 50 cities + 200 locations + 400 statuses)
 */
const generateHierarchicalData = () => {
    const data = [];
    let currentId = 1;
    
    // Root: Customer
    data.push({ id: currentId, title: "Global Corp", parentId: null });
    const customerId = currentId++;
    
    // Countries
    const countries = [
        "USA", "Canada", "UK", "Germany", "France", 
        "Japan", "Australia", "Brazil", "India", "China"
    ];
    const countryIds = {};
    
    countries.forEach(country => {
        data.push({ id: currentId, title: country, parentId: customerId });
        countryIds[country] = currentId++;
    });
    
    // Cities (5 per country)
    const cityNames = ["North", "South", "East", "West", "Central"];
    const cityIds = [];
    
    countries.forEach(country => {
        cityNames.forEach(cityName => {
            const title = `${cityName} ${country}`;
            data.push({ id: currentId, title, parentId: countryIds[country] });
            cityIds.push(currentId++);
        });
    });
    
    // Locations (4 per city)
    const locationTypes = ["Office", "Warehouse", "Store", "Hub"];
    const locationIds = [];
    
    cityIds.forEach(cityId => {
        locationTypes.forEach(locType => {
            const title = `${locType} ${cityId}`;
            data.push({ id: currentId, title, parentId: cityId });
            locationIds.push(currentId++);
        });
    });
    
    // Serial Numbers (2 per location)
    const statuses = ["Active", "Maintenance"];
    
    locationIds.forEach((locationId, index) => {
        statuses.forEach(status => {
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            data.push({ id: currentId, title: `SN-${randomNumber}`, parentId: locationId });
            currentId++;
        });
    });
    
    return data;
};

const hierarchicalData = generateHierarchicalData();

export function OrgManagement() {
    return (
        <div>
            <PageHeader 
                title="Organization Management" 
                sub="Hierarchical view of organizational structure" 
                crumbs={['Home', 'Organization Management']}
            />
            <HierarchyGrid data={hierarchicalData} />
        </div>
    );
}