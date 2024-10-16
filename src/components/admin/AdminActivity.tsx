import React from 'react';
import { Icon } from '@iconify/react';

const AdminActivity: React.FC = () => {
    return (
        <div>
            <div className="offcanvas offcanvas-end border-0" tabIndex={-1} id="theme-activity-offcanvas" style={{ maxWidth: 450, width: '100%' }}>
                <div className="d-flex align-items-center bg-primary p-3 offcanvas-header">
                    <h5 className="text-white m-0 fw-semibold">Activity Stream</h5>
                    <button type="button" className="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body p-0">
                    <div data-simplebar className="h-100 p-4">
                        <div className="position-relative ms-2">
                            <span className="position-absolute start-0 top-0 border border-dashed h-100" />
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-danger d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                                        <Icon icon="iconamoon:folder-check-duotone" />
                                    </span>
                                    <div className="ms-2">
                                        <h5 className="mb-1 text-dark fw-semibold fs-15 lh-base">Report-Fix / Update </h5>
                                        <p className="d-flex align-items-center">Add 3 files to <span className="d-flex align-items-center text-primary ms-1"><Icon icon="iconamoon:file-light" /> Tasks</span></p>
                                        <div className="bg-light bg-opacity-50 rounded-2 p-2">
                                            <div className="row">
                                                <div className="col-lg-6 border-end border-light">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <i className="bx bxl-figma fs-20 text-red" />
                                                        <a href="#!" className="text-dark fw-medium">Concept.fig</a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <i className="bx bxl-file-doc fs-20 text-success" />
                                                        <a href="#!" className="text-dark fw-medium">larkon.docs</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="mt-2 text-muted">Monday , 4:24 PM</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-success d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                                        <Icon icon="iconamoon:check-circle-1-duotone" />
                                    </span>
                                    <div className="ms-2">
                                        <h5 className="mb-1 text-dark fw-semibold fs-15 lh-base">Project Status</h5>
                                        <p className="d-flex align-items-center mb-0">Marked<span className="d-flex align-items-center text-primary mx-1"><Icon icon="iconamoon:file-light" /> Design </span> as <span className="badge bg-success-subtle text-success px-2 py-1 ms-1"> Completed</span></p>
                                        <div className="d-flex align-items-center gap-3 mt-1 bg-light bg-opacity-50 p-2 rounded-2">
                                            <a href="#!" className="fw-medium text-dark">UI/UX Figma Design</a>
                                            <div className="ms-auto">
                                                <a href="#!" className="fw-medium text-primary fs-18" data-bs-toggle="tooltip" data-bs-title="Download" data-bs-placement="bottom"><Icon icon="iconamoon:cloud-download-duotone" /></a>
                                            </div>
                                        </div>
                                        <h6 className="mt-3 text-muted">Monday , 3:00 PM</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-primary d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-16">UI</span>
                                    <div className="ms-2">
                                        <h5 className="mb-1 text-dark fw-semibold fs-15">Larkon Application UI v2.0.0 <span className="badge bg-primary-subtle text-primary px-2 py-1 ms-1"> Latest</span></h5>
                                        <p>Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce &amp; Marketing pages.</p>
                                        <div className="mt-2">
                                            <a href="#!" className="btn btn-light btn-sm">Download Zip</a>
                                        </div>
                                        <h6 className="mt-3 text-muted">Monday , 2:10 PM</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 translate-middle-x bg-success bg-gradient d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                                        <img src="/assets/admin/images/users/avatar-7.jpg" alt="avatar-5" className="avatar-sm rounded-circle" />
                                    </span>
                                    <div className="ms-2">
                                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">Alex Smith Attached Photos</h5>
                                        <div className="row g-2 mt-2">
                                            <div className="col-lg-4">
                                                <a href="#!">
                                                    <img src="/assets/admin/images/small/img-6.jpg" className="img-fluid rounded" />
                                                </a>
                                            </div>
                                            <div className="col-lg-4">
                                                <a href="#!">
                                                    <img src="/assets/admin/images/small/img-3.jpg" className="img-fluid rounded" />
                                                </a>
                                            </div>
                                            <div className="col-lg-4">
                                                <a href="#!">
                                                    <img src="/assets/admin/images/small/img-4.jpg" className="img-fluid rounded" />
                                                </a>
                                            </div>
                                        </div>
                                        <h6 className="mt-3 text-muted">Monday 1:00 PM</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 translate-middle-x bg-success bg-gradient d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                                        <img src="/assets/admin/images/users/avatar-6.jpg" alt="avatar-5" className="avatar-sm rounded-circle" />
                                    </span>
                                    <div className="ms-2">
                                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">Rebecca J. added a new team member</h5>
                                        <p className="d-flex align-items-center gap-1"><Icon icon="iconamoon:check-circle-1-duotone" className="text-success" /> Added a new member to Front Dashboard</p>
                                        <h6 className="mt-3 text-muted">Monday 10:00 AM</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative ps-4">
                                <div className="mb-4">
                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-warning d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                                        <Icon icon="iconamoon:certificate-badge-duotone" />
                                    </span>
                                    <div className="ms-2">
                                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">Achievements</h5>
                                        <p className="d-flex align-items-center gap-1 mt-1">Earned a <Icon icon="iconamoon:certificate-badge-duotone" className="text-danger fs-20" />" Best Product Award"</p>
                                        <h6 className="mt-3 text-muted">Monday 9:30 AM</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="#!" className="btn btn-outline-dark w-100">View All</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminActivity;