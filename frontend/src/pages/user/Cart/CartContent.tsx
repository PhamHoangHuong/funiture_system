import React from 'react';
import { Link } from 'react-router-dom';
import CartBreadcrumb from './CartBreadcrumb';

const CartContent: React.FC = () => {


    return (
        <>
            <CartBreadcrumb />
            <div className="ptb-120 bg-white">
                <div className="container">
                    <div className="cart-table-wrapper table-responsive">
                        <table className="cart-table table">
                            <tbody><tr>
                                <th className="text-center">Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th className="text-end">Subtotal</th>
                            </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center gap-4 product-box">
                                            <button type="button" className="remove_product"><i className="fas fa-close" /></button>
                                            <div className="feature-image light-bg">
                                                <img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="product" />
                                            </div>
                                            <div>
                                                <span className="fs-sm text-uppercase secondary-text-color d-block">Chair</span>
                                                <a href="#" className="product-title h6 mt-2 d-block">Smart Chair</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="fw-medium text-main-color">350.000 VND</span>
                                    </td>
                                    <td>
                                        <div className="quantity d-flex align-items-center">
                                            <input type="text" defaultValue={1} />
                                            <div className="step-btns">
                                                <button className="increment"><i className="fa-solid fa-angle-up" /></button>
                                                <button className="decrement"><i className="fa-solid fa-angle-down" /></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-main-color fw-medium d-block text-end">350.000 VND</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center gap-4 product-box">
                                            <button type="button" className="remove_product"><i className="fas fa-close" /></button>
                                            <div className="feature-image light-bg">
                                                <img src="/assets/user/images/products/table.png" className="img-fluid" alt="product" />
                                            </div>
                                            <div>
                                                <span className="fs-sm text-uppercase secondary-text-color d-block">Weardrobe</span>
                                                <a href="#" className="product-title h6 mt-2 d-block">Wooden Table</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="fw-medium text-main-color">550.000 VND</span>
                                    </td>
                                    <td>
                                        <div className="quantity d-flex align-items-center">
                                            <input type="text" defaultValue={1} />
                                            <div className="step-btns">
                                                <button className="increment"><i className="fa-solid fa-angle-up" /></button>
                                                <button className="decrement"><i className="fa-solid fa-angle-down" /></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-main-color fw-medium d-block text-end">550.000 VND</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap">
                                            <form className="cart-coupon-form d-flex align-items-center">
                                                <input type="text" placeholder="Coupon Code" className="theme-input" />
                                                <button type="submit" className="submit-btn template-btn primary-btn">Apply Coupon</button>
                                            </form>
                                            <button type="button" className="template-btn primary-btn"><span>Update Cart</span></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody></table>
                    </div>
                </div>
            </div>

            <section className="pb-140 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="cart-calculator">
                                <h3 className="mb-40">Cart Totals</h3>
                                <form className="cart-calculator-form overflow-hidden overflow-x-scroll">
                                    <table className="table">
                                        <tbody><tr>
                                            <td>Subtotal</td>
                                            <td>$1100.00</td>
                                        </tr>
                                            <tr>
                                                <td>Shipping</td>
                                                <td>
                                                    <div className="shipping-method">
                                                        <label>
                                                            <input type="radio" name="shipping" />
                                                            <span>Free Shipping</span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="shipping" />
                                                            <span>Flat Rate</span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="shipping" />
                                                            <span>Local Pickup</span>
                                                        </label>
                                                        <p className="my-4 fs-sm fw-light">Shipping options will be updated during checkout</p>
                                                        <a href="#" className="text-main-color">Calculate Shipping</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total</td>
                                                <td>$1100.00</td>
                                            </tr>
                                        </tbody></table>
                                    {/* <button type="submit" className="template-btn primary-btn text-uppercase mt-5"><span>Proceed to checkout</span></button> */}
                                    <Link className="template-btn primary-btn text-uppercase mt-5" to="/checkout">Checkout</Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
};


export default CartContent;
