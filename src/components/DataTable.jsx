import { useTheme, styles } from '../context/ThemeContext';

export function DataTable({ cols, rows, onRow }) {
  const { dark } = useTheme();
  const st = styles(dark);
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={st.table}>
        <thead>
          <tr>{cols.map((c) => <th key={c.key} style={st.th}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ cursor: onRow ? 'pointer' : 'default' }}
              onClick={() => onRow && onRow(row)}
              onMouseEnter={(e) => { if (onRow) e.currentTarget.style.background = dark ? '#ffffff06' : '#f8fafc'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {cols.map((c) => <td key={c.key} style={st.td}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
