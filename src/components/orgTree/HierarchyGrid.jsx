import React, { useState, useMemo } from "react";
import "./styles.css";

export default function HierarchyGrid({ data = [] }) {
    const COLUMNS = 5;
    
    const headers = ["Customer", "Country", "City", "Location", "Status"];
    const [expandedNodes, setExpandedNodes] = useState({});

    // Build hierarchical structure and create paths
    const gridData = useMemo(() => {
        if (!data.length) return [];
        
        // Create a map for quick lookup
        const nodeMap = new Map();
        data.forEach(item => {
            nodeMap.set(item.id, { ...item, children: [] });
        });
        
        // Build tree structure
        const roots = [];
        data.forEach(item => {
            const node = nodeMap.get(item.id);
            if (!item.parentId) {
                roots.push(node);
            } else {
                const parent = nodeMap.get(item.parentId);
                if (parent) {
                    parent.children.push(node);
                }
            }
        });
        
        // Generate all paths from root to leaf (or to any node)
        const paths = [];
        
        function generatePaths(node, currentPath = []) {
            const newPath = [...currentPath, node];
            
            // Check if this node is collapsed
            const isCollapsed = expandedNodes[node.id] === false;
            
            if (node.children.length === 0) {
                // Leaf node - add this path
                paths.push(newPath);
            } else if (isCollapsed) {
                // Collapsed node - add path with count node
                const countNode = {
                    id: `${node.id}-count`,
                    title: `count ${node.children.length}`,
                    isCountNode: true,
                    parentNodeId: node.id,
                    children: []
                };
                paths.push([...newPath, countNode]);
            } else {
                // Has children and expanded - recurse into each child
                node.children.forEach(child => {
                    generatePaths(child, newPath);
                });
            }
        }
        
        // Generate paths for all root nodes
        roots.forEach(root => generatePaths(root));
        
        // Convert paths to grid rows (pad to COLUMNS length)
        const grid = paths.map(path => {
            const row = new Array(COLUMNS).fill(null);
            path.forEach((node, idx) => {
                if (idx < COLUMNS) {
                    row[idx] = node;
                }
            });
            return row;
        });
        
        return grid;
    }, [data, expandedNodes]);

    const toggleNode = (nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: prev[nodeId] === false ? true : false
        }));
    };

    return (
        <div className="grid-wrapper">
            <div className="grid-header">
                {headers.map((header, idx) => (
                    <div key={idx} className="header-cell">
                        {header}
                    </div>
                ))}
            </div>
            <div className="grid-container">
                {gridData.map((row, rowIndex) => {
                    const previousRow = rowIndex > 0 ? gridData[rowIndex - 1] : null;
                    const nextRow = rowIndex < gridData.length - 1 ? gridData[rowIndex + 1] : null;
                    
                    return row.map((node, colIndex) => {
                        const isLastInRow = colIndex === COLUMNS - 1;
                        const hasChildren = node && !node.isCountNode && ((node.children && node.children.length > 0));
                        const isExpanded = node ? expandedNodes[node.id] !== false : false;
                        
                        // Check if this node is the same as the previous row's node at the same position
                        const isSameAsAbove = previousRow && 
                                             node && 
                                             previousRow[colIndex] && 
                                             previousRow[colIndex].id === node.id;
                        
                        // Check if this is the last child of its parent
                        // It's the last child if:
                        // 1. There's no next row (last row overall), OR
                        // 2. The next row has a different parent at the previous column level
                        let isLastChildOfParent = false;
                        if (node && colIndex > 0) {
                            const parentCol = colIndex - 1;
                            if (!nextRow) {
                                // Last row overall
                                isLastChildOfParent = true;
                            } else if (row[parentCol] && nextRow[parentCol]) {
                                // Next row has different parent
                                isLastChildOfParent = row[parentCol].id !== nextRow[parentCol].id;
                            } else if (row[parentCol] && !nextRow[parentCol]) {
                                // Next row doesn't have a parent at this level
                                isLastChildOfParent = true;
                            }
                        }
                        
                        // Empty cell or duplicate parent
                        if (!node || isSameAsAbove) {
                            return (
                                <div 
                                    key={`${rowIndex}-${colIndex}`} 
                                    className="grid-item"
                                >
                                    <div className="grid-box-wrapper"></div>
                                </div>
                            );
                        }
                        
                        return (
                            <div 
                                key={`${rowIndex}-${colIndex}`} 
                                className="grid-item"
                            >
                                <div className={`grid-box-wrapper ${isLastChildOfParent || node.isCountNode ? 'last-child' : ''}`}>
                                    <div 
                                        className={`grid-box ${node.isCountNode ? 'count-node' : ''}`}
                                        onClick={node.isCountNode ? () => toggleNode(node.parentNodeId) : undefined}
                                        style={node.isCountNode ? { cursor: 'pointer' } : undefined}
                                    >
                                        {node.title}
                                    </div>
                                    {!isLastInRow && hasChildren && !node.isCountNode && (
                                        <button 
                                            className="expand-btn"
                                            onClick={() => toggleNode(node.id)}
                                        >
                                            {isExpanded ? "−" : "+"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
}