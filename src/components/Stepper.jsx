import { useTheme, styles } from '../context/ThemeContext';

export function Stepper({ steps, current }) {
  const { dark } = useTheme();
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: current > i + 1 ? '#10b981' : current === i + 1 ? '#3b82f6' : dark ? '#2d3748' : '#e2e8f0',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {current > i + 1 ? 'v' : i + 1}
          </div>
          <span style={{ fontSize: 12, color: current === i + 1 ? '#3b82f6' : '#64748b' }}>{s}</span>
          {i < steps.length - 1 && <span style={{ color: '#64748b' }}>›</span>}
        </div>
      ))}
    </div>
  );
}
