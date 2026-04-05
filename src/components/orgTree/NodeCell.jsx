import ExpandButton from "./ExpandButton";
const NodeCell = ({ node, metadata, rowIndex, colIndex, toggleNode, handleNodeClick, isSelected, buildClassName }) => {
    const {
        isLastInRow,
        hasChildren,
        isExpanded,
        lastChildInColumn,
        isLastNodeInColumn
    } = metadata;
    
    return (
        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
            <div className={buildClassName(
                'grid-box-wrapper',
                (lastChildInColumn || node.isCountNode || isLastNodeInColumn ) && 'last-child'
            )}>
                <div 
                    className={buildClassName(
                        'grid-box',
                        node.isCountNode && 'count-node',
                        !hasChildren && 'no-children',
                        isSelected && 'selected'
                    )}
                    tabIndex={0}
                    role="button"
                    aria-label={node.isCountNode ? `Expand ${node.title.split(' ')[1]} children` : `Select ${node.title}`}
                    aria-selected={isSelected}
                    onClick={() => handleNodeClick(node)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleNodeClick(node);
                        }
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    {node.title}
                </div>
                {!isLastInRow && hasChildren && !node.isCountNode && (
                    <ExpandButton onClick={() => toggleNode(node.id)} isExpanded={isExpanded} node={node} />
                )}
            </div>
        </div>
    );
};

export default NodeCell;