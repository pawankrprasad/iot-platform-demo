import { createContext, useContext, useState } from 'react';
export const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  return <ThemeCtx.Provider value={{ dark, setDark }}>{children}</ThemeCtx.Provider>;
}
export const styles = (dark) => ({
  app: { display: 'flex', height: '100vh', fontFamily: "'Inter',system-ui,sans-serif", background: dark ? '#0f1117' : '#f4f6f9', color: dark ? '#e2e8f0' : '#1a202c', fontSize: 13 },
  sidebar: { width: 220, background: dark ? '#161b27' : '#1e2a3b', color: '#cbd5e1', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' },
  sidebarLogo: { padding: '20px 16px 12px', borderBottom: '1px solid ' + (dark ? '#ffffff12' : '#ffffff18'), marginBottom: 4 },
  logoText: { fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: 0.5 },
  orbitronLogoText: { fontFamily: "'Orbitron', sans-serif", fontOpticalSizing: 'auto', fontWeight: 900, fontStyle: 'normal', color: dark ? '#f8fafc' : '#1a202c' },
  logoSub: { fontSize: 10, color: '#64748b', marginTop: 2 },
  navSection: { padding: '8px 12px 2px', fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: 1 },
  navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 6, margin: '1px 6px', cursor: 'pointer', fontSize: 12.5, fontWeight: active ? 600 : 400, background: active ? '#3b82f620' : 'transparent', color: active ? '#60a5fa' : '#94a3b8', transition: 'all .15s' }),
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topbar: { background: dark ? '#161b27' : '#fff', borderBottom: '1px solid ' + (dark ? '#ffffff10' : '#e2e8f0'), padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 },
  content: { flex: 1, overflowY: 'auto', padding: 20 },
  pageHeader: { marginBottom: 20 },
  pageTitle: { fontSize: 20, fontWeight: 700, margin: 0 },
  pageSub: { color: dark ? '#64748b' : '#718096', fontSize: 12, marginTop: 3 },
  card: { background: dark ? '#1e2535' : '#fff', border: '1px solid ' + (dark ? '#ffffff0d' : '#e2e8f0'), borderRadius: 10, padding: 16, marginBottom: 16 },
  statCard: (c) => ({ background: dark ? '#1e2535' : '#fff', border: '1px solid ' + (dark ? '#ffffff0d' : '#e2e8f0'), borderRadius: 10, padding: 18, cursor: 'pointer', marginBottom: '16px', borderTop: '3px solid ' + c, transition: 'transform .15s,box-shadow .15s' }),
  statNum: { fontSize: 28, fontWeight: 700, lineHeight: 1 },
  statLabel: { fontSize: 12, color: dark ? '#64748b' : '#718096', marginTop: 4 },
  grid: (cols) => ({ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ',1fr)', gap: 14 }),
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12.5 },
  th: { textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid ' + (dark ? '#ffffff0f' : '#e2e8f0'), color: dark ? '#64748b' : '#718096', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  td: { padding: '9px 12px', borderBottom: '1px solid ' + (dark ? '#ffffff08' : '#f1f5f9') },
  btn: (v) => { v = v || 'primary'; return { padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, background: v === 'primary' ? '#3b82f6' : v === 'danger' ? '#ef4444' : v === 'success' ? '#10b981' : dark ? '#2d3748' : '#f1f5f9', color: v === 'ghost' ? (dark ? '#94a3b8' : '#4a5568') : '#fff', transition: 'opacity .15s' }; },
  badge: (c) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: c + '20', color: c }),
  input: { background: dark ? '#0f1117' : '#f8fafc', border: '1px solid ' + (dark ? '#ffffff18' : '#e2e8f0'), borderRadius: 6, padding: '7px 11px', color: dark ? '#e2e8f0' : '#1a202c', fontSize: 12.5, width: '100%', outline: 'none' },
  select: { background: dark ? '#0f1117' : '#f8fafc', border: '1px solid ' + (dark ? '#ffffff18' : '#e2e8f0'), borderRadius: 6, padding: '7px 11px', color: dark ? '#e2e8f0' : '#1a202c', fontSize: 12.5, outline: 'none' },
  tab: (a) => ({ padding: '7px 16px', border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: a ? 600 : 400, borderBottom: a ? '2px solid #3b82f6' : '2px solid transparent', background: 'transparent', color: a ? '#3b82f6' : dark ? '#64748b' : '#718096', transition: 'all .15s' }),
  breadcrumb: { fontSize: 12, color: dark ? '#64748b' : '#718096', marginBottom: 6 },
  severityColor: { Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#3b82f6' },
  statusColor: { Online: '#10b981', Offline: '#ef4444', Warning: '#f97316', Active: '#10b981', Inactive: '#94a3b8' },
});