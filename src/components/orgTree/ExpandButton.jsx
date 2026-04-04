// Icon Components
const MinusIcon = () => (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const PlusIcon = () => (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ExpandButton = ({ onClick, isExpanded , node }) => {
    return (
        <button
            className="expand-btn"
            onClick={onClick}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.title}`}
            aria-expanded={isExpanded}
        >
            {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </button>
    );
};

export default ExpandButton;

