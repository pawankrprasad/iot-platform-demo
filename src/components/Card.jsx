import { useTheme, styles } from '../context/ThemeContext';

export function Card({ children, style }) {
  const { dark } = useTheme();
  return <div style={{ ...styles(dark).card, ...style }}>{children}</div>;
}
