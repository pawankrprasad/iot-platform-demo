import HierarchyGrid from "../components/orgTree/HierarchyGrid";
import { PageHeader } from '../components';

const generateHierarchicalData  = {
    id:1,
    name:"Mass",
    parentId:null,
    level:1,
    children:[
            {
                id:2,
                name:"USA",
                parentId:1,
                level:2,
                lastChildren:false,
                children:[
                    {
                        id:4,
                        name:"New York",
                        parentId:2,
                        level:3,
                        lastChildren:false,
                        children:[
                                {
                                    id:1001,
                                    name:"Location A",
                                    parentId:4,
                                    level:4,
                                    lastChildren:true,
                                    children:[]
                                }
                        ]
                    },
                    {
                        id:5,
                        name:"Los Angeles",
                        parentId:2,
                        level:3,
                        lastChildren:true,
                        children:[
                                {
                                    id:6,
                                    name:"Location B",
                                    parentId:5,
                                    level:4,
                                    lastChildren:true,
                                    children:[
                                        {
                                            id:7,
                                            name:"Unit 1",
                                            parentId:6,
                                            level:5,
                                            lastChildren:false,
                                            children:[]
                                        },
                                        {
                                            id:100,
                                            name:"Unit 2",
                                            parentId:6,
                                            level:5,
                                            lastChildren:true,
                                            children:[]
                                        }
                                    ]
                                }
                        ]
                    }
                ]
            },
            {
                id:3,
                name:"UK",
                level:2,
                parentId:1,
                lastChildren:false,
                children:[
                    {
                        id:8,
                        name:"London",
                        level:3,
                        parentId:3,
                        lastChildren:false,
                        children:[
                                {
                                    id:9,
                                    name:"Location C",
                                    level:4,
                                    parentId:8,
                                    lastChildren:false,
                                    children:[]
                                },
                                {
                                    id:900,
                                    name:"Location D",
                                    level:4,
                                    parentId:8,
                                    lastChildren:true,
                                    children:[
                                        {
                                            id:900999,
                                            name:"Unit 3",
                                            level:5,
                                            parentId:900,
                                            lastChildren:false,
                                            children:[]
                                        },
                                        {
                                            id:900998,
                                            name:"Unit 4",
                                            level:5,
                                            parentId:900,
                                            lastChildren:true,
                                            children:[]
                                        }
                                    ]
                                }
                        ]
                    },
                    {
                        id:800,
                        name:"Manchester",
                        level:3,
                        parentId:3,
                        lastChildren:true,
                        children:[
                              {
                                    id:9090,
                                    name:"Location E",
                                    level:4,
                                    parentId:800,
                                    lastChildren:true,
                                    children:[]
                              } 
                        ]
                    }
                ]
            },
            {
                id:100001,
                name:"Germany",
                level:2,
                parentId:1,
                lastChildren:true,
                children:[]
            }
    ]
}

// No longer need to flatten the data - HierarchyGrid now accepts tree structure directly

console.log("Tree data for grid:", generateHierarchicalData);


export function OrgManagement() {
    
    return (
        <div>
            <PageHeader 
                title="Organization Management" 
                sub="Hierarchical view of organizational structure" 
                crumbs={['Home', 'Organization Management']}
            />
            <HierarchyGrid data={generateHierarchicalData} />
        </div>
    );
}