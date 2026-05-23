
export default function NodeCard({ node, onToggle }) {
    return (
        <div className="card">
            {node.children && (
                <button
                    className="toggle"
                    onClick={() => onToggle(node.id)}
                >
                    {node.collapsed ? "+" : "−"}
                </button>
            )}

            <div className="content">
                <div className="title">{node.name}</div>
            </div>
        </div>
    );
}