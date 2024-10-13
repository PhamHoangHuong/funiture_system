import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const AdminMenu: React.FC = () => {
    return (
        <div className="main-nav">
            {/* Sidebar Logo */}
            <div className="logo-box">
                <NavLink to="/admin/dashboard" className="logo-dark">
                    <img src="/assets/admin/images/logo-sm.png" className="logo-sm" alt="logo sm" />
                    <img src="/assets/admin/images/logo-dark.png" className="logo-lg" alt="logo dark" />
                </NavLink>
                <NavLink to="/admin/dashboard" className="logo-light">
                    <img src="/assets/admin/images/logo-sm.png" className="logo-sm" alt="logo sm" />
                    <img src="/assets/admin/images/logo-light.png" className="logo-lg" alt="logo light" />
                </NavLink>
            </div>
            {/* Menu Toggle Button (sm-hover) */}
            <button type="button" className="button-sm-hover" aria-label="Show Full Sidebar">
                <Icon icon="solar:double-alt-arrow-right-bold-duotone" className="button-sm-hover-icon" />
            </button>
            <div className="scrollbar" data-simplebar>
                <ul className="navbar-nav" id="navbar-nav">
                    <li className="menu-title">General</li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/dashboard">
                            <span className="nav-icon">
                                <Icon icon="solar:home-bold-duotone" />
                            </span>
                            <span className="nav-text"> Dashboard </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link menu-arrow" to="#sidebarProducts" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarProducts">
                            <span className="nav-icon">
                                <Icon icon="solar:box-bold-duotone" />
                            </span>
                            <span className="nav-text"> Products </span>
                        </NavLink>
                        <div className="collapse" id="sidebarProducts">
                            <ul className="nav sub-navbar-nav">
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/products">Product List</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/products/create">Add Product</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link menu-arrow" to="#sidebarCategory" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCategory">
                            <span className="nav-icon">
                                <Icon icon="solar:category-bold-duotone" />
                            </span>
                            <span className="nav-text"> Categories </span>
                        </NavLink>
                        <div className="collapse" id="sidebarCategory">
                            <ul className="nav sub-navbar-nav">
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/categories">Category List</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/categories/create">Add Category</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {/* New Menu Item */}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/new-page">
                            <span className="nav-icon">
                                <Icon icon="solar:plus-bold-duotone" />
                            </span>
                            <span className="nav-text"> New Page </span>
                        </NavLink>
                    </li>
                    {/* Other existing menu items */}
                </ul>
            </div>
        </div>
    );
};

export default AdminMenu;