import { useTheme, styles } from '../context/ThemeContext';

export function PageHeader({ title, sub, crumbs, actions }) {
  const { dark } = useTheme();
  const st = styles(dark);
  return (
    <div style={st.pageHeader}>
      {crumbs && <div style={st.breadcrumb}>{crumbs.join(' > ')}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={st.pageTitle}>{title}</h1>
          {sub && <p style={st.pageSub}>{sub}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}
