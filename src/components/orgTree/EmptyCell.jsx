const EmptyCell = ({ 
    hasChildren,
    isAfterCountNode,
    lastChildInColumn,
    rowIndex,
    colIndex,
    buildClassName }) => (
    <div 
        key={`${rowIndex}-${colIndex}`} 
        className="grid-item"
    >
        <div className={buildClassName(
            'grid-box-wrapper',
            !hasChildren && 'no-children',
            (isAfterCountNode || lastChildInColumn) && 'last-child'
        )}>
        </div>
    </div>
);

export default EmptyCell;