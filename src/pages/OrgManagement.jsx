import HierarchyGrid from "../components/orgTree/HierarchyGrid";

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
    
    // Status (2 per location)
    const statuses = ["Active", "Maintenance"];
    
    locationIds.forEach((locationId, index) => {
        statuses.forEach(status => {
            data.push({ id: currentId, title: status, parentId: locationId });
            currentId++;
        });
    });
    
    return data;
};

const hierarchicalData = generateHierarchicalData();

export function OrgManagement() {
    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "rgb(20, 27, 43)",
            color: "white"
        }}>
            <h1 style={{ 
                padding: "20px", 
                margin: 0,
                fontSize: "24px",
                fontWeight: 600
            }}>
                Organization Hierarchy
            </h1>
            <HierarchyGrid data={hierarchicalData} />
        </div>
    );
}