export default function UserHeader() {
    return (
        <>
            <header className="vr5-header-section sticky-header">
                <div className="container-1700 position-relative">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-5">
                            <div className="logo-wrapper">
                                <a href="index.html">
                                    <img
                                        src="assets/user/images/logo-white.png"
                                        className="img-fluid"
                                        alt="logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-6 d-none d-xl-block">
                            <nav className="header-navigation text-center text-xl-start vr5-header-navigation">
                                <ul>
                                    <li className="has-submenu">
                                        <a href="javascript:void(0)">Home</a>
                                        <ul className="submenu-wrapper">
                                            <li>
                                                <a href="index.html">
                                                    Home One
                                                </a>
                                            </li>
                                            <li>
                                                <a href="index-2.html">
                                                    Home Two
                                                </a>
                                            </li>
                                            <li>
                                                <a href="index-3.html">
                                                    Home Three
                                                </a>
                                            </li>
                                            <li>
                                                <a href="index-4.html">
                                                    Home Four
                                                </a>
                                            </li>
                                            <li>
                                                <a href="index-5.html">
                                                    Home Five
                                                </a>
                                            </li>
                                            <li>
                                                <a href="index-6.html">
                                                    Home Six
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="javascript:void(0)">Pages</a>
                                        <div className="ur-megamenu">
                                            <div className="megamenu-row">
                                                <div className="megamenu-column border-r">
                                                    <h6 className="column-title">
                                                        Product Pages
                                                    </h6>
                                                    <ul className="pages-list">
                                                        <li>
                                                            <a href="shop.html">
                                                                Shop Page
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop-list.html">
                                                                Shop List
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-details.html">
                                                                Product Details
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                Shop Layout 04
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="megamenu-column border-r">
                                                    <h6 className="column-title">
                                                        Filter Layout
                                                    </h6>
                                                    <ul className="pages-list">
                                                        <li>
                                                            <a href="shop-list.html">
                                                                Filter Sidebar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                Filter On Top
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop.html">
                                                                Filter Side Out
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-details.html">
                                                                Modal Filter
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="megamenu-column border-r">
                                                    <h6 className="column-title">
                                                        Product Type
                                                    </h6>
                                                    <ul className="pages-list">
                                                        <li>
                                                            <a href="shop-list.html">
                                                                Filter Sidebar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                Filter On Top
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="shop.html">
                                                                Filter Side Out
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="product-details.html">
                                                                Modal Filter
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="megamenu-column">
                                                    <h6 className="column-title">
                                                        Shop Pages
                                                    </h6>
                                                    <ul className="pages-list">
                                                        <li>
                                                            <a href="login.html">
                                                                My Account
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="cart.html">
                                                                Cart
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="checkout.html">
                                                                Checkout
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="wishlist.html">
                                                                Wishlist
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="order-tracking.html">
                                                                Order Tracking
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="megamenu-column banner">
                                                    <div className="megamenu-banner">
                                                        <a
                                                            href="product-details.html"
                                                            className="p-0"
                                                        >
                                                            <img
                                                                src="assets/images/banner/banner-1.jpg"
                                                                alt="not found"
                                                                className="img-fluid"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="fullwidth-megamenu">
                                        <a href="javascript:void(0)">
                                            Shop{" "}
                                            <i className="fas fa-angle-down" />
                                        </a>
                                        <div className="megamenu-3">
                                            <div className="row">
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Shop Pages
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Filters area
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Hidden
                                                                    sidebar
                                                                    <span className="hot-badge">
                                                                        Hot
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    No page
                                                                    heading
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Small
                                                                    categories
                                                                    menu
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Masonry grid
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    With
                                                                    background
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Category
                                                                    description
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Product Hovers
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Summary on
                                                                    hover
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Icons on
                                                                    hover
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Icons &amp;
                                                                    Add to cart
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Full info on
                                                                    image{" "}
                                                                    <span className="new-badge">
                                                                        New
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    All Info on
                                                                    hover
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Button on
                                                                    image
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Standard
                                                                    button
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Product Pages
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="shop.html">
                                                                    Shop page
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="shop-list.html">
                                                                    Shop list
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details.html">
                                                                    Product
                                                                    details
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details-v2.html">
                                                                    Product
                                                                    Details 2
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details-v3.html">
                                                                    Product
                                                                    Details 3
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Massonry
                                                                    Product
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Product
                                                                    Slider
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Product Image
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Filters area
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Hidden
                                                                    sidebar
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    No page
                                                                    heading{" "}
                                                                    <span className="feature-badge">
                                                                        Featured
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Small
                                                                    categories
                                                                    menu
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Masonry grid
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    With
                                                                    background
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Category
                                                                    description
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Features
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="#">
                                                                    Filters area
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Hidden
                                                                    sidebar
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    No page
                                                                    heading
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Small
                                                                    categories
                                                                    menu
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Masonry grid
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    With
                                                                    background
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Category
                                                                    description
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-2">
                                                    <div className="megamenu-column">
                                                        <h6 className="mb-4">
                                                            Shop Pages
                                                        </h6>
                                                        <ul className="menu-list">
                                                            <li>
                                                                <a href="shop.html">
                                                                    Shop page
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="shop-list.html">
                                                                    Shop list
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details.html">
                                                                    Product
                                                                    details
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details-v2.html">
                                                                    Product
                                                                    Details 2
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="product-details-v3.html">
                                                                    Product
                                                                    Details 3
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Massonry
                                                                    Product
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Product
                                                                    Slider
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="javascript:void(0)">
                                            Products
                                        </a>
                                        <ul className="submenu-wrapper">
                                            <li>
                                                <a href="product-details.html">
                                                    Product layout 01
                                                </a>
                                            </li>
                                            <li>
                                                <a href="product-details-v2.html">
                                                    Product layout 02
                                                </a>
                                            </li>
                                            <li>
                                                <a href="product-details-v3.html">
                                                    Product layout 03
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="javascript:void(0)">Blog</a>
                                        <div className="megamenu-2 shadow-none">
                                            <div className="row">
                                                <div className="col-xl-3">
                                                    <div className="megamenu-column border-r">
                                                        <h6 className="column-title">
                                                            Filter Layout
                                                        </h6>
                                                        <ul className="pages-list">
                                                            <li>
                                                                <a href="blog.html">
                                                                    Blog List
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="blog-single.html">
                                                                    Blog Details
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Left Sidebar
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Right
                                                                    Sidebar
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3">
                                                    <div className="megamenu-column border-r">
                                                        <h6 className="column-title">
                                                            Filter Layout
                                                        </h6>
                                                        <ul className="pages-list">
                                                            <li>
                                                                <a href="blog.html">
                                                                    Blog List
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="blog-single.html">
                                                                    Blog Details
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Left Sidebar
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Right
                                                                    Sidebar
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="sidebar-widget">
                                                        <ul className="latest-posts">
                                                            <li className="d-flex align-items-center gap-3">
                                                                <div className="feature-image pe-1">
                                                                    <a href="product-details.html">
                                                                        <img
                                                                            src="assets/images/blog/blog-sidebar-1.jpg"
                                                                            alt="not found"
                                                                            className="img-fluid"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <span className="fs-sm fw-light text-color date">
                                                                        Sep 25,
                                                                        2023
                                                                    </span>
                                                                    <a href="product-details.html">
                                                                        <h6 className="mb-0 mt-3 fw-regular">
                                                                            Deal
                                                                            Going
                                                                            Get
                                                                            The
                                                                            Offer
                                                                            For
                                                                            All
                                                                            Products
                                                                            Today
                                                                        </h6>
                                                                    </a>
                                                                </div>
                                                            </li>
                                                            <li className="d-flex align-items-center gap-3">
                                                                <div className="feature-image pe-1">
                                                                    <a href="product-details.html">
                                                                        <img
                                                                            src="assets/images/blog/blog-sidebar-2.jpg"
                                                                            alt="not found"
                                                                            className="img-fluid"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div>
                                                                    <span className="fs-sm fw-light text-color date">
                                                                        Sep 25,
                                                                        2023
                                                                    </span>
                                                                    <a href="product-details.html">
                                                                        <h6 className="mb-0 mt-3 fw-regular">
                                                                            Deal
                                                                            Going
                                                                            Get
                                                                            The
                                                                            Offer
                                                                            For
                                                                            All
                                                                            Products
                                                                            Today
                                                                        </h6>
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="contact.html">Contact</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-xl-3 col-7">
                            <div className="header-right vr5-header-right d-flex align-items-center justify-content-end">
                                <div className="header-icons d-inline-flex align-items-center gap-prt-16 gap-32">
                                    <div className="header-search">
                                        <button
                                            type="button"
                                            className="header-search-btn"
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.2049 12.952L18 16.7462L16.7462 18L12.952 14.2049C11.5402 15.3366 9.78419 15.9522 7.9748 15.9496C3.57271 15.9496 0 12.3769 0 7.9748C0 3.57271 3.57271 0 7.9748 0C12.3769 0 15.9496 3.57271 15.9496 7.9748C15.9522 9.78419 15.3366 11.5402 14.2049 12.952ZM12.4274 12.2945C13.5519 11.138 14.18 9.58786 14.1774 7.9748C14.1774 4.54741 11.4013 1.77218 7.9748 1.77218C4.54741 1.77218 1.77218 4.54741 1.77218 7.9748C1.77218 11.4013 4.54741 14.1774 7.9748 14.1774C9.58786 14.18 11.138 13.5519 12.2945 12.4274L12.4274 12.2945V12.2945Z"
                                                    fill="#121111"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="header-wishlist d-none d-sm-inline-block">
                                        <a href="#">
                                            <svg
                                                width={20}
                                                height={18}
                                                viewBox="0 0 20 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.73861 1.48886C12.026 -0.564802 15.5607 -0.496639 17.7644 1.71088C19.967 3.91938 20.043 7.43661 17.9942 9.7308L9.73667 18L1.4811 9.7308C-0.567698 7.43661 -0.490771 3.91354 1.71091 1.71088C3.91648 -0.493718 7.44443 -0.567724 9.73861 1.48886V1.48886ZM16.3855 3.08681C14.9249 1.62422 12.5684 1.56482 11.0396 2.93783L9.73959 4.10439L8.43864 2.9388C6.90496 1.56384 4.55332 1.62422 3.08878 3.08876C1.63788 4.53967 1.56484 6.86209 2.90182 8.39674L9.73764 15.2433L16.5735 8.39772C17.9114 6.86209 17.8384 4.54259 16.3855 3.08681V3.08681Z"
                                                    fill="#121111"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="header-cart">
                                        <span className="cart-icon">
                                            <svg
                                                width={21}
                                                height={21}
                                                viewBox="0 0 21 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18.7188 14V2H20.7188V0H17.7188C17.4535 0 17.1992 0.105357 17.0116 0.292893C16.8241 0.48043 16.7188 0.734784 16.7188 1V13H4.28075L2.28075 5H14.7188V3H0.998751C0.846745 3 0.696739 3.03466 0.560137 3.10134C0.423535 3.16801 0.303931 3.26495 0.210415 3.38479C0.116899 3.50462 0.0519333 3.6442 0.0204544 3.79291C-0.0110245 3.94162 -0.00818793 4.09555 0.0287495 4.243L2.52875 14.243C2.58292 14.4592 2.7078 14.6512 2.88354 14.7883C3.05929 14.9255 3.27582 15 3.49875 15H17.7188C17.984 15 18.2383 14.8946 18.4259 14.7071C18.6134 14.5196 18.7188 14.2652 18.7188 14V14ZM16.7188 21C17.2492 21 17.7579 20.7893 18.133 20.4142C18.508 20.0391 18.7188 19.5304 18.7188 19C18.7188 18.4696 18.508 17.9609 18.133 17.5858C17.7579 17.2107 17.2492 17 16.7188 17C16.1883 17 15.6796 17.2107 15.3045 17.5858C14.9295 17.9609 14.7188 18.4696 14.7188 19C14.7188 19.5304 14.9295 20.0391 15.3045 20.4142C15.6796 20.7893 16.1883 21 16.7188 21ZM4.71875 21C5.24918 21 5.75789 20.7893 6.13296 20.4142C6.50804 20.0391 6.71875 19.5304 6.71875 19C6.71875 18.4696 6.50804 17.9609 6.13296 17.5858C5.75789 17.2107 5.24918 17 4.71875 17C4.18832 17 3.67961 17.2107 3.30454 17.5858C2.92946 17.9609 2.71875 18.4696 2.71875 19C2.71875 19.5304 2.92946 20.0391 3.30454 20.4142C3.67961 20.7893 4.18832 21 4.71875 21Z"
                                                    fill="#121111"
                                                />
                                            </svg>
                                            <sub className="cart-item">2</sub>
                                        </span>
                                        <span className="cart-amount fw-medium text-white ms-3 d-none d-xl-inline-block">
                                            $225.00
                                        </span>
                                    </div>
                                </div>
                                <div className="header-toggle">
                                    <button className="header-toggle-btn offcanvus-toggle d-none d-xl-block">
                                        <span />
                                        <span />
                                        <span />
                                    </button>
                                    <button className="header-toggle-btn mobile-menu-toggle d-xl-none">
                                        <span />
                                        <span />
                                        <span />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="header-search-box">
                <form action="#">
                    <label className="position-relative">
                        <i className="fas fa-magnifying-glass" />
                        <input type="text" placeholder="Search here...." />
                    </label>
                </form>
                <a href="#" className="search-close">
                    <i className="fa-solid fa-xmark" />
                </a>
            </div>

            <div className="mobile-menu">
                <a href="javascript:void(0)" className="close">
                    <i className="fas fa-xmark" />
                </a>
                <a href="#" className="logo py-3">
                    <img
                        src="assets/images/logo.png"
                        alt="logo"
                        className="img-fluid"
                    />
                </a>
                <ul className="mobile-nav-menu">
                    <li className="has-submenu">
                        <a href="javascript:void(0)">Home</a>
                        <i className="fas fa-angle-down" />
                        <ul className="submenu-wrapper">
                            <li>
                                <a href="index.html">Home Page 1</a>
                            </li>
                            <li>
                                <a href="index-2.html">Home Page 2</a>
                            </li>
                            <li>
                                <a href="index-3.html">Home Page 3</a>
                            </li>
                            <li>
                                <a href="index-4.html">Home Page 4</a>
                            </li>
                            <li>
                                <a href="index-5.html">Home Page 5</a>
                            </li>
                            <li>
                                <a href="index-6.html">Home Page 6</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="about.html">About</a>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)">Pages</a>
                        <i className="fas fa-angle-down" />
                        <ul className="submenu-wrapper">
                            <li>
                                <a href="cart.html">Cart</a>
                            </li>
                            <li>
                                <a href="checkout.html">Checkout</a>
                            </li>
                            <li>
                                <a href="faq.html">Faq</a>
                            </li>
                            <li>
                                <a href="wishlist.html">Wishlist</a>
                            </li>
                            <li>
                                <a href="order-tracking.html">Order Tracking</a>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)">Blog</a>
                        <i className="fas fa-angle-down" />
                        <ul className="submenu-wrapper">
                            <li>
                                <a href="blog.html">Blog List</a>
                            </li>
                            <li>
                                <a href="blog-single.html">Blog Details</a>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)">Shop</a>
                        <i className="fas fa-angle-down" />
                        <ul className="submenu-wrapper">
                            <li>
                                <a href="shop.html">Shop Grid</a>
                            </li>
                            <li>
                                <a href="shop-list.html">Shop List</a>
                            </li>
                            <li>
                                <a href="product-details.html">
                                    Product Details
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="wishlist.html">Wishlist</a>
                    </li>
                    <li>
                        <a href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>

            <div className="cart-drawer position-fixed">
                <div className="drawer-close d-flex align-items-center justify-content-between position-absolute start-0 top-0 w-100 px-4 py-4 border-bottom">
                    <h6 className="mb-0 fw-medium">Your Cart(03)</h6>
                    <a href="javascript:void(0)" className="drawer-close">
                        <i className="fas fa-xmark" />
                    </a>
                </div>
                <ul className="cart-list">
                    <li className="d-flex align-items-center gap-3">
                        <div className="feature-image light-bg">
                            <a href="product-details.html">
                                <img
                                    src="assets/images/products/pds-sm-1.png"
                                    alt="feature image"
                                    className="img-fluid"
                                />
                            </a>
                        </div>
                        <div className="d-flex justify-content-between gap-3 w-100">
                            <div>
                                <a href="product-details.html">
                                    <h6 className="mb-1">
                                        Sunsine Table Chairs
                                    </h6>
                                </a>
                                <span className="price fw-medium secondary-text-color d-block mb-1 fs-sm">
                                    $250.00
                                </span>
                                <div className="quantity d-flex align-items-center">
                                    <input type="text" defaultValue={1} />
                                    <div className="step-btns">
                                        <button className="increment">
                                            <i className="fa-solid fa-angle-up" />
                                        </button>
                                        <button className="decrement">
                                            <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a href="javascript:void(0)" className="close">
                                    <i className="fas fa-xmark" />
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="d-flex align-items-center gap-4">
                        <div className="feature-image light-bg">
                            <a href="product-details.html">
                                <img
                                    src="assets/images/products/pds-sm-2.png"
                                    alt="feature image"
                                    className="img-fluid"
                                />
                            </a>
                        </div>
                        <div className="d-flex justify-content-between gap-3 w-100">
                            <div>
                                <a href="product-details.html">
                                    <h6 className="mb-1">Lviano chair</h6>
                                </a>
                                <span className="price fw-medium secondary-text-color d-block mb-1 fs-sm">
                                    $250.00
                                </span>
                                <div className="quantity d-flex align-items-center">
                                    <input type="text" defaultValue={1} />
                                    <div className="step-btns">
                                        <button className="increment">
                                            <i className="fa-solid fa-angle-up" />
                                        </button>
                                        <button className="decrement">
                                            <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a href="javascript:void(0)" className="close">
                                    <i className="fas fa-xmark" />
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="d-flex align-items-center gap-4">
                        <div className="feature-image light-bg">
                            <a href="product-details.html">
                                <img
                                    src="assets/images/products/pds-sm-3.png"
                                    alt="feature image"
                                    className="img-fluid"
                                />
                            </a>
                        </div>
                        <div className="d-flex justify-content-between gap-3 w-100">
                            <div>
                                <a href="product-details.html">
                                    <h6 className="mb-1">Long table</h6>
                                </a>
                                <span className="price fw-medium secondary-text-color d-block mb-1 fs-sm">
                                    $250.00
                                </span>
                                <div className="quantity d-flex align-items-center">
                                    <input type="text" defaultValue={1} />
                                    <div className="step-btns">
                                        <button className="increment">
                                            <i className="fa-solid fa-angle-up" />
                                        </button>
                                        <button className="decrement">
                                            <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <a href="#" className="close">
                                    <i className="fas fa-xmark" />
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="drawer-bottom border-top">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="mb-0">Total:</h6>
                        <span className="fw-semibold text-main-color">
                            $750.00
                        </span>
                    </div>
                    <div className="progress-line">
                        <div className="progress-fill">
                            <span>73%</span>
                        </div>
                    </div>
                    <p className="mt-4 fs-sm">
                        Spend <span className="text-main-color">$125.00</span>{" "}
                        to reach{" "}
                        <span className="text-main-color">Free Shipping</span>
                    </p>
                    <a
                        href="cart.html"
                        className="template-btn primary-btn text-uppercase fw-semibold w-100 text-center mt-4"
                    >
                        <span>View Cart</span>
                    </a>
                    <a
                        href="checkout.html"
                        className="template-btn outline-btn text-uppercase fw-semibold w-100 text-center mt-3"
                    >
                        Checkout
                    </a>
                </div>
            </div>

            <div className="offcanvus-box position-fixed bg-white">
                <a href="javascript:void(0)" className="offcanvus-close">
                    <i className="fa-solid fa-xmark" />
                </a>
                <div className="content-top">
                    <a href="index.html" className="offcanvus-logo">
                        <img src="assets/images/logo.png" alt="logo" />
                    </a>
                    <p className="mb-0 mt-32 fw-light">
                        Distrak Street 2SK Line,
                        Germanygalore@inside-support.com (+125) 2156-2145
                    </p>
                </div>
                <div className="offcanvus-gallery d-flex align-items-center flex-wrap">
                    <a href="javascript:void(0)">
                        <img
                            src="assets/images/gallery/sidebar-item-1.jpg"
                            alt="not found"
                        />
                    </a>
                    <a href="javascript:void(0)">
                        <img
                            src="assets/images/gallery/sidebar-item-2.jpg"
                            alt="not found"
                        />
                    </a>
                    <a href="javascript:void(0)">
                        <img
                            src="assets/images/gallery/sidebar-item-3.jpg"
                            alt="not found"
                        />
                    </a>
                    <a href="javascript:void(0)">
                        <img
                            src="assets/images/gallery/sidebar-item-4.jpg"
                            alt="not found"
                        />
                    </a>
                </div>
                <div className="offcanvus-newsletter">
                    <h4 className="mb-4 text-center">Newsletter</h4>
                    <form action="#">
                        <input
                            type="email"
                            placeholder="Enter your e-mail"
                            className="theme-input"
                        />
                        <button
                            type="submit"
                            className="template-btn primary-btn mt-3 w-100"
                        >
                            <span>SUBSCRIBE NOW</span>
                        </button>
                    </form>
                </div>
                <div className="offcanvus-bottom d-flex align-items-center justify-content-between">
                    <div className="language-switcher">
                        <div className="dropdown">
                            <button type="button" data-bs-toggle="dropdown">
                                English{" "}
                                <span>
                                    <i className="fas fa-angle-down" />
                                </span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#">Bangla</a>
                                </li>
                                <li>
                                    <a href="#">Hindi</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="currency-switcher">
                        <select>
                            <option>USD</option>
                            <option>BDT</option>
                            <option>CNY</option>
                        </select>
                    </div>
                    <div className="user-links">
                        <a href="login.html">
                            <span className="me-2">
                                <i className="fa-regular fa-user" />
                            </span>
                            Account
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
