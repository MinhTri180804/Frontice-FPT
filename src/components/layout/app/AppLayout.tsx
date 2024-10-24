import React, { useState } from 'react';
import './AppLayout.scss';
import { Header, Sidebar } from './partials';
import { LeftIcon, RightIcon } from '../../../assets/icons';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="layout-container">
      <aside className={isCollapsed ? 'collapsed' : ''}>
        <Sidebar isCollapsed={isCollapsed} />
        <button onClick={toggleSidebar} className="toggle-button">
          {isCollapsed ? (
            <RightIcon width={24} height={24} stroke="#fff" />
          ) : (
            <LeftIcon width={24} height={24} stroke="#fff" />
          )}
        </button>
      </aside>

      <div className="site-layout">
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
