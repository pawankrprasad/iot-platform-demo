import { useTheme, styles } from '../context/ThemeContext';

export function Badge({ label, color }) {
  const { dark } = useTheme();
  return <span style={styles(dark).badge(color || '#64748b')}>{label}</span>;
}
