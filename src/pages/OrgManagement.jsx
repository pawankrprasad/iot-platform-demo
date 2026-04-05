import { useState } from 'react';
import HierarchyGrid from "../components/orgTree/HierarchyGrid";
import { PageHeader, Btn } from '../components';
import { useTheme, styles } from '../context/ThemeContext';

// Simple Modal Component
const AddNodeModal = ({ isOpen, onClose, onConfirm, dark }) => {
    const [nodeName, setNodeName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nodeName.trim()) {
            onConfirm(nodeName.trim());
            setNodeName('');
        }
    };

    const st = styles(dark);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: dark ? '#1e2535' : '#ffffff',
                borderRadius: 12,
                padding: 24,
                width: '90%',
                maxWidth: 400,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }}>
                <h3 style={{ 
                    margin: '0 0 16px 0', 
                    color: dark ? '#f8fafc' : '#1e293b',
                    fontSize: 18,
                    fontWeight: 600
                }}>
                    Add New Node
                </h3>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ 
                            fontSize: 12, 
                            color: '#64748b', 
                            display: 'block', 
                            marginBottom: 6 
                        }}>
                            Node Name
                        </label>
                        <input
                            type="text"
                            value={nodeName}
                            onChange={(e) => setNodeName(e.target.value)}
                            placeholder="Enter node name"
                            autoFocus
                            style={st.input}
                        />
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        gap: 10, 
                        justifyContent: 'flex-end' 
                    }}>
                        <Btn 
                            variant="ghost" 
                            onClick={() => {
                                setNodeName('');
                                onClose();
                            }}
                            type="button"
                        >
                            Cancel
                        </Btn>
                        <Btn 
                            type="submit"
                            disabled={!nodeName.trim()}
                        >
                            Add Node
                        </Btn>
                    </div>
                </form>
            </div>
        </div>
    );
};

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
    const { dark } = useTheme();
    const [hierarchyData, setHierarchyData] = useState(generateHierarchicalData);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddNodeClick = () => {
        if (!selectedNode) return;
        // Don't allow adding nodes beyond Location level (level 4)
        if (selectedNode.level >= 5) return;
        setIsModalOpen(true);
    };

    const handleAddNode = (nodeName) => {
        if (!selectedNode) return;

        const newNode = {
            id: Date.now(),
            name: nodeName,
            parentId: selectedNode.id,
            level: selectedNode.level + 1,
            lastChildren: true,
            children: []
        };

        const addNodeToTree = (node) => {
            if (node.id === selectedNode.id) {
                // Update lastChildren flag for existing children
                if (node.children.length > 0) {
                    node.children[node.children.length - 1].lastChildren = false;
                }
                return {
                    ...node,
                    children: [...node.children, newNode],
                    hasChildren: true
                };
            }
            if (node.children && node.children.length > 0) {
                return {
                    ...node,
                    children: node.children.map(child => addNodeToTree(child))
                };
            }
            return node;
        };

        setHierarchyData(prevData => addNodeToTree(prevData));
        setIsModalOpen(false);
    };
    
    return (
        <div>
            <AddNodeModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleAddNode}
                dark={dark}
            />
            <PageHeader 
                title="Organization Management" 
                sub="Hierarchical view of organizational structure" 
                crumbs={['Home', 'Organization Management']}
                actions={[
                    <Btn 
                        key="add-node" 
                        onClick={handleAddNodeClick}
                        disabled={!selectedNode || selectedNode.level >= 5}
                        style={{ opacity: (selectedNode && selectedNode.level < 5) ? 1 : 0.5 }}
                    >
                        + Add Node
                    </Btn>
                ]}
            />
            <HierarchyGrid 
                data={hierarchyData} 
                onSelectedNodeChange={setSelectedNode}
            />
        </div>
    );
}