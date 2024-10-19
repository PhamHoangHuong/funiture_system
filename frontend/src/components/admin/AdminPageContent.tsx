import React from 'react';
import { Icon } from '@iconify/react';

const AdminPageContent: React.FC = () => {

    return (
        <div>
            {/* Start Container Fluid */}
            <div className="container-fluid">
                {/* Start here.... */}
                <div className="row">
                    <div className="col-xxl-5">
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-primary text-truncate mb-3" role="alert">
                                    We regret to inform you that our server is currently experiencing technical difficulties.
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card overflow-hidden">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-primary rounded">
                                                    <Icon icon="solar:cart-5-bold-duotone" className="avatar-title fs-32 text-primary" />
                                                </div>
                                            </div> {/* end col */}
                                            <div className="col-6 text-end">
                                                <p className="text-muted mb-0 text-truncate">Total Orders</p>
                                                <h3 className="text-dark mt-1 mb-0">13, 647</h3>
                                            </div> {/* end col */}
                                        </div> {/* end row*/}
                                    </div> {/* end card body */}
                                    <div className="card-footer py-2 bg-light bg-opacity-50">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <span className="text-success"> <i className="bx bxs-up-arrow fs-12" /> 2.3%</span>
                                                <span className="text-muted ms-1 fs-12">Last Week</span>
                                            </div>
                                            <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                                        </div>
                                    </div> {/* end card body */}
                                </div> {/* end card */}
                            </div> {/* end col */}
                            <div className="col-md-6">
                                <div className="card overflow-hidden">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-primary rounded">
                                                    <i className="bx bx-award avatar-title fs-24 text-primary" />
                                                </div>
                                            </div> {/* end col */}
                                            <div className="col-6 text-end">
                                                <p className="text-muted mb-0 text-truncate">New Leads</p>
                                                <h3 className="text-dark mt-1 mb-0">9, 526</h3>
                                            </div> {/* end col */}
                                        </div> {/* end row*/}
                                    </div> {/* end card body */}
                                    <div className="card-footer py-2 bg-light bg-opacity-50">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <span className="text-success"> <i className="bx bxs-up-arrow fs-12" /> 8.1%</span>
                                                <span className="text-muted ms-1 fs-12">Last Month</span>
                                            </div>
                                            <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                                        </div>
                                    </div> {/* end card body */}
                                </div> {/* end card */}
                            </div> {/* end col */}
                            <div className="col-md-6">
                                <div className="card overflow-hidden">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-primary rounded">
                                                    <i className="bx bxs-backpack avatar-title fs-24 text-primary" />
                                                </div>
                                            </div> {/* end col */}
                                            <div className="col-6 text-end">
                                                <p className="text-muted mb-0 text-truncate">Deals</p>
                                                <h3 className="text-dark mt-1 mb-0">976</h3>
                                            </div> {/* end col */}
                                        </div> {/* end row*/}
                                    </div> {/* end card body */}
                                    <div className="card-footer py-2 bg-light bg-opacity-50">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <span className="text-danger"> <i className="bx bxs-down-arrow fs-12" /> 0.3%</span>
                                                <span className="text-muted ms-1 fs-12">Last Month</span>
                                            </div>
                                            <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                                        </div>
                                    </div> {/* end card body */}
                                </div> {/* end card */}
                            </div> {/* end col */}
                            <div className="col-md-6">
                                <div className="card overflow-hidden">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-md bg-soft-primary rounded">
                                                    <i className="bx bx-dollar-circle avatar-title text-primary fs-24" />
                                                </div>
                                            </div> {/* end col */}
                                            <div className="col-6 text-end">
                                                <p className="text-muted mb-0 text-truncate">Booked Revenue</p>
                                                <h3 className="text-dark mt-1 mb-0">$123.6k</h3>
                                            </div> {/* end col */}
                                        </div> {/* end row*/}
                                    </div> {/* end card body */}
                                    <div className="card-footer py-2 bg-light bg-opacity-50">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <span className="text-danger"> <i className="bx bxs-down-arrow fs-12" /> 10.6%</span>
                                                <span className="text-muted ms-1 fs-12">Last Month</span>
                                            </div>
                                            <a href="#!" className="text-reset fw-semibold fs-12">View More</a>
                                        </div>
                                    </div> {/* end card body */}
                                </div> {/* end card */}
                            </div> {/* end col */}
                        </div> {/* end row */}
                    </div> {/* end col */}
                    <div className="col-xxl-7">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="card-title">Performance</h4>
                                    <div>
                                        <button type="button" className="btn btn-sm btn-outline-light">ALL</button>
                                        <button type="button" className="btn btn-sm btn-outline-light">1M</button>
                                        <button type="button" className="btn btn-sm btn-outline-light">6M</button>
                                        <button type="button" className="btn btn-sm btn-outline-light active">1Y</button>
                                    </div>
                                </div> {/* end card-title*/}
                                <div dir="ltr">
                                    <div id="dash-performance-chart" className="apex-charts" />
                                </div>
                            </div> {/* end card body */}
                        </div> {/* end card */}
                    </div> {/* end col */}
                </div> {/* end row */}
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Conversions</h5>
                                <div id="conversions" className="apex-charts mb-2 mt-n2" />
                                <div className="row text-center">
                                    <div className="col-6">
                                        <p className="text-muted mb-2">This Week</p>
                                        <h3 className="text-dark mb-3">23.5k</h3>
                                    </div> {/* end col */}
                                    <div className="col-6">
                                        <p className="text-muted mb-2">Last Week</p>
                                        <h3 className="text-dark mb-3">41.05k</h3>
                                    </div> {/* end col */}
                                </div> {/* end row */}
                                <div className="text-center">
                                    <button type="button" className="btn btn-light shadow-none w-100">View Details</button>
                                </div> {/* end row */}
                            </div>
                        </div>
                    </div> {/* end left chart card */}
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sessions by Country</h5>
                                <div id="world-map-markers" style={{ height: 316 }}>
                                </div>
                                <div className="row text-center">
                                    <div className="col-6">
                                        <p className="text-muted mb-2">This Week</p>
                                        <h3 className="text-dark mb-3">23.5k</h3>
                                    </div> {/* end col */}
                                    <div className="col-6">
                                        <p className="text-muted mb-2">Last Week</p>
                                        <h3 className="text-dark mb-3">41.05k</h3>
                                    </div> {/* end col */}
                                </div> {/* end row */}
                            </div>
                        </div> {/* end card*/}
                    </div> {/* end col */}
                    <div className="col-lg-4">
                        <div className="card card-height-100">
                            <div className="card-header d-flex align-items-center justify-content-between gap-2">
                                <h4 className="card-title flex-grow-1">Top Pages</h4>
                                <a href="#" className="btn btn-sm btn-soft-primary">View All</a>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover table-nowrap table-centered m-0">
                                    <thead className="bg-light bg-opacity-50">
                                        <tr>
                                            <th className="text-muted ps-3">Page Path</th>
                                            <th className="text-muted">Page Views</th>
                                            <th className="text-muted">Exit Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/ecommerce.html</a></td>
                                            <td>465 </td>
                                            <td><span className="badge badge-soft-success">4.4%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/dashboard.html</a></td>
                                            <td> 426</td>
                                            <td><span className="badge badge-soft-danger">20.4%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/chat.html</a></td>
                                            <td>254 </td>
                                            <td><span className="badge badge-soft-warning">12.25%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/auth-login.html</a></td>
                                            <td> 3369</td>
                                            <td><span className="badge badge-soft-success">5.2%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/email.html</a></td>
                                            <td>985 </td>
                                            <td><span className="badge badge-soft-danger">64.2%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/social.html</a></td>
                                            <td>653 </td>
                                            <td><span className="badge badge-soft-success">2.4%</span></td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3"><a href="#" className="text-muted">larkon/blog.html</a></td>
                                            <td>478 </td>
                                            <td><span className="badge badge-soft-danger">1.4%</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> {/* end col */}
                    <div className="col-xl-4 d-none">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4 className="card-title">Recent Transactions</h4>
                                <div>
                                    <a href="#!" className="btn btn-sm btn-primary">
                                        <i className="bx bx-plus me-1" />Add
                                    </a>
                                </div>
                            </div> {/* end card-header*/}
                            <div className="card-body p-0">
                                <div className="px-3" data-simplebar style={{ maxHeight: 398 }}>
                                    <table className="table table-hover mb-0 table-centered">
                                        <tbody>
                                            <tr>
                                                <td>24 April, 2024</td>
                                                <td>$120.55</td>
                                                <td><span className="badge bg-success">Cr</span></td>
                                                <td>Commisions </td>
                                            </tr>
                                            <tr>
                                                <td>24 April, 2024</td>
                                                <td>$9.68</td>
                                                <td><span className="badge bg-success">Cr</span></td>
                                                <td>Affiliates </td>
                                            </tr>
                                            <tr>
                                                <td>20 April, 2024</td>
                                                <td>$105.22</td>
                                                <td><span className="badge bg-danger">Dr</span></td>
                                                <td>Grocery </td>
                                            </tr>
                                            <tr>
                                                <td>18 April, 2024</td>
                                                <td>$80.59</td>
                                                <td><span className="badge bg-success">Cr</span></td>
                                                <td>Refunds </td>
                                            </tr>
                                            <tr>
                                                <td>18 April, 2024</td>
                                                <td>$750.95</td>
                                                <td><span className="badge bg-danger">Dr</span></td>
                                                <td>Bill Payments </td>
                                            </tr>
                                            <tr>
                                                <td>17 April, 2024</td>
                                                <td>$455.62</td>
                                                <td><span className="badge bg-danger">Dr</span></td>
                                                <td>Electricity </td>
                                            </tr>
                                            <tr>
                                                <td>17 April, 2024</td>
                                                <td>$102.77</td>
                                                <td><span className="badge bg-success">Cr</span></td>
                                                <td>Interest </td>
                                            </tr>
                                            <tr>
                                                <td>16 April, 2024</td>
                                                <td>$79.49</td>
                                                <td><span className="badge bg-success">Cr</span></td>
                                                <td>Refunds </td>
                                            </tr>
                                            <tr>
                                                <td>05 April, 2024</td>
                                                <td>$980.00</td>
                                                <td><span className="badge bg-danger">Dr</span></td>
                                                <td>Shopping</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> {/* end card body */}
                        </div> {/* end card*/}
                    </div> {/* end col*/}
                </div> {/* end row */}
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h4 className="card-title">
                                        Recent Orders
                                    </h4>
                                    <a href="#!" className="btn btn-sm btn-soft-primary">
                                        <i className="bx bx-plus me-1" />Create Order
                                    </a>
                                </div>
                            </div>
                            {/* end card body */}
                            <div className="table-responsive table-centered">
                                <table className="table mb-0">
                                    <thead className="bg-light bg-opacity-50">
                                        <tr>
                                            <th className="ps-3">
                                                Order ID.
                                            </th>
                                            <th>
                                                Date
                                            </th>
                                            <th>
                                                Product
                                            </th>
                                            <th>
                                                Customer Name
                                            </th>
                                            <th>
                                                Email ID
                                            </th>
                                            <th>
                                                Phone No.
                                            </th>
                                            <th>
                                                Address
                                            </th>
                                            <th>
                                                Payment Type
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    {/* end thead*/}
                                    <tbody>
                                        <tr>
                                            <td className="ps-3">
                                                <a href="order-detail.html">#RB5625</a>
                                            </td>
                                            <td>29 April 2024</td>
                                            <td>
                                                <img src="/assets/admin/images/products/product-1(1).png" alt="product-1(1)" className="img-fluid avatar-sm" />
                                            </td>
                                            <td>
                                                <a href="#!">Anna M. Hines</a>
                                            </td>
                                            <td>anna.hines@mail.com</td>
                                            <td>(+1)-555-1564-261</td>
                                            <td>Burr Ridge/Illinois</td>
                                            <td>Credit Card</td>
                                            <td>
                                                <i className="bx bxs-circle text-success me-1" />Completed
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3">
                                                <a href="order-detail.html">#RB9652</a>
                                            </td>
                                            <td>25 April 2024</td>
                                            <td>
                                                <img src="/assets/admin/images/products/product-4.png" alt="product-4" className="img-fluid avatar-sm" />
                                            </td>
                                            <td>
                                                <a href="#!">Judith H. Fritsche</a>
                                            </td>
                                            <td>judith.fritsche.com</td>
                                            <td>(+57)-305-5579-759</td>
                                            <td>SULLIVAN/Kentucky</td>
                                            <td>Credit Card</td>
                                            <td>
                                                <i className="bx bxs-circle text-success me-1" />Completed
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3">
                                                <a href="order-detail.html">#RB5984</a>
                                            </td>
                                            <td>25 April 2024</td>
                                            <td>
                                                <img src="/assets/admin/images/products/product-5.png" alt="product-5" className="img-fluid avatar-sm" />
                                            </td>
                                            <td>
                                                <a href="#!">Peter T. Smith</a>
                                            </td>
                                            <td>peter.smith@mail.com</td>
                                            <td>(+33)-655-5187-93</td>
                                            <td>Yreka/California</td>
                                            <td>Pay Pal</td>
                                            <td>
                                                <i className="bx bxs-circle text-success me-1" />Completed
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3">
                                                <a href="order-detail.html">#RB3625</a>
                                            </td>
                                            <td>21 April 2024</td>
                                            <td>
                                                <img src="/assets/admin/images/products/product-6.png" alt="product-6" className="img-fluid avatar-sm" />
                                            </td>
                                            <td>
                                                <a href="#!">Emmanuel J. Delcid</a>
                                            </td>
                                            <td>
                                                emmanuel.delicid@mail.com
                                            </td>
                                            <td>(+30)-693-5553-637</td>
                                            <td>Atlanta/Georgia</td>
                                            <td>Pay Pal</td>
                                            <td>
                                                <i className="bx bxs-circle text-primary me-1" />Processing
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-3">
                                                <a href="order-detail.html">#RB8652</a>
                                            </td>
                                            <td>18 April 2024</td>
                                            <td>
                                                <img src="/assets/admin/images/products/product-1(2).png" alt="product-1(2)" className="img-fluid avatar-sm" />
                                            </td>
                                            <td>
                                                <a href="#!">William J. Cook</a>
                                            </td>
                                            <td>william.cook@mail.com</td>
                                            <td>(+91)-855-5446-150</td>
                                            <td>Rosenberg/Texas</td>
                                            <td>Credit Card</td>
                                            <td>
                                                <i className="bx bxs-circle text-primary me-1" />Processing
                                            </td>
                                        </tr>
                                    </tbody>
                                    {/* end tbody */}
                                </table>
                                {/* end table */}
                            </div>
                            {/* table responsive */}
                            <div className="card-footer border-top">
                                <div className="row g-3">
                                    <div className="col-sm">
                                        <div className="text-muted">
                                            Showing
                                            <span className="fw-semibold">5</span>
                                            of
                                            <span className="fw-semibold">90,521</span>
                                            orders
                                        </div>
                                    </div>
                                    <div className="col-sm-auto">
                                        <ul className="pagination m-0">
                                            <li className="page-item">
                                                <a href="#" className="page-link"><i className="bx bx-left-arrow-alt" /></a>
                                            </li>
                                            <li className="page-item active">
                                                <a href="#" className="page-link">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a href="#" className="page-link">2</a>
                                            </li>
                                            <li className="page-item">
                                                <a href="#" className="page-link">3</a>
                                            </li>
                                            <li className="page-item">
                                                <a href="#" className="page-link"><i className="bx bx-right-arrow-alt" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end card */}
                    </div>
                    {/* end col */}
                </div> {/* end row */}
            </div>
            {/* End Container Fluid */}
            {/* ========== Footer Start ========== */}
            
            {/* ========== Footer End ========== */}
        </div>

    );
};

export default AdminPageContent;