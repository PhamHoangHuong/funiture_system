import React from 'react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
    return (
        <>
            <section className="checkout-section bg-white ptb-120">
                <div className="container">
                    <div className="returning-box primary-bg-color checkout-toggle-form">
                        <p className="text-white mb-0">Returning Customer? <a href="#" className="form-toggle-btn text-white">Click here to login</a></p>
                        <form className="checkout-login-form toggle-form">
                            <input type="email" className="theme-input" placeholder="Email Address" />
                            <input type="password" className="theme-input" placeholder="Password" />
                            <button type="submit" className="template-btn primary-btn">Login</button>
                        </form>
                    </div>
                    <div className="checkout-coupon-box checkout-toggle-form mt-32">
                        <p className="mb-0 text-main-color">Have a coupon? <a href="#" className="form-toggle-btn text-main-color">Click here to enter your code</a></p>
                        <form className="checkout-coupon-form toggle-form">
                            <input type="text" className="theme-input" placeholder="Coupon" />
                            <button type="submit" className="template-btn primary-btn">Apply Voucher</button>
                        </form>
                    </div>
                    <form className="checkout-form mt-80">
                        <div className="row g-4">
                            <div className="col-xl-6">
                                <h3 className="mb-4 fw-normal">Billing Details</h3>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="email">Email Address*</label>
                                            <input type="email" className="theme-input bg-transparent" id="email" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="input-field">
                                            <label htmlFor="fname">First Name*</label>
                                            <input type="text" className="theme-input bg-transparent" id="fname" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="input-field">
                                            <label htmlFor="lname">Last Name*</label>
                                            <input type="text" className="theme-input bg-transparent" id="lname" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="copmany">Company Name(Optional)</label>
                                            <input type="text" className="theme-input bg-transparent" id="copmany" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="country">Country / Region*</label>
                                            <input type="text" placeholder="United States (US)" className="theme-input bg-transparent" id="country" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="street">Street Address*</label>
                                            <input type="text" placeholder="House number and street number" className="theme-input bg-transparent" id="street" />
                                            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="theme-input bg-transparent mt-4" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="city">Town / City*</label>
                                            <input type="text" className="theme-input bg-transparent" id="city" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label>Sate*</label>
                                            <select className="nice_select w-100">
                                                <option>California</option>
                                                <option>Texas</option>
                                                <option>Florida</option>
                                                <option>Ohio</option>
                                                <option>Alaska</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="zip">Zip Code*</label>
                                            <input type="text" className="theme-input bg-transparent" id="zip" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="phone">Phone*</label>
                                            <input type="text" className="theme-input bg-transparent" id="phone" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-field">
                                            <label htmlFor="note">Order Notes*</label>
                                            <textarea className="theme-input bg-transparent" rows={5} id="note" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <h3 className="mb-4">Your Order</h3>
                                <div className="order-table table-responsive">
                                    <table className="table">
                                        <tbody><tr>
                                            <th>Products</th>
                                            <th>Price</th>
                                        </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center gap-4 product-box">
                                                        <div className="feature-image light-bg">
                                                            <a href="product-details.html"><img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="product" /></a>
                                                        </div>
                                                        <div>
                                                            <span className="fs-sm text-uppercase secondary-text-color d-block">Chair</span>
                                                            <a href="product-details.html" className="product-title h6 mt-2 d-block">Smart Chair</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-main-color-color fw-medium pp-price">$250.00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center gap-4 product-box">
                                                        <div className="feature-image light-bg">
                                                            <a href="product-details.html"><img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="product" /></a>
                                                        </div>
                                                        <div>
                                                            <span className="fs-sm text-uppercase secondary-text-color d-block">Wood</span>
                                                            <a href="product-details.html" className="product-title h6 mt-2 d-block">Wooden Chair</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-main-color-color fw-medium pp-price">$250.00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center gap-4 product-box">
                                                        <div className="feature-image light-bg">
                                                            <a href="product-details.html"><img src="/assets/user/images/products/chair-pd.png" className="img-fluid" alt="product" /></a>
                                                        </div>
                                                        <div>
                                                            <span className="fs-sm text-uppercase secondary-text-color d-block">Furniture</span>
                                                            <a href="product-details.html" className="product-title h6 mt-2 d-block">Wooden Furniture</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-main-color-color fw-medium pp-price">$100.00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="text-main-color fw-medium pp-price">Subtotal</span>
                                                </td>
                                                <td>
                                                    <span className="text-main-color fw-medium pp-price">$600.00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="text-main-color fw-medium pp-price">Shipping</span>
                                                </td>
                                                <td>
                                                    <p className="mb-0 pp-price">Flat rate: <span className="text-main-color fw-medium">$50.00</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="text-main-color fw-medium pp-price">Total Price</span>
                                                </td>
                                                <td>
                                                    <span className="secondary-text-color fw-meidum pp-price">$650.00</span>
                                                </td>
                                            </tr>
                                            <tr className="border-0">
                                                <td colSpan={2} className="border-0">
                                                    <div className="checkout-payment-methods">
                                                        <label>
                                                            <input type="radio" name="payment-method" />
                                                            <span className="radio">Direct Bank Transfer</span>
                                                            <span className="description mb-0 fw-light fs-sm text-color">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="payment-method" />
                                                            <span className="radio">Check Payments</span>
                                                            <span className="description mb-0 fw-light fs-sm text-color">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="payment-method" />
                                                            <span className="radio">Cash On Delivery</span>
                                                            <span className="description mb-0 fw-light fs-sm text-color">Cash Upon Delivery</span>
                                                        </label>
                                                        <label>
                                                            <input type="radio" name="payment-method" />
                                                            <span className="radio">Paypal</span>
                                                        </label>
                                                        <p className="mt-32 text-color fw-light fs-sm">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                                                        <label className="d-flex align-items-center gap-2"><input type="checkbox" /><span className="text-color fw-light fs-sm checkbox"> I have read and agree terms and conditions *</span></label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-0">
                                                <td colSpan={2} className="border-0">
                                                    <Link className="template-btn primary-btn w-100 text-uppercase fw-normal overflow-hidden" to="/payment">Proceed to Payment</Link>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <Link to="/cart">Back to Cart</Link>
            <Link to="/payment">Proceed to Payment</Link>
        </>
    );
};

export default Checkout;
