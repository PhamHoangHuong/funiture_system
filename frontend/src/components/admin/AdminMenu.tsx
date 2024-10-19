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
                    {/* categories */}
                    <li className="nav-item">
                        <NavLink className="nav-link menu-arrow" to="#sidebarCategory" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarCategory">
                            <span className="nav-icon">
                                <i className="fas fa-list"></i>
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
                    {/* orders */}
                    <li className="nav-item">
                        <NavLink className="nav-link menu-arrow" to="#sidebarOrders" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarOrders">
                            <span className="nav-icon">
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                            <span className="nav-text"> Orders </span>
                        </NavLink>
                        <div className="collapse" id="sidebarOrders">
                            <ul className="nav sub-navbar-nav">
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/orders">Order List</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/orders/cart">Cart</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/orders/checkout">Checkout</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/orders/details">Order Details</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* inventory */}
                    <li className="nav-item">
                        <NavLink className="nav-link menu-arrow" to="#sidebarInventory" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarInventory">
                            <span className="nav-icon">
                                <i className="fas fa-boxes"></i>
                            </span>
                            <span className="nav-text"> Inventory </span>
                        </NavLink>
                        <div className="collapse" id="sidebarInventory">
                            <ul className="nav sub-navbar-nav">
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/inventory/warehouse">Warehouse</NavLink>
                                </li>
                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/inventory/received-orders">Received Orders</NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* settings */}

                    <li className="nav-item">
                        <a className="nav-link menu-arrow" href="#sidebarKhachHang" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarKhachHang">
                            <span className="nav-icon">
                                <Icon icon="mdi:account-group" />
                            </span>
                            <span className="nav-text"> Quản lý Khách hàng </span>
                        </a>
                        <div className="collapse" id="sidebarKhachHang">
                            <ul className="nav sub-navbar-nav">

                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/quan-ly-khach-hang/danh-sach">Danh sách Khách hàng</NavLink>
                                </li>

                                <li className="sub-nav-item">
                                    <NavLink className="sub-nav-link" to="/admin/quan-ly-khach-hang/them-moi">Thêm Khách hàng</NavLink>
                                </li>

                            </ul>
                        </div>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/settings">
                            <span className="nav-icon">
                                <Icon icon="solar:settings-bold-duotone" />
                            </span>
                            <span className="nav-text"> Settings </span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/page-manager">
                            <span className="nav-icon">
                                <Icon icon="mdi:page-layout-body" />
                            </span>
                            <span className="nav-text">Quản lý Trang</span>
                        </NavLink>
                    </li>

                    {/* logout */}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/logout">
                            <span className="nav-icon">
                                <Icon icon="solar:logout-bold-duotone" />
                            </span>
                            <span className="nav-text"> Logout </span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div >
    );
};

export default AdminMenu;
