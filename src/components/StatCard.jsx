import { useState } from 'react';
import { useTheme, styles } from '../context/ThemeContext';

export function StatCard({ label, value, color, icon, onClick, sub }) {
  const { dark } = useTheme();
  const st = styles(dark);
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ ...st.statCard(color), transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 4px 16px #0003' : 'none' }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={st.statNum}>{value}</div>
          <div style={st.statLabel}>{label}</div>
          {sub && <div style={{ fontSize: 11, color, marginTop: 6 }}>{sub}</div>}
        </div>
        <span style={{ fontSize: 24 }}>{icon}</span>
      </div>
    </div>
  );
}
