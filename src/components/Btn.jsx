import { useTheme, styles } from '../context/ThemeContext';

export function Btn({ children, variant, onClick, style }) {
  const { dark } = useTheme();
  return (
    <button style={{ ...styles(dark).btn(variant), ...style }} onClick={onClick}>
      {children}
    </button>
  );
}
