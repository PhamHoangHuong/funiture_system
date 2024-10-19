import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LanguageSwitcher from '../../i18n/LanguageSwitcher';
// import { useTranslation } from '../../hooks/translation';

const AdminHeader: React.FC = () => {
    const { user, handleLogout } = useAuth();
    // const { t } = useTranslation();

    return (
        <header className="topbar">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div className="d-flex align-items-center">
                        {/* Menu Toggle Button */}
                        <div className="topbar-item">
                            <button type="button" className="button-toggle-menu me-2">
                                <Icon icon="solar:hamburger-menu-broken" className="fs-24 align-middle" />
                            </button>
                        </div>
                        {/* Menu Toggle Button */}
                        <div className="topbar-item">
                            <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">Welcome!</h4>
                        </div>
                        {/* Logout Button */}
                        <div className="topbar-item">
                            <button type="button" className="topbar-button" onClick={handleLogout}>
                                <Icon icon="solar:logout-bold-duotone" className="fs-24 align-middle" />
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        {/* Theme Color (Light/Dark) */}
                        <div className="topbar-item">
                            <button type="button" className="topbar-button" id="light-dark-mode">
                                <Icon icon="solar:moon-bold-duotone" className="fs-24 align-middle" />
                            </button>
                        </div>
                        {/* Notification */}
                        <div className="dropdown topbar-item">
                            <button type="button" className="topbar-button position-relative" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <Icon icon="solar:bell-bing-bold-duotone" className="fs-24 align-middle" />
                                <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">3<span className="visually-hidden">unread messages</span></span>
                            </button>
                            <div className="dropdown-menu py-0 dropdown-lg dropdown-menu-end" aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="javascript: void(0);" className="text-dark text-decoration-underline">
                                                <small>Clear All</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{ maxHeight: 280 }}>
                                    {/* Item */}
                                    <a href="javascript:void(0);" className="dropdown-item py-3 border-bottom text-wrap">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <img src="/assets/admin/images/users/avatar-1.jpg" className="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-1" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0"><span className="fw-medium">Josephine Thompson </span>commented on admin panel <span>" Wow 😍! this admin looks good and awesome design"</span></p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Item */}
                                    <a href="javascript:void(0);" className="dropdown-item py-3 border-bottom">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-sm me-2">
                                                    <span className="avatar-title bg-soft-info text-info fs-20 rounded-circle">
                                                        D
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-semibold">Donoghue Susan</p>
                                                <p className="mb-0 text-wrap">
                                                    Hi, How are you? What about our next meeting
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Item */}
                                    <a href="javascript:void(0);" className="dropdown-item py-3 border-bottom">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <img src="/assets/admin/images/users/avatar-3.jpg" className="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-3" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-semibold">Jacob Gines</p>
                                                <p className="mb-0 text-wrap">Answered to your comment on the cash flow forecast's graph 🔔.</p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Item */}
                                    <a href="javascript:void(0);" className="dropdown-item py-3 border-bottom">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className="avatar-sm me-2">
                                                    <span className="avatar-title bg-soft-warning text-warning fs-20 rounded-circle">
                                                        <Icon icon="iconamoon:comment-dots-duotone" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-semibold text-wrap">You have received <b>20</b> new messages in the
                                                    conversation</p>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Item */}
                                    <a href="javascript:void(0);" className="dropdown-item py-3 border-bottom">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <img src="/assets/admin/images/users/avatar-5.jpg" className="img-fluid me-2 avatar-sm rounded-circle" alt="avatar-5" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-0 fw-semibold">Shawn Bunch</p>
                                                <p className="mb-0 text-wrap">
                                                    Commented on Admin
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="text-center py-3">
                                    <a href="javascript:void(0);" className="btn btn-primary btn-sm">View All Notification <i className="bx bx-right-arrow-alt ms-1" /></a>
                                </div>
                            </div>
                        </div>
                        {/* Theme Setting */}
                        <div className="topbar-item d-none d-md-flex">
                            <button type="button" className="topbar-button" id="theme-settings-btn" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
                                <Icon icon="solar:settings-bold-duotone" className="fs-24 align-middle" />
                            </button>
                        </div>
                        {/* Activity */}
                        <div className="topbar-item d-none d-md-flex">
                            <button type="button" className="topbar-button" id="theme-settings-btn" data-bs-toggle="offcanvas" data-bs-target="#theme-activity-offcanvas" aria-controls="theme-settings-offcanvas">
                                <Icon icon="solar:clock-circle-bold-duotone" className="fs-24 align-middle" />
                            </button>
                        </div>
                        {/* User */}
                        <div className="dropdown topbar-item">
                            <a type="button" className="topbar-button" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img className="rounded-circle" width={32} src="/assets/admin/images/users/avatar-1.jpg" alt="avatar-3" />
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <h6 className="dropdown-header">Welcome {user?.name || 'Admin'}!</h6>
                                {/* <Link className="dropdown-item" to="/admin/profile">
                                    <i className="bx bx-user-circle text-muted fs-18 align-middle me-1" /><span className="align-middle">Profile</span>
                                </Link> */}
                                <a className="dropdown-item" href="apps-chat.html">
                                    <i className="bx bx-message-dots text-muted fs-18 align-middle me-1" /><span className="align-middle">Messages</span>
                                </a>
                                <LanguageSwitcher />
                                <a className="dropdown-item" href="pages-pricing.html">
                                    <i className="bx bx-wallet text-muted fs-18 align-middle me-1" /><span className="align-middle">Pricing</span>
                                </a>
                                <a className="dropdown-item" href="pages-faqs.html">
                                    <i className="bx bx-help-circle text-muted fs-18 align-middle me-1" /><span className="align-middle">Help</span>
                                </a>
                                <a className="dropdown-item" href="auth-lock-screen.html">
                                    <i className="bx bx-lock text-muted fs-18 align-middle me-1" /><span className="align-middle">Lock screen</span>
                                </a>
                                <div className="dropdown-divider my-1" />
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    <i className="bx bx-log-out fs-18 align-middle me-1" /><span className="align-middle">Logout</span>
                                </button>
                            </div>
                        </div>
                        {/* App Search*/}
                        <form className="app-search d-none d-md-block ms-2">
                            <div className="position-relative">
                                <input type="search" className="form-control" placeholder="Search..." autoComplete="off" />
                                <Icon icon="solar:magnifer-linear" className="search-widget-icon" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default AdminHeader;