import React from 'react';
// import { Link } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
    return (
        <div>
            <div className="offcanvas offcanvas-end border-0" tabIndex={-1} id="theme-settings-offcanvas">
                <div className="d-flex align-items-center bg-primary p-3 offcanvas-header">
                    <h5 className="text-white m-0">Theme Settings</h5>
                    <button type="button" className="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body p-0">
                    <div data-simplebar className="h-100">
                        <div className="p-3 settings-bar">
                            <div>
                                <h5 className="mb-3 font-16 fw-semibold">Color Scheme</h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-bs-theme" id="layout-color-light" defaultValue="light" />
                                    <label className="form-check-label" htmlFor="layout-color-light">Light</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-bs-theme" id="layout-color-dark" defaultValue="dark" />
                                    <label className="form-check-label" htmlFor="layout-color-dark">Dark</label>
                                </div>
                            </div>
                            <div>
                                <h5 className="my-3 font-16 fw-semibold">Topbar Color</h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-topbar-color" id="topbar-color-light" defaultValue="light" />
                                    <label className="form-check-label" htmlFor="topbar-color-light">Light</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-topbar-color" id="topbar-color-dark" defaultValue="dark" />
                                    <label className="form-check-label" htmlFor="topbar-color-dark">Dark</label>
                                </div>
                            </div>
                            <div>
                                <h5 className="my-3 font-16 fw-semibold">Menu Color</h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-color" id="leftbar-color-light" defaultValue="light" />
                                    <label className="form-check-label" htmlFor="leftbar-color-light">
                                        Light
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-color" id="leftbar-color-dark" defaultValue="dark" />
                                    <label className="form-check-label" htmlFor="leftbar-color-dark">
                                        Dark
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h5 className="my-3 font-16 fw-semibold">Sidebar Size</h5>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-size" id="leftbar-size-default" defaultValue="default" />
                                    <label className="form-check-label" htmlFor="leftbar-size-default">
                                        Default
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-size" id="leftbar-size-small" defaultValue="condensed" />
                                    <label className="form-check-label" htmlFor="leftbar-size-small">
                                        Condensed
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-size" id="leftbar-hidden" defaultValue="hidden" />
                                    <label className="form-check-label" htmlFor="leftbar-hidden">
                                        Hidden
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-size" id="leftbar-size-small-hover-active" defaultValue="sm-hover-active" />
                                    <label className="form-check-label" htmlFor="leftbar-size-small-hover-active">
                                        Small Hover Active
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="radio" name="data-menu-size" id="leftbar-size-small-hover" defaultValue="sm-hover" />
                                    <label className="form-check-label" htmlFor="leftbar-size-small-hover">
                                        Small Hover
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-footer border-top p-3 text-center">
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-danger w-100" id="reset-layout">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminSidebar;
