import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Warehouse: React.FC = () => {
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
                <h4 className="card-title mb-2 d-flex align-items-center gap-2">Total Product Items </h4>
                <p className="text-muted fw-medium fs-22 mb-0">3521 <span className="fs-12">(Items)</span></p>
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
                <h4 className="card-title mb-2 d-flex align-items-center gap-2">In Stock Product </h4>
                <p className="text-muted fw-medium fs-22 mb-0">1311 <span className="fs-12">(Items)</span></p>
              </div>
              <div>
                <div className="avatar-md bg-primary bg-opacity-10 rounded">
                  <Icon icon="solar:reorder-broken" className="fs-32 text-primary avatar-title" />
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
                <h4 className="card-title mb-2 d-flex align-items-center gap-2">Out Of Stock Product </h4>
                <p className="text-muted fw-medium fs-22 mb-0">231 <span className="fs-12">(Items)</span></p>
              </div>
              <div>
                <div className="avatar-md bg-primary bg-opacity-10 rounded">
                  <Icon icon="solar:bag-cross-broken" className="fs-32 text-primary avatar-title" />
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
                <h4 className="card-title mb-2 d-flex align-items-center gap-2">Total Visited Customer</h4>
                <p className="text-muted fw-medium fs-22 mb-0">2334 <span className="badge text-danger bg-danger-subtle fs-12"><i className="bx bx-down-arrow-alt" />4.5%</span> <span className="fs-12">(Last Week)</span></p>
              </div>
              <div>
                <div className="avatar-md bg-primary bg-opacity-10 rounded">
                  <Icon icon="solar:users-group-two-rounded-broken" className="fs-32 text-primary avatar-title" />
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
              <h4 className="card-title">All Warehouse List</h4>
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
                    <th style={{width: 20}}>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                        <label className="form-check-label" htmlFor="customCheck1" />
                      </div>
                    </th>
                    <th>Warehouse ID</th>
                    <th>Warehouse Name</th>
                    <th>Location</th>
                    <th>Manager</th>
                    <th>Contact Number</th>
                    <th>Stock Available </th>
                    <th>Stock Shipping</th>
                    <th>Warehouse Revenue</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-001</td>
                    <td>Central Fulfillment</td>
                    <td>123 Commerce St, NY </td>
                    <td>John Doe</td>
                    <td>+1 (555) 123-4567</td>
                    <td>6490</td>
                    <td>3022</td>
                    <td>$25,737</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-002</td>
                    <td>East Coast Hub</td>
                    <td>456 Market Ave, NY</td>
                    <td>Jane Smith</td>
                    <td>+1 (555) 234-5678</td>
                    <td>7362</td>
                    <td>4253</td>
                    <td>$67,351</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-003</td>
                    <td>West Coast Depot</td>
                    <td>789 Trade Blvd, CA</td>
                    <td>Richard Roe</td>
                    <td>+1 (555) 345-6789</td>
                    <td>8842</td>
                    <td>3221</td>
                    <td>$45,865</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-004</td>
                    <td>Southern Distribution</td>
                    <td>101 Supply Rd, TX</td>
                    <td>Alice Johnson</td>
                    <td>+1 (555) 456-7890</td>
                    <td>5463</td>
                    <td>2100</td>
                    <td>$54,655</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-005</td>
                    <td>Northern Fulfillment</td>
                    <td>202 Logistics Ln, IL</td>
                    <td>Michael Brown</td>
                    <td>+1 (555) 567-8901</td>
                    <td>12643</td>
                    <td>7008</td>
                    <td>$92,533</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-006</td>
                    <td>Midwest Center</td>
                    <td>303 Central St, MO </td>
                    <td>Emily Davis</td>
                    <td>+1 (555) 678-9012</td>
                    <td>7553</td>
                    <td>5600</td>
                    <td>$43,898</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-007</td>
                    <td>Southeast Storage</td>
                    <td>404 Storage Dr, FL</td>
                    <td>William Green</td>
                    <td>+1 (555) 789-0123</td>
                    <td>9381</td>
                    <td>5343</td>
                    <td>$76,909</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-008</td>
                    <td>Northwest Hub</td>
                    <td>505 Commerce Pl, WA</td>
                    <td>Jessica White</td>
                    <td>+1 (555) 890-1234</td>
                    <td>6500</td>
                    <td>3453</td>
                    <td>$32,765</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-009</td>
                    <td>Southwest Fulfillment</td>
                    <td>606 Trade Ave, AZ</td>
                    <td>Christopher Black</td>
                    <td>+1 (555) 901-2345</td>
                    <td>7555</td>
                    <td>9000</td>
                    <td>$67,565</td>
                    <td>
                      <div className="d-flex gap-2">
                        <a href="#!" className="btn btn-light btn-sm"><Icon icon="solar:eye-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><Icon icon="solar:pen-2-broken" className="align-middle fs-18" /></a>
                        <a href="#!" className="btn btn-soft-danger btn-sm"><Icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck2" />
                        <label className="form-check-label" htmlFor="customCheck2" />
                      </div>
                    </td>
                    <td>#WH-010</td>
                    <td>Northeast Depot</td>
                    <td>707 Distribution Rd, MA</td>
                    <td>Patricia Clark</td>
                    <td>+1 (555) 012-3456</td>
                    <td>5499</td>
                    <td>3433</td>
                    <td>$43,765</td>
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

export default Warehouse;