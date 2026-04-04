import ExpandButton from "./ExpandButton";
const NodeCell = ({ node, metadata, rowIndex, colIndex, toggleNode, buildClassName }) => {
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
                        !hasChildren && 'no-children'
                    )}
                    tabIndex={node.isCountNode ? 0 : undefined}
                    role={node.isCountNode ? 'button' : undefined}
                    aria-label={node.isCountNode ? `Expand ${node.title.split(' ')[1]} children` : undefined}
                    style={node.isCountNode ? { cursor: 'pointer' } : undefined}
                >
                    {node.title} {node.lastChildren? "Yes":"No"}
                </div>
                {!isLastInRow && hasChildren && !node.isCountNode && (
                    <ExpandButton onClick={() => toggleNode(node.id)} isExpanded={isExpanded} node={node} />
                )}
            </div>
        </div>
    );
};

export default NodeCell;