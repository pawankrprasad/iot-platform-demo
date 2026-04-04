import HierarchyGrid from "../components/orgTree/HierarchyGrid";
import { PageHeader } from '../components';

const generateHierarchicalData  = {
    id:1,
    name:"Mass",
    parentId:null,
    level:1,
    childrens:[
            {
                id:2,
                name:"Mass1",
                parentId:1,
                level:2,
                childrens:[
                    {
                        id:4,
                        name:"Mass1.1",
                        parentId:2,
                        level:3,
                        childrens:[
                                {
                                    id:1001,
                                    name:"Mass1.1.1",
                                    parentId:4,
                                    level:4,
                                    childrens:[]
                                }
                        ]
                    },
                    {
                        id:5,
                        name:"Mass1.2",
                        parentId:2,
                        level:3,
                        childrens:[
                                {
                                    id:6,
                                    name:"Mass1.2.1",
                                    parentId:5,
                                    level:4,
                                    childrens:[
                                        {
                                            id:7,
                                            name:"Mass1.2.1.1",
                                            parentId:6,
                                            level:5,
                                            childrens:[]
                                        },
                                        {
                                            id:100,
                                            name:"X1",
                                            parentId:6,
                                            level:5,
                                            childrens:[]
                                        }
                                    ]
                                }
                        ]
                    }
                ]
            },
            {
                id:3,
                name:"Mass2",
                level:2,
                parentId:1,
                childrens:[
                    {
                        id:8,
                        name:"Mass2.1",
                        level:3,
                        parentId:3,
                        childrens:[
                                {
                                    id:9,
                                    name:"Mass2.1.1",
                                    level:4,
                                    parentId:8,
                                    childrens:[]
                                },
                                {
                                    id:900,
                                    name:"Mass2.1.2",
                                    level:4,
                                    parentId:8,
                                    childrens:[]
                                }
                        ]
                    },
                    {
                        id:800,
                        name:"Mass2.2",
                        level:3,
                        parentId:3,
                        childrens:[
                               
                        ]
                    }
                ]
            },
            {
                id:100001,
                name:"Mass3",
                level:2,
                parentId:1,
                childrens:[]
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