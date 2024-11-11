import React from 'react';
import WishlistBreadcrumb from './WishlistBreadcrumb';

const Wishlist = () => {
  return (
    <>
    <WishlistBreadcrumb />
    <div>
          <div className="ptb-120 bg-white">
  <div className="container">
    <div className="wishlist-table table-responsive">
      <table className="table">
        <tbody><tr>
            <th className="text-uppercase">Product Name</th>
            <th className="text-uppercase">Price</th>
            <th className="text-uppercase">Stock Status</th>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center gap-4 product-box">
                <button type="button" className="remove_product"><i className="fas fa-close" /></button>
                <div className="feature-image light-bg">
                  <img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="feature image" />
                </div>
                <div>
                  <span className="fs-sm text-uppercase secondary-text-color d-block">Chair</span>
                  <a href="#" className="product-title h6 mt-2 d-block">Smart  Chair</a>
                </div>
              </div>
            </td>
            <td>350.000 VND</td>
            <td>
              <div className="stock-status d-flex align-items-center justify-content-between">
                <span>Out of stock</span>
                <button type="button" className="template-btn primary-btn text-uppercase fs-sm"><span>Add to Cart</span></button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center gap-4 product-box">
                <button type="button" className="remove_product"><i className="fas fa-close" /></button>
                <div className="feature-image light-bg">
                  <img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="feature image" />
                </div>
                <div>
                  <span className="fs-sm text-uppercase secondary-text-color d-block">Wood</span>
                  <a href="#" className="product-title h6 mt-2 d-block">Wooded Weardrobe</a>
                </div>
              </div>
            </td>
            <td>270.000 VND</td>
            <td>
              <div className="stock-status d-flex align-items-center justify-content-between">
                <span>In stock</span>
                <button type="button" className="template-btn primary-btn text-uppercase fs-sm"><span>Add to Cart</span></button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center gap-4 product-box">
                <button type="button" className="remove_product"><i className="fas fa-close" /></button>
                <div className="feature-image light-bg">
                  <img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="feature image" />
                </div>
                <div>
                  <span className="fs-sm text-uppercase secondary-text-color d-block">Plated</span>
                  <a href="#" className="product-title h6 mt-2 d-block">Wooden Table</a>
                </div>
              </div>
            </td>
            <td>375.000 VND</td>
            <td>
              <div className="stock-status d-flex align-items-center justify-content-between">
                <span>In stock</span>
                <button type="button" className="template-btn primary-btn text-uppercase fs-sm"><span>Add to Cart</span></button>
              </div>
            </td>
          </tr>
        </tbody></table>
    </div>
  </div>
</div>

    </div>
      </>
  );
};

export default Wishlist;
