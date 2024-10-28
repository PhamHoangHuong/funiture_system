import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
// import { Link } from 'react-router-dom';

const OrdersDetails: React.FC = () => {
    return (
        <div>
            {/* Start Container */}
            <div className="container-xxl">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                                            <div>
                                                <h4 className="fw-medium text-dark d-flex align-items-center gap-2">#0758267/90 <span className="badge bg-success-subtle text-success  px-2 py-1 fs-13">Paid</span><span className="border border-warning text-warning fs-13 px-2 py-1 rounded">In Progress</span></h4>
                                                <p className="mb-0">Order / Order Details / #0758267/90 - April 23 , 2024 at 6:23 pm</p>
                                            </div>
                                            <div>
                                                <a href="#!" className="btn btn-outline-secondary">Refund</a>
                                                <a href="#!" className="btn btn-outline-secondary">Return</a>
                                                <a href="#!" className="btn btn-primary">Edit Order</a>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="fw-medium text-dark">Progress</h4>
                                        </div>
                                        <div className="row row-cols-xxl-5 row-cols-md-2 row-cols-1">
                                            <div className="col">
                                                <div className="progress mt-3" style={{ height: 10 }}>
                                                    <div className="progress-bar progress-bar  progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={70}>
                                                    </div>
                                                </div>
                                                <p className="mb-0 mt-2">Order Confirming</p>
                                            </div>
                                            <div className="col">
                                                <div className="progress mt-3" style={{ height: 10 }}>
                                                    <div className="progress-bar progress-bar  progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={70}>
                                                    </div>
                                                </div>
                                                <p className="mb-0 mt-2">Payment Pending</p>
                                            </div>
                                            <div className="col">
                                                <div className="progress mt-3" style={{ height: 10 }}>
                                                    <div className="progress-bar progress-bar  progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{ width: '60%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={70}>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mt-2">
                                                    <p className="mb-0">Processing</p>
                                                    <div className="spinner-border spinner-border-sm text-warning" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="progress mt-3" style={{ height: 10 }}>
                                                    <div className="progress-bar progress-bar  progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style={{ width: '0%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={70}>
                                                    </div>
                                                </div>
                                                <p className="mb-0 mt-2">Shipping</p>
                                            </div>
                                            <div className="col">
                                                <div className="progress mt-3" style={{ height: 10 }}>
                                                    <div className="progress-bar progress-bar  progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style={{ width: '0%' }} aria-valuenow={70} aria-valuemin={0} aria-valuemax={70}>
                                                    </div>
                                                </div>
                                                <p className="mb-0 mt-2">Delivered</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex flex-wrap align-items-center justify-content-between bg-light-subtle gap-2">
                                        <p className="border rounded mb-0 px-2 py-1 bg-body"><i className="bx bx-arrow-from-left align-middle fs-16" /> Estimated shipping date : <span className="text-dark fw-medium">Apr 25 , 2024</span></p>
                                        <div>
                                            <a href="#!" className="btn btn-primary">Make As Ready To Ship</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Product</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle mb-0 table-hover table-centered">
                                                <thead className="bg-light-subtle border-bottom">
                                                    <tr>
                                                        <th>Product Name &amp; Size</th>
                                                        <th>Status</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th>Text</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                                    <img src="assets/images/product/p-1.png"  className="avatar-md" />
                                                                </div>
                                                                <div>
                                                                    <a href="#!" className="text-dark fw-medium fs-15">Men Black Slim Fit T-shirt</a>
                                                                    <p className="text-muted mb-0 mt-1 fs-13"><span>Size : </span>M</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success-subtle text-success  px-2 py-1 fs-13">Ready</span>
                                                        </td>
                                                        <td> 1</td>
                                                        <td>$80.00</td>
                                                        <td> $3.00</td>
                                                        <td>
                                                            $83.00
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                                    <img src="assets/images/product/p-5.png"  className="avatar-md" />
                                                                </div>
                                                                <div>
                                                                    <a href="#!" className="text-dark fw-medium fs-15">Dark Green Cargo Pent</a>
                                                                    <p className="text-muted mb-0 mt-1 fs-13"><span>Size : </span>M</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-light text-dark  px-2 py-1 fs-13">Packaging</span>
                                                        </td>
                                                        <td> 3</td>
                                                        <td>$330.00</td>
                                                        <td> $4.00</td>
                                                        <td>
                                                            $334.00
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                                    <img src="assets/images/product/p-8.png"  className="avatar-md" />
                                                                </div>
                                                                <div>
                                                                    <a href="#!" className="text-dark fw-medium fs-15">Men Dark Brown Wallet</a>
                                                                    <p className="text-muted mb-0 mt-1 fs-13"><span>Size : </span>S</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success-subtle text-success  px-2 py-1 fs-13">Ready</span>
                                                        </td>
                                                        <td> 1</td>
                                                        <td>$132.00</td>
                                                        <td> $5.00</td>
                                                        <td>
                                                            $137.00
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                                                    <img src="assets/images/product/p-10.png"  className="avatar-md" />
                                                                </div>
                                                                <div>
                                                                    <a href="#!" className="text-dark fw-medium fs-15">Kid's Yellow T-shirt</a>
                                                                    <p className="text-muted mb-0 mt-1 fs-13"><span>Size : </span>S </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-light text-dark  px-2 py-1 fs-13">Packaging</span>
                                                        </td>
                                                        <td> 2</td>
                                                        <td>$220.00</td>
                                                        <td> $3.00</td>
                                                        <td>
                                                            $223.00
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Order Timeline</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="position-relative ms-2">
                                            <span className="position-absolute start-0  top-0 border border-dashed h-100" />
                                            <div className="position-relative ps-4">
                                                <div className="mb-4">
                                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle">
                                                        <div className="spinner-border spinner-border-sm text-warning" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </span>
                                                    <div className="ms-2 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                                        <div>
                                                            <h5 className="mb-1 text-dark fw-medium fs-15">The packing has been started</h5>
                                                            <p className="mb-0">Confirmed by Gaston Lapierre</p>
                                                        </div>
                                                        <p className="mb-0">April 23, 2024, 09:40 am</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative ps-4">
                                                <div className="mb-4">
                                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle text-success fs-20">
                                                        <i className="bx bx-check-circle" />
                                                    </span>
                                                    <div className="ms-2 d-flex flex-wrap gap-2  align-items-center justify-content-between">
                                                        <div>
                                                            <h5 className="mb-1 text-dark fw-medium fs-15">The Invoice has been sent to the customer</h5>
                                                            <p className="mb-2">Invoice email was sent to <a href="#!" className="link-primary">hello@dundermuffilin.com</a></p>
                                                            <a href="#!" className="btn btn-light">Resend Invoice</a>
                                                        </div>
                                                        <p className="mb-0">April 23, 2024, 09:40 am</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative ps-4">
                                                <div className="mb-4">
                                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle text-success fs-20">
                                                        <i className="bx bx-check-circle" />
                                                    </span>
                                                    <div className="ms-2 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                                        <div>
                                                            <h5 className="mb-1 text-dark fw-medium fs-15">The Invoice has been created</h5>
                                                            <p className="mb-2">Invoice created by Gaston Lapierre</p>
                                                            <a href="#!" className="btn btn-primary">Download Invoice</a>
                                                        </div>
                                                        <p className="mb-0">April 23, 2024, 09:40 am</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative ps-4">
                                                <div className="mb-4">
                                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle text-success fs-20">
                                                        <i className="bx bx-check-circle" />
                                                    </span>
                                                    <div className="ms-2 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                                        <div>
                                                            <h5 className="mb-1 text-dark fw-medium fs-15">Order Payment</h5>
                                                            <p className="mb-2">Using Master Card</p>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <p className="mb-1 text-dark fw-medium">Status :</p>
                                                                <span className="badge bg-success-subtle text-success  px-2 py-1 fs-13">Paid</span>
                                                            </div>
                                                        </div>
                                                        <p className="mb-0">April 23, 2024, 09:40 am</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative ps-4">
                                                <div className="mb-2">
                                                    <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle text-success fs-20">
                                                        <i className="bx bx-check-circle" />
                                                    </span>
                                                    <div className="ms-2 d-flex flex-wrap gap-2  align-items-center justify-content-between">
                                                        <div>
                                                            <h5 className="mb-2 text-dark fw-medium fs-15">4 Order conform by Gaston Lapierre</h5>
                                                            <a href="#!" className="badge bg-light text-dark fw-normal  px-2 py-1 fs-13">Order 1</a>
                                                            <a href="#!" className="badge bg-light text-dark fw-normal  px-2 py-1 fs-13">Order 2</a>
                                                            <a href="#!" className="badge bg-light text-dark fw-normal  px-2 py-1 fs-13">Order 3</a>
                                                            <a href="#!" className="badge bg-light text-dark fw-normal  px-2 py-1 fs-13">Order 4</a>
                                                        </div>
                                                        <p className="mb-0">April 23, 2024, 09:40 am</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-light-subtle">
                                    <div className="card-body">
                                        <div className="row g-3 g-lg-0">
                                            <div className="col-lg-3 border-end">
                                                <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                                                    <div>
                                                        <p className="text-dark fw-medium fs-16 mb-1">Vender</p>
                                                        <p className="mb-0">Catpiller</p>
                                                    </div>
                                                    <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                                                        <Icon icon="solar:shop-2-bold-duotone" className="fs-35 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 border-end">
                                                <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                                                    <div>
                                                        <p className="text-dark fw-medium fs-16 mb-1">Date</p>
                                                        <p className="mb-0">April 23 , 2024</p>
                                                    </div>
                                                    <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                                                        <Icon icon="solar:calendar-date-bold-duotone" className="fs-35 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 border-end">
                                                <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                                                    <div>
                                                        <p className="text-dark fw-medium fs-16 mb-1">Paid By</p>
                                                        <p className="mb-0">Gaston Lapierre</p>
                                                    </div>
                                                    <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                                                        <Icon icon="solar:user-circle-bold-duotone" className="fs-35 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                                                    <div>
                                                        <p className="text-dark fw-medium fs-16 mb-1">Reference #IMEMO</p>
                                                        <p className="mb-0">#0758267/90</p>
                                                    </div>
                                                    <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                                                        <Icon icon="solar:clipboard-text-bold-duotone" className="fs-35 text-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Order Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="px-0">
                                                    <p className="d-flex mb-0 align-items-center gap-1"><Icon icon="solar:clipboard-text-broken" /> Sub Total : </p>
                                                </td>
                                                <td className="text-end text-dark fw-medium px-0">$777.00</td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <p className="d-flex mb-0 align-items-center gap-1"><Icon icon="solar:ticket-broken" className="align-middle" /> Discount : </p>
                                                </td>
                                                <td className="text-end text-dark fw-medium px-0">-$60.00</td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <p className="d-flex mb-0 align-items-center gap-1"><Icon icon="solar:kick-scooter-broken" className="align-middle" /> Delivery Charge : </p>
                                                </td>
                                                <td className="text-end text-dark fw-medium px-0">$00.00</td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <p className="d-flex mb-0 align-items-center gap-1"><Icon icon="solar:calculator-minimalistic-broken" className="align-middle" /> Estimated Tax (15.5%) : </p>
                                                </td>
                                                <td className="text-end text-dark fw-medium px-0">$20.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-footer d-flex align-items-center justify-content-between bg-light-subtle">
                                <div>
                                    <p className="fw-medium text-dark mb-0">Total Amount</p>
                                </div>
                                <div>
                                    <p className="fw-medium text-dark mb-0">$737.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Payment Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="rounded-3 bg-light avatar d-flex align-items-center justify-content-center">
                                        <img src="assets/images/card/mastercard.svg"  className="avatar-sm" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-dark fw-medium">Master Card</p>
                                        <p className="mb-0 text-dark">xxxx xxxx xxxx 7812</p>
                                    </div>
                                    <div className="ms-auto">
                                        <Icon icon="solar:check-circle-broken" className="fs-22 text-success" />
                                    </div>
                                </div>
                                <p className="text-dark mb-1 fw-medium">Transaction ID : <span className="text-muted fw-normal fs-13"> #IDN768139059</span></p>
                                <p className="text-dark mb-0 fw-medium">Card Holder Name : <span className="text-muted fw-normal fs-13"> Gaston Lapierre</span></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Customer Details</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center gap-2">
                                    <img src="assets/images/users/avatar-1.jpg"  className="avatar rounded-3 border border-light border-3" />
                                    <div>
                                        <p className="mb-1">Gaston Lapierre</p>
                                        <a href="#!" className="link-primary fw-medium">hello@dundermuffilin.com</a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <h5 className="">Contact Number</h5>
                                    <div>
                                        <a href="#!"><i className="bx bx-edit- fs-18" /></a>
                                    </div>
                                </div>
                                <p className="mb-1">(723) 732-760-5760</p>
                                <div className="d-flex justify-content-between mt-3">
                                    <h5 className="">Shipping Address</h5>
                                    <div>
                                        <a href="#!"><i className="bx bx-edit- fs-18" /></a>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1">Wilson's Jewelers LTD</p>
                                    <p className="mb-1">1344 Hershell Hollow Road ,</p>
                                    <p className="mb-1">Tukwila, WA 98168 ,</p>
                                    <p className="mb-1">United States</p>
                                    <p className="">(723) 732-760-5760</p>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <h5 className="">Billing Address</h5>
                                    <div>
                                        <a href="#!"><i className="bx bx-edit- fs-18" /></a>
                                    </div>
                                </div>
                                <p className="mb-1">Same as shipping address</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="mapouter">
                                    <div className="gmap_canvas"><iframe className="gmap_iframe rounded" width="100%" style={{ height: 418 }} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=1980&height=400&hl=en&q=University%20of%20Oxford&t=&z=14&ie=UTF8&iwloc=B&output=embed" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default OrdersDetails;