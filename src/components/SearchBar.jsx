import { useTheme, styles } from '../context/ThemeContext';

export function SearchBar({ placeholder, value, onChange }) {
  const { dark } = useTheme();
  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
      <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 13 }}>
        &#128269;
      </span>
      <input
        style={{ ...styles(dark).input, paddingLeft: 28 }}
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
