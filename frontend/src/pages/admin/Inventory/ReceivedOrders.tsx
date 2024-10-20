import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const ReceivedOrders: React.FC = () => {
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
              <h4 className="card-title">All Received Order</h4>
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
          <div>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Received Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#583488/80</td>
                    <td>Michael A. Miner</td>
                    <td>03</td>
                    <td>$289.00</td>
                    <td><span className="badge bg-secondary text-white py-1 px-2">Paid</span></td>
                    <td><span className="badge bg-success-subtle text-success py-1 px-2">Delivered</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#456754/80 </td>
                    <td>Theresa T. Brose</td>
                    <td>05</td>
                    <td>$213.00</td>
                    <td><span className="badge bg-warning text-white py-1 px-2">COD</span></td>
                    <td><span className="badge bg-danger-subtle text-danger py-1 px-2">Failed</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#578246/80</td>
                    <td> Cecile D. Gordon</td>
                    <td>03 </td>
                    <td>$735.00</td>
                    <td><span className="badge bg-secondary text-white py-1 px-2">Paid</span></td>
                    <td><span className="badge bg-success-subtle text-success py-1 px-2">Delivered</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#348930/80</td>
                    <td>William Moreno</td>
                    <td>02</td>
                    <td>$324.00</td>
                    <td><span className="badge bg-warning text-white py-1 px-2">COD</span></td>
                    <td><span className="badge bg-warning-subtle text-warning py-1 px-2">Pending</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#391367/80</td>
                    <td>Sarah M. Brooks</td>
                    <td>07 </td>
                    <td>$153.00</td>
                    <td><span className="badge bg-warning text-white py-1 px-2">COD</span></td>
                    <td><span className="badge bg-success-subtle text-success py-1 px-2">Delivered</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#930447/80</td>
                    <td>Joe K. Hall</td>
                    <td>02</td>
                    <td>$424.00</td>
                    <td><span className="badge bg-secondary text-white py-1 px-2">Paid</span></td>
                    <td><span className="badge bg-danger-subtle text-danger py-1 px-2">Failed</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> #462397/80</td>
                    <td>Ralph Hueber</td>
                    <td>01</td>
                    <td>$521.00</td>
                    <td><span className="badge bg-secondary text-white py-1 px-2">Paid</span></td>
                    <td><span className="badge bg-warning-subtle text-warning py-1 px-2">Pending</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#472356/80</td>
                    <td>Sarah Drescher</td>
                    <td>04</td>
                    <td>$313.00</td>
                    <td><span className="badge bg-warning text-white py-1 px-2">COD</span></td>
                    <td><span className="badge bg-success-subtle text-success py-1 px-2">Delivered</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>#448226/80</td>
                    <td>Leonie Meister</td>
                    <td>06 </td>
                    <td>$219.00</td>
                    <td><span className="badge bg-warning text-white py-1 px-2">COD</span></td>
                    <td><span className="badge bg-danger-subtle text-danger py-1 px-2">Failed</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
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
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
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

export default ReceivedOrders;