// Grid header component
const GridHeader = ({ headers }) => (
    <div className="grid-header">
        {headers.map((header, idx) => (
            <div key={idx} className="header-cell">
                {header}
            </div>
        ))}
    </div>
);

export default GridHeader;