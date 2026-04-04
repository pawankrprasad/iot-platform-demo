import React, { useState, useMemo, useCallback } from "react";
import "./styles.css";

export default function HierarchyGrid({ data = null }) {
    const COLUMNS = 5;
    const headers = ["Customer", "Country", "City", "Location", "Unit"];
    const [expandedNodes, setExpandedNodes] = useState({});

    // Normalize tree structure (convert childrens -> children, name -> title)
    const normalizeTree = useCallback((node) => {
        if (!node) return null;
        
        const normalized = {
            id: node.id,
            title: node.name || node.title,
            parentId: node.parentId,
            level: node.level,
            children: []
        };
        
        if (node.childrens && node.childrens.length > 0) {
            normalized.children = node.childrens.map(child => normalizeTree(child));
        } else if (node.children && node.children.length > 0) {
            normalized.children = node.children.map(child => normalizeTree(child));
        }
        
        return normalized;
    }, []);

    // Generate paths from tree
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

    // Convert paths to grid format
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

    const toggleNode = useCallback((nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: prev[nodeId] === false ? true : false
        }));
    }, []);

    // Check if node should show last-child styling
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
                    
                    // Check if row has a count node and find its position
                    const countNodeIndex = row.findIndex(node => node?.isCountNode);
                    const hasCountNode = countNodeIndex !== -1;
                    
                    return row.map((node, colIndex) => {
                        const isLastInRow = colIndex === COLUMNS - 1;
                        const hasChildren = node && !node.isCountNode && node.children?.length > 0;
                        const isExpanded = node ? expandedNodes[node.id] !== false : false;
                        
                        const isSameAsAbove = previousRow && 
                                             node && 
                                             previousRow[colIndex] && 
                                             previousRow[colIndex].id === node.id;
                        
                        const isLastChildOfParent = node && isLastChild(node, colIndex, row, nextRow);
                        
                        // Check if this empty cell comes after a count node in the same row
                        const isAfterCountNode = hasCountNode && colIndex > countNodeIndex;
                        
                        // Check if there are no more nodes below in this column
                        const hasNodeBelowInColumn = gridData.slice(rowIndex + 1).some(futureRow => 
                            futureRow[colIndex] && futureRow[colIndex].id !== row[colIndex]?.id
                        );
                        
                        // Check if this is the last actual node in the column
                        const isLastNodeInColumn = node && !hasNodeBelowInColumn;
                        
                        // Empty cell or duplicate parent
                        if (!node || isSameAsAbove) {
                            return (
                                <div 
                                    key={`${rowIndex}-${colIndex}`} 
                                    className="grid-item"
                                >
                                    <div className={`grid-box-wrapper ${isAfterCountNode || !hasNodeBelowInColumn ? 'last-child' : ''}`}>
                                        
                                    </div>
                                </div>
                            );
                        }
                        
                        return (
                            <div 
                                key={`${rowIndex}-${colIndex}`} 
                                className="grid-item"
                            >
                                <div className={`grid-box-wrapper  ${isLastChildOfParent || node.isCountNode || isLastNodeInColumn ? 'last-child' : ''}`}>
                                    <div 
                                        className={`grid-box ${node.isCountNode ? 'count-node' : ''} ${!hasChildren ? 'no-children' : ''}`}
                                        tabIndex={node.isCountNode ? 0 : undefined}
                                        role={node.isCountNode ? 'button' : undefined}
                                        aria-label={node.isCountNode ? `Expand ${node.title.split(' ')[1]} children` : undefined}
                                        style={node.isCountNode ? { cursor: 'pointer' } : undefined}
                                    >
                                        {node.title}
                                    </div>
                                    {!isLastInRow && hasChildren && !node.isCountNode && (
                                        <button 
                                            className="expand-btn"
                                            onClick={() => toggleNode(node.id)}
                                            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.title}`}
                                            aria-expanded={isExpanded}
                                        >
                                            {isExpanded ? (
                                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            ) : (
                                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            )}
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