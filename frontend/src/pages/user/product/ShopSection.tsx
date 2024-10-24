import React from "react";
import { Link } from 'react-router-dom';

export default function ShopSection() {
    return (
        <>
            <section className="shop-section bg-white ptb-120">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-xl-3 order-2 order-xl-1">
                            <div className="shop-sidebar pe-xl-5 mt-5 mt-xl-0">
                                <div className="sidebar-widget search-widget">
                                    <form>
                                        <input type="text" placeholder="Search Here..." className="theme-input fw-light" />
                                    </form>
                                </div>
                                <div className="sidebar-widget categories-widget mt-60">
                                    <h4 className="widget-title position-relative fw-normal mb-5">Categories</h4>
                                    <ul className="sidebar-check-fields">
                                        <li><label><input type="checkbox" /> <span>Anklets</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Bracelets</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Pendants</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Earrings</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Gift Card</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Neaklaces</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Personalized</span></label></li>
                                        <li><label><input type="checkbox" /> <span>Rings</span></label></li>
                                    </ul>
                                </div>
                                <div className="sidebar-widget filter-widget mt-60">
                                    <h4 className="widget-title position-relative mb-5">Filter by price</h4>
                                    <div className="ur-pricing-range" />
                                    <form action="#" className="d-flex align-items-center justify-content-between mt-4">
                                        <p className="mb-0">
                                            <label htmlFor="amount">Price:</label>
                                            <input type="text" id="amount" readOnly />
                                        </p>
                                        <button type="submit" className="submit-btn">Filter<span className="ms-2"><i className="fas fa-arrow-right" /></span></button>
                                    </form>
                                </div>
                                <div className="sidebar-widget color-select-widget mt-60">
                                    <h4 className="widget-title position-relative mb-5">Select Color</h4>
                                    <ul className="color-select">
                                        <li><label><input type="checkbox" /><span className="bg-soft-gold">Soft Gold <span>(12)</span></span></label></li>
                                        <li><label><input type="checkbox" /><span className="bg-light-pink">Light Pink <span>(05)</span></span></label></li>
                                        <li><label><input type="checkbox" /><span className="bg-green-touch">Green Touch <span>(02)</span></span></label></li>
                                        <li><label><input type="checkbox" /><span className="bg-navy-blue">Navy Blue <span>(05)</span></span></label></li>
                                        <li><label><input type="checkbox" /><span className="bg-gray-white">Gray White <span>(16)</span></span></label></li>
                                    </ul>
                                </div>
                                <div className="sidebar-widget brand-widget mt-60">
                                    <h4 className="widget-title position-relative fw-normal mb-5">Brands</h4>
                                    <ul className="sidebar-check-fields">
                                        <li><label><input type="checkbox" /> <span>Juliate <span>(09)</span></span></label></li>
                                        <li><label><input type="checkbox" /> <span>H&amp;M <span>(50)</span></span></label></li>
                                        <li><label><input type="checkbox" /> <span>Macro <span>(08)</span></span></label></li>
                                        <li><label><input type="checkbox" /> <span>Harmoni <span>(13)</span></span></label></li>
                                        <li><label><input type="checkbox" /> <span>Sowat <span>(03)</span></span></label></li>
                                    </ul>
                                </div>
                                <div className="sidebar-widget products-widget mt-60">
                                    <h4 className="widget-title position-relative mb-5">Latest products</h4>
                                    <ul className="sidebar-products">
                                        <li className="d-flex align-items-center gap-4">
                                            <div className="flex-shrink-0 thumbnail light-bg p-3">
                                                <a href="product-details.html"><img src="/assets/user/images/products/chair-pd.png" alt="thumbnail" className="img-fluid" /></a>
                                            </div>
                                            <div>
                                                <a href="product-details.html"><h6 className="mb-3">Ambert Xoss Chair</h6></a>
                                                <span className="price primary-text-color">$165.00</span>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center gap-4">
                                            <div className="flex-shrink-0 thumbnail light-bg p-3">
                                                <a href="product-details.html"><img src="/assets/user/images/products/chair-md-2.png" alt="thumbnail" className="img-fluid" /></a>
                                            </div>
                                            <div>
                                                <a href="product-details.html"><h6 className="mb-3">Ambert Xoss Chair</h6></a>
                                                <span className="price primary-text-color">$150.00</span>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center gap-4">
                                            <div className="flex-shrink-0 thumbnail light-bg p-3">
                                                <a href="product-details.html"><img src="/assets/user/images/products/table-md.png" alt="thumbnail" className="img-fluid" /></a>
                                            </div>
                                            <div>
                                                <a href="product-details.html"><h6 className="mb-3">Ambert Xoss Chair</h6></a>
                                                <span className="price primary-text-color">$125.00</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 order-1 order-xl-2">
                            <div className="shop-grid">
                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                    <p className="mb-0 fw-light">Showing 1-12 of 88 results</p>
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="select-wrapper">
                                            <select className="nice_select">
                                                <option>Default Sorting</option>
                                                <option>Sort by Price</option>
                                                <option>Sort by Popularity</option>
                                            </select>
                                        </div>
                                        <div className="layout-grid d-flex align-items-center">
                                            <a href="shop.html" className="active">
                                                <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="10.7139" width={9} height={3} fill="#121111" />
                                                    <rect x="10.7139" y={7} width={9} height={3} fill="#121111" />
                                                    <rect x="10.7139" y={14} width={9} height={3} fill="#121111" />
                                                    <rect width={9} height={3} fill="#121111" />
                                                    <rect y={7} width={9} height={3} fill="#121111" />
                                                    <rect y={14} width={9} height={3} fill="#121111" />
                                                </svg>
                                            </a>
                                            <a href="shop-list.html">
                                                <svg width={20} height={17} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="5.71387" width="14.2857" height={3} fill="#121111" />
                                                    <rect x="5.71387" y={7} width="14.2857" height={3} fill="#121111" />
                                                    <rect x="5.71387" y={14} width="14.2857" height={3} fill="#121111" />
                                                    <rect width="3.80952" height={3} fill="#121111" />
                                                    <rect y={7} width="3.80952" height={3} fill="#121111" />
                                                    <rect y={14} width="3.80952" height={3} fill="#121111" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="products-grid mt-40">
                                    <div className="row g-4">
                                        <div className="col-lg-4 col-md-6">
                                            <div className="vr5-product-card">
                                                <div className="feature-image position-relative h-300">
                                                    <img src="/assets/user/images/products/chair-md-2.png" alt="not found" className="img-fluid" />
                                                    <div className="action-box">
                                                        <a href="#" className="cart-btn">Add to Cart</a>
                                                        <div className="action-btns">
                                                            <a href="#">
                                                                <svg width={14} height={13} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6.97266 2.375L7.30078 2.07422C8.20312 1.17188 9.48828 0.761719 10.7188 0.980469C12.6055 1.28125 14 2.92188 14 4.83594V4.97266C14 6.12109 13.5078 7.21484 12.6875 7.98047L7.73828 12.6016C7.54688 12.793 7.27344 12.875 7 12.875C6.69922 12.875 6.42578 12.793 6.23438 12.6016L1.28516 7.98047C0.464844 7.21484 0 6.12109 0 4.97266V4.83594C0 2.92188 1.36719 1.28125 3.25391 0.980469C4.48438 0.761719 5.76953 1.17188 6.67188 2.07422L6.97266 2.375ZM6.97266 3.63281L6.04297 2.67578C5.35938 1.99219 4.375 1.66406 3.39062 1.82812C1.94141 2.07422 0.847656 3.33203 0.847656 4.83594V4.97266C0.847656 5.875 1.23047 6.72266 1.88672 7.32422L6.83594 11.9453C6.86328 12 6.91797 12 6.97266 12C7.05469 12 7.10938 12 7.13672 11.9453L12.0859 7.32422C12.7422 6.72266 13.125 5.875 13.125 4.97266V4.83594C13.125 3.33203 12.0312 2.07422 10.582 1.82812C9.59766 1.66406 8.61328 1.99219 7.92969 2.67578L6.97266 3.63281Z" fill="#121111" />
                                                                </svg>
                                                            </a>
                                                            <a href="#">
                                                                <svg width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M0.4375 5.125C0.191406 5.125 0 4.93359 0 4.6875C0 4.46875 0.191406 4.25 0.4375 4.25H12.4961L9.73438 1.51562C9.57031 1.35156 9.57031 1.05078 9.73438 0.886719C9.89844 0.722656 10.1992 0.722656 10.3633 0.886719L13.8633 4.38672C13.9453 4.46875 14 4.57812 14 4.6875C14 4.82422 13.9453 4.93359 13.8633 5.01562L10.3633 8.51562C10.1992 8.67969 9.89844 8.67969 9.73438 8.51562C9.57031 8.35156 9.57031 8.05078 9.73438 7.88672L12.4961 5.125H0.4375ZM13.5625 10.375C13.7812 10.375 14 10.5938 14 10.8125C14 11.0586 13.7812 11.25 13.5625 11.25H1.47656L4.23828 14.0117C4.40234 14.1758 4.40234 14.4766 4.23828 14.6406C4.07422 14.8047 3.77344 14.8047 3.60938 14.6406L0.109375 11.1406C0.0273438 11.0586 0 10.9492 0 10.8125C0 10.7031 0.0273438 10.5938 0.109375 10.5117L3.60938 7.01172C3.77344 6.84766 4.07422 6.84766 4.23828 7.01172C4.40234 7.17578 4.40234 7.47656 4.23828 7.64062L1.47656 10.375H13.5625Z" fill="#121111" />
                                                                </svg>
                                                            </a>
                                                            <a href="#product_view" data-bs-toggle="modal">
                                                                <svg width={17} height={13} viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.375 6.75C12.375 8.69141 10.7891 10.25 8.875 10.25C6.93359 10.25 5.375 8.69141 5.375 6.75C5.375 4.83594 6.93359 3.25 8.875 3.25C10.7891 3.25 12.375 4.83594 12.375 6.75ZM8.875 4.125C7.39844 4.125 6.25 5.30078 6.25 6.75C6.25 8.19922 7.39844 9.375 8.875 9.375C10.3242 9.375 11.5 8.19922 11.5 6.75C11.5 5.30078 10.3242 4.125 8.875 4.125ZM14.125 2.83984C15.4102 4.01562 16.2578 5.4375 16.668 6.42188C16.75 6.64062 16.75 6.88672 16.668 7.10547C16.2578 8.0625 15.4102 9.48438 14.125 10.6875C12.8398 11.8906 11.0625 12.875 8.875 12.875C6.66016 12.875 4.88281 11.8906 3.59766 10.6875C2.3125 9.48438 1.46484 8.0625 1.05469 7.10547C0.972656 6.88672 0.972656 6.64062 1.05469 6.42188C1.46484 5.4375 2.3125 4.01562 3.59766 2.83984C4.88281 1.63672 6.66016 0.625 8.875 0.625C11.0625 0.625 12.8398 1.63672 14.125 2.83984ZM1.875 6.75C2.23047 7.625 3.02344 8.9375 4.19922 10.0312C5.375 11.125 6.93359 12 8.875 12C10.7891 12 12.3477 11.125 13.5234 10.0312C14.6992 8.9375 15.4922 7.625 15.875 6.75C15.4922 5.875 14.6992 4.5625 13.5234 3.46875C12.3477 2.375 10.7891 1.5 8.875 1.5C6.93359 1.5 5.375 2.375 4.19922 3.46875C3.02344 4.5625 2.23047 5.875 1.875 6.75Z" fill="#121111" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-content">
                                                    <span className="fw-semibold subtitle text-uppercase">Levies Cotton</span>
                                                    <Link to="/products/1"><h6 className="fw-semibold mt-3">White Comfort Chairs</h6></Link>
                                                    <p className="fs-sm mb-4">Nam accumsan urna leo fermentum egestas, erat id vehicula at.</p>
                                                    <span className="text-main-color fw-bold fs-sm">$893.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-60">
                                    <ul className="template-pagination d-inline-flex align-items-center gap-3">
                                        <li><a href="#" className="active">01</a></li>
                                        <li><a href="#">02</a></li>
                                        <li><a href="#">03</a></li>
                                        <li><a href="#">04</a></li>
                                        <li><a href="#"><i className="fa-solid fa-angles-right" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}