import HierarchyGrid from "../components/orgTree/HierarchyGrid";

const data = {
    id: "customer-1",
    name: "Test Company",
    children: [
        {
            id: "country-1",
            name: "India",
            children: [
                {
                    id: "city-1",
                    name: "Delhi",
                    children: [
                        {
                            id: "office-1",
                            name: "North Delhi Office",
                            children: [
                                {
                                    id: "dept-1",
                                    name: "Sales Department"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "country-2",
            name: "Canada",
            children: [
                {
                    id: "city-2",
                    name: "Toronto",
                    children: [
                        {
                            id: "office-2",
                            name: "Downtown Hub",
                            children: [
                                {
                                    id: "dept-2",
                                    name: "Engineering Team"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};


export function OrgManagement() {
    return <HierarchyGrid data={data} />;
}