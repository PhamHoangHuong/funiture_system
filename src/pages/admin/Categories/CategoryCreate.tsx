import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCreate: React.FC = () => {
    return (
        <div>
  {/* Start Container Fluid */}
  <div className="container-xxl">
    <div className="row">
      <div className="col-xl-3 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="bg-light text-center rounded bg-light">
              <img src="assets/images/product/p-1.png"  className="avatar-xxl" />
            </div>
            <div className="mt-3">
              <h4>Fashion Men , Women &amp; Kid's</h4>
              <div className="row">
                <div className="col-lg-4 col-4">
                  <p className="mb-1 mt-2">Created By :</p>
                  <h5 className="mb-0">Seller</h5>
                </div>
                <div className="col-lg-4 col-4">
                  <p className="mb-1 mt-2">Stock :</p>
                  <h5 className="mb-0">46233</h5>
                </div>
                <div className="col-lg-4 col-4">
                  <p className="mb-1 mt-2">ID :</p>
                  <h5 className="mb-0">FS16276</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer border-top">
            <div className="row g-2">
              <div className="col-lg-6">
                <a href="#!" className="btn btn-outline-secondary w-100">Create Category</a>
              </div>
              <div className="col-lg-6">
                <a href="#!" className="btn btn-primary w-100">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-9 col-lg-8 ">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Add Thumbnail Photo</h4>
          </div>
          <div className="card-body">
            {/* File Upload */}
            <form action="https://techzaa.getappui.com/" method="post" className="dropzone" id="myAwesomeDropzone" data-plugin="dropzone" data-previews-container="#file-previews" data-upload-preview-template="#uploadPreviewTemplate">
              <div className="fallback">
                <input name="file" type="file" multiple />
              </div>
              <div className="dz-message needsclick">
                <i className="bx bx-cloud-upload fs-48 text-primary" />
                <h3 className="mt-4">Drop your images here, or <span className="text-primary">click to browse</span></h3>
                <span className="text-muted fs-13">
                  1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">General Information</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="category-title" className="form-label">Category Title</label>
                    <input type="text" id="category-title" className="form-control" placeholder="Enter Title" />
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <form>
                  <label htmlFor="crater" className="form-label">Created By</label>
                  <select className="form-control" id="crater" data-choices data-choices-groups data-placeholder="Select Crater">
                    <option value="">Select Crater</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                    <option value="Other">Other</option>
                  </select>
                </form>
              </div>
              <div className="col-lg-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="product-stock" className="form-label">Stock</label>
                    <input type="number" id="product-stock" className="form-control" placeholder="Quantity" />
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="product-id" className="form-label">Tag ID</label>
                    <input type="number" id="product-id" className="form-control" placeholder="#******" />
                  </div>
                </form>
              </div>
              <div className="col-lg-12">
                <div className="mb-0">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control bg-light-subtle" id="description" rows={7} placeholder="Type description" defaultValue={""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Meta Options</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="meta-title" className="form-label">Meta Title</label>
                    <input type="text" id="meta-title" className="form-control" placeholder="Enter Title" />
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="meta-tag" className="form-label">Meta Tag Keyword</label>
                    <input type="text" id="meta-tag" className="form-control" placeholder="Enter word" />
                  </div>
                </form>
              </div>
              <div className="col-lg-12">
                <div className="mb-0">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control bg-light-subtle" id="description" rows={4} placeholder="Type description" defaultValue={""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-light mb-3 rounded">
          <div className="row justify-content-end g-2">
            <div className="col-lg-2">
              <a href="#!" className="btn btn-outline-secondary w-100">Save Change</a>
            </div>
            <div className="col-lg-2">
              <a href="#!" className="btn btn-primary w-100">Cancel</a>
            </div>
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

export default CategoryCreate;