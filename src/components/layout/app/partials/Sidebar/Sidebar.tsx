import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { BrandColorLogo } from "../../../../../assets/logos/locals"
import { menuItem } from '../../../../../configs';
import { Tooltip } from '../../../../common';
interface SidebarProps {
    isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleItemHover = (path: string | null) => {
        setHoveredItem(path);
    };

    return (
        <div className={`sidebar-container ${isCollapsed ? 'collapsed' : 'uncollapsed'}`}>
            <div className="sidebar-logo">
                <img src={BrandColorLogo} alt="logo" />
            </div>

            <div className='sidebar-body'>
                <ul className="sidebar-menu">
                    {menuItem.map((item) => (
                        <li key={item.path} className="sidebar-section">
                            {item.children ? (
                                <>
                                    {!isCollapsed && <span className="sidebar-title">{item.label}</span>}
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.path}
                                            to={child.path}
                                            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                                            onMouseEnter={() => handleItemHover(child.path)}
                                            onMouseLeave={() => handleItemHover(null)}
                                        >
                                            {child.icon && <child.icon width={24} height={24} color="#A4A5A6" />}
                                            {!isCollapsed && <span>{child.label}</span>}
                                            {isCollapsed && (
                                                <Tooltip
                                                    text={child.label}
                                                    isVisible={hoveredItem === child.path}
                                                />
                                            )}
                                        </NavLink>
                                    ))}
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                                    onMouseEnter={() => handleItemHover(item.path)}
                                    onMouseLeave={() => handleItemHover(null)}
                                >
                                    {item.icon && <item.icon width={24} height={24} color="#A4A5A6" />}
                                    {!isCollapsed && <span>{item.label}</span>}
                                    {isCollapsed && (
                                        <Tooltip
                                            text={item.label}
                                            isVisible={hoveredItem === item.path}
                                        />
                                    )}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                {!isCollapsed &&
                    <div className="sidebar-footer">
                        <div className="sidebar-image-placeholder"></div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Sidebar;
