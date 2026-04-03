import HierarchyGrid from "../components/orgTree/HierarchyGrid";

// Example: Customer -> Countries -> Cities -> Locations -> Status
// Each row will show a complete path from Customer to Status
const hierarchicalData = [
    // Root: Customer
    { id: 1, title: "Acme Corp", parentId: null },
    
    // Level 1: Countries (children of Acme Corp)
    { id: 2, title: "USA", parentId: 1 },
    { id: 3, title: "Canada", parentId: 1 },
    { id: 4, title: "UK", parentId: 1 },
    
    // Level 2: Cities in USA
    { id: 5, title: "New York", parentId: 2 },
    { id: 6, title: "Los Angeles", parentId: 2 },
    
    // Level 2: Cities in Canada
    { id: 7, title: "Toronto", parentId: 3 },
    { id: 8, title: "Vancouver", parentId: 3 },
    
    // Level 2: Cities in UK
    { id: 9, title: "London", parentId: 4 },
    
    // Level 3: Locations in New York
    { id: 10, title: "Manhattan Office", parentId: 5 },
    { id: 11, title: "Brooklyn Hub", parentId: 5 },
    
    // Level 3: Locations in Los Angeles
    { id: 12, title: "Downtown LA", parentId: 6 },
    
    // Level 3: Locations in Toronto
    { id: 13, title: "Toronto Center", parentId: 7 },
    
    // Level 3: Locations in Vancouver
    { id: 14, title: "Vancouver Office", parentId: 8 },
    
    // Level 3: Locations in London
    { id: 15, title: "London Bridge", parentId: 9 },
    
    // Level 4: Status for each location
    { id: 16, title: "Active", parentId: 10 },
    { id: 17, title: "Active", parentId: 11 },
    { id: 18, title: "Pending", parentId: 12 },
    { id: 19, title: "Active", parentId: 13 },
    { id: 20, title: "Active", parentId: 14 },
    { id: 21, title: "Inactive", parentId: 15 },
];

export function OrgManagement() {
    return (
        <div>
            <h1 style={{ padding: '20px', color: 'white' }}>Organization Hierarchy</h1>
            <HierarchyGrid data={hierarchicalData} />
        </div>
    );
}