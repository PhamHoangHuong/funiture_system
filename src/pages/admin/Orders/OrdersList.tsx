import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const OrdersList: React.FC = () => {
    return (
        <div>
            {/* Start Container Fluid */}
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Payment Refund</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">490</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:chat-round-money-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Order Cancel</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">241</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:cart-cross-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Order Shipped</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">630</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:box-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Order Delivering</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">170</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:tram-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Pending Review</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">210</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:clipboard-remove-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Pending Payment</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">608</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:clock-circle-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">Delivered</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">200</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:clipboard-check-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="card-title mb-2">In Progress</h4>
                                        <p className="text-muted fw-medium fs-22 mb-0">656</p>
                                    </div>
                                    <div>
                                        <div className="avatar-md bg-primary bg-opacity-10 rounded">
                                            <Icon icon="solar:inbox-line-broken" className="fs-32 text-primary avatar-title" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="d-flex card-header justify-content-between align-items-center">
                                <div>
                                    <h4 className="card-title">All Order List</h4>
                                </div>
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle btn btn-sm btn-outline-light rounded" data-bs-toggle="dropdown" aria-expanded="false">
                                        This Month
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item">Download</a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item">Export</a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item">Import</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0 table-hover table-centered">
                                        <thead className="bg-light-subtle">
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Created at</th>
                                                <th>Customer</th>
                                                <th>Priority</th>
                                                <th>Total</th>
                                                <th>Payment Status</th>
                                                <th>Items</th>
                                                <th>Delivery Number</th>
                                                <th>Order Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    #583488/80
                                                </td>
                                                <td>Apr 23 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Gail C. Anderson</a>
                                                </td>
                                                <td> Normal</td>
                                                <td> $1,230.00</td>
                                                <td> <span className="badge bg-light text-dark  px-2 py-1 fs-13">Unpaid</span></td>
                                                <td> 4</td>
                                                <td> -</td>
                                                <td> <span className="badge border border-secondary text-secondary  px-2 py-1 fs-13">Draft</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #456754/80
                                                </td>
                                                <td>Apr 20 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Jung S. Ayala</a>
                                                </td>
                                                <td> Normal</td>
                                                <td> $987.00</td>
                                                <td> <span className="badge bg-success text-light  px-2 py-1 fs-13">Paid</span></td>
                                                <td> 2</td>
                                                <td> -</td>
                                                <td> <span className="badge border border-warning text-warning  px-2 py-1 fs-13">Packaging</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #578246/80
                                                </td>
                                                <td>Apr 19 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">David A. Arnold</a>
                                                </td>
                                                <td> High</td>
                                                <td> $1,478.00</td>
                                                <td> <span className="badge  bg-success text-light px-2 py-1 fs-13">Paid</span></td>
                                                <td> 5</td>
                                                <td> #D-57837678</td>
                                                <td> <span className="badge border border-success text-success  px-2 py-1 fs-13">Completed</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #348930/80
                                                </td>
                                                <td>Apr 04 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Cecile D. Gordon</a>
                                                </td>
                                                <td> Normal</td>
                                                <td> $720.00</td>
                                                <td> <span className="badge bg-light text-dark  px-2 py-1 fs-13">Refund</span></td>
                                                <td> 4</td>
                                                <td> -</td>
                                                <td> <span className="badge border border-danger text-danger  px-2 py-1 fs-13">Canceled</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #391367/80
                                                </td>
                                                <td>Apr 02 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">William Moreno</a>
                                                </td>
                                                <td> Normal</td>
                                                <td> $1,909.00</td>
                                                <td><span className="badge  bg-success text-light px-2 py-1 fs-13">Paid</span></td>
                                                <td> 6</td>
                                                <td> #D-89734235</td>
                                                <td> <span className="badge border border-success text-success  px-2 py-1 fs-13">Completed</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #930447/80
                                                </td>
                                                <td>March 28 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Alphonse Roy</a>
                                                </td>
                                                <td> High</td>
                                                <td> $879.00</td>
                                                <td><span className="badge  bg-success text-light px-2 py-1 fs-13">Paid</span></td>
                                                <td> 4</td>
                                                <td> #D-35227268</td>
                                                <td><span className="badge border border-success text-success  px-2 py-1 fs-13">Completed</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #462397/80
                                                </td>
                                                <td>March 20 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Pierpont Marleau</a>
                                                </td>
                                                <td> High</td>
                                                <td> $1,230.00</td>
                                                <td> <span className="badge bg-light text-dark  px-2 py-1 fs-13">Refund</span></td>
                                                <td> 2</td>
                                                <td> -</td>
                                                <td> <span className="badge border border-danger text-danger  px-2 py-1 fs-13">Canceled</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #472356/80
                                                </td>
                                                <td>March 12 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Madeleine Gervais</a>
                                                </td>
                                                <td> Normal</td>
                                                <td> $1,264.00</td>
                                                <td> <span className="badge bg-success text-light  px-2 py-1 fs-13">Paid</span></td>
                                                <td> 3</td>
                                                <td> #D-74922656</td>
                                                <td> <span className="badge border border-success text-success  px-2 py-1 fs-13">Completed</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    #448226/80
                                                </td>
                                                <td>March 02 , 2024</td>
                                                <td>
                                                    <a href="#!" className="link-primary fw-medium">Satordi Gaillou</a>
                                                </td>
                                                <td> High</td>
                                                <td> $1,787.00</td>
                                                <td> <span className="badge bg-success text-light  px-2 py-1 fs-13">Paid</span></td>
                                                <td> 4</td>
                                                <td> -</td>
                                                <td> <span className="badge border border-warning text-warning  px-2 py-1 fs-13">Packaging</span></td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-primary btn-sm"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                                                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* end table-responsive */}
                            </div>
                            <div className="card-footer border-top">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">Previous</a></li>
                                        <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                                        <li className="page-item"><a className="page-link" href="javascript:void(0);">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Container Fluid */}
            {/* ========== Footer Start ========== */}
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            © Larkon. Crafted by <Icon icon="iconamoon:heart-duotone" className="fs-18 align-middle text-danger" /> <a href="#" className="fw-bold footer-text" target="_blank">Techzaa</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* ========== Footer End ========== */}
        </div>

    );
};

export default OrdersList;