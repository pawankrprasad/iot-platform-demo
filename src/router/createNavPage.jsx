import { useOutletContext } from 'react-router-dom';

/**
 * Wraps a page component to inject `nav` from Shell's outlet context.
 * @param {React.ComponentType} Page  - The page component to wrap.
 * @param {object}              fixed - Any fixed props (e.g. { filter: 'Online' }).
 */
export function createNavPage(Page, fixed = {}) {
  function NavPage() {
    const { nav } = useOutletContext() ?? {};
    return <Page nav={nav} {...fixed} />;
  }
  NavPage.displayName = Page.displayName ?? Page.name ?? 'NavPage';
  return NavPage;
}
