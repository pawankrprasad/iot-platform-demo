import { useState, useMemo, useCallback } from "react";
import "./styles.css";
import GridHeader from "./OrgHeader";
import EmptyCell from "./EmptyCell";
import NodeCell from "./NodeCell";


export default function HierarchyGrid({ data = null, onSelectedNodeChange = null }) {
    // Constants
    const COLUMNS = 5;
    const headers = ["Customer", "Country", "City", "Location", "Unit"];
    
    // State
    const [expandedNodes, setExpandedNodes] = useState({});
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    // Utilities
    const buildClassName = useCallback((...classes) => {
        return classes.filter(Boolean).join(' ');
    }, []);

    // Tree normalization
    const normalizeTree = useCallback((node) => {
        if (!node) return null;
        
        const normalized = {
            id: node.id,
            title: node.name || node.title,
            parentId: node.parentId,
            level: node.level,
            hasChildren: false,
            lastChildren: node.lastChildren,
            children: []
        };
        
        if (node.children && node.children.length > 0) {
            normalized.hasChildren = true;
            normalized.children = node.children.map(child => normalizeTree(child));
        }
        
        return normalized;
    }, []);

    // Path generation
    const generatePaths = useCallback((node, expandedNodes, currentPath = []) => {
        if (!node) return [];
        
        const paths = [];
        const newPath = [...currentPath, node];
        const isCollapsed = expandedNodes[node.id] === false;
        
        if (!node.children || node.children.length === 0) {
            paths.push(newPath);
        } else if (isCollapsed) {
            const countNode = {
                id: `${node.id}-count`,
                title: `count ${node.children.length}`,
                isCountNode: true,
                parentNodeId: node.id,
                lastChildren: node.lastChildren,
                children: []
            };
            paths.push([...newPath, countNode]);
        } else {
            node.children.forEach(child => {
                const childPaths = generatePaths(child, expandedNodes, newPath);
                paths.push(...childPaths);
            });
        }
        
        return paths;
    }, []);

    // Grid data transformation
    const gridData = useMemo(() => {
        if (!data) return [];
        
        const normalizedTree = normalizeTree(data);
        const paths = generatePaths(normalizedTree, expandedNodes);
        
        return paths.map(path => {
            const row = new Array(COLUMNS).fill(null);
            path.forEach((node, idx) => {
                if (idx < COLUMNS) {
                    row[idx] = node;
                }
            });
            return row;
        });
    }, [data, expandedNodes, normalizeTree, generatePaths, COLUMNS]);

    // Node interactions
    const toggleNode = useCallback((nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: prev[nodeId] === false ? true : false
        }));
    }, []);

    const handleNodeClick = useCallback((node) => {
        setSelectedNodeId(node.id);
        if (onSelectedNodeChange) {
            // Pass the original node data (before normalization)
            const findOriginalNode = (treeNode) => {
                if (treeNode.id === node.id) return treeNode;
                if (treeNode.children) {
                    for (const child of treeNode.children) {
                        const found = findOriginalNode(child);
                        if (found) return found;
                    }
                }
                return null;
            };
            const originalNode = findOriginalNode(data);
            onSelectedNodeChange(originalNode);
        }
    }, [onSelectedNodeChange, data]);

    
    const isLastChild = useCallback((node, colIndex, row, nextRow) => {
        if (!node || colIndex === 0) return false;
        
        const parentCol = colIndex - 1;
        if (!nextRow) return true;
        
        if (row[parentCol] && nextRow[parentCol]) {
            return row[parentCol].id !== nextRow[parentCol].id;
        }
        
        if (row[parentCol] && !nextRow[parentCol]) {
            return true;
        }
        
        return false;
    }, []);

    

    // Cell metadata calculator
    const getCellMetadata = useCallback((node, colIndex, rowIndex, row, gridData) => {
        const previousRow = rowIndex > 0 ? gridData[rowIndex - 1] : null;
        const nextRow = rowIndex < gridData.length - 1 ? gridData[rowIndex + 1] : null;
        

        const hasChildren = node && !node.isCountNode && node.hasChildren;
        const isExpanded = node ? expandedNodes[node.id] !== false : false;
        
        const isSameAsAbove = previousRow && 
            node && 
            previousRow[colIndex] && 
            previousRow[colIndex].id === node.id;
        
        const isLastChildOfParent = node && isLastChild(node, colIndex, row, nextRow);
        const isLastSiblingWithData = node && node.lastChildren;

        const lastChildInColumn = isLastChildOfParent || isLastSiblingWithData;
        
        const countNodeIndex = row.findIndex(n => n?.isCountNode);
        const hasCountNode = countNodeIndex !== -1;
        const isAfterCountNode = hasCountNode && colIndex > countNodeIndex;
           
        return {
            hasChildren,
            isExpanded,
            isSameAsAbove,
            lastChildInColumn,
            isAfterCountNode
        };
    }, [expandedNodes, isLastChild]);

    return (
        <div className="grid-wrapper">
            <GridHeader headers={headers} />
            <div className="grid-container">
                {gridData.map((row, rowIndex) => {
                    return row.map((node, colIndex) => {
                        const metadata = getCellMetadata(node, colIndex, rowIndex, row, gridData);
                        const {
                            hasChildren,
                            isSameAsAbove,
                            lastChildInColumn,
                            isAfterCountNode
                        } = metadata;
                        
                        // Empty cell or duplicate parent
                        if (!node || isSameAsAbove) {
                            return (
                                <EmptyCell 
                                    key={`${rowIndex}-${colIndex}`}
                                    hasChildren={hasChildren}
                                    isAfterCountNode={isAfterCountNode}
                                    lastChildInColumn={lastChildInColumn}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    buildClassName={buildClassName}
                                />
                            );
                        }
                        
                        return (
                            <NodeCell 
                                key={`${rowIndex}-${colIndex}`}
                                node={node}
                                metadata={metadata}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                toggleNode={toggleNode}
                                handleNodeClick={handleNodeClick}
                                isSelected={selectedNodeId === node.id}
                                buildClassName={buildClassName}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
}