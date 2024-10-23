import React from "react";
import { useParams } from 'react-router-dom';

// Mock product data returned directly
const product = {
    id: "1",
    name: "Stonal Dinning Table Set 6X6 Full Packaged",
    category: "Light Bulb, Table",
    description: "Ac montes elementum proin viverra placerat purus sagittis dui curae, aptent tristi que eget enim rhoncus nostra torquent luctus risus, tincidunt platea semper odio metus himenaeos orciIac uliseu donec lacinia feugiat proin",
    price: 1530.30,
    oldPrice: 2100,
    sku: "17",
    tags: ["Iluminate", "Textured"],
    images: [
        "/assets/user/images/products/pd-thumb-1.png",
        // "/assets/user/images/products/pd-thumb-2.png",
        // "/assets/user/images/products/pd-thumb-3.png"
    ],
    thumbnails: [
        "/assets/user/images/products/vr-thumb-control-1.png",
        "/assets/user/images/products/vr-thumb-control-2.png",
        "/assets/user/images/products/vr-thumb-control-3.png",
        "/assets/user/images/products/vr-thumb-control-2.png"
    ]
};

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <section className="vr-prodcuct-details ptb-140">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="vr-product-double-slider">
                                <div className="vr-product-thumb position-relative">
                                    <span className="badge sale-badge">Sale</span>
                                    <div className="vr-poroduct-single-slider">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="single-item text-center">
                                                <span className="zoom-on-hover d-inline-block">
                                                    <img src={image} alt={`product-${index}`} className="img-fluid mood-multiply d-inline-block" />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="vr-product-thumb-control mt-4">
                                    {product.thumbnails.map((thumbnail, index) => (
                                        <div key={index} className="single-item text-center">
                                            <img src={thumbnail} alt={`thumbnail-${index}`} className="img-fluid mood-multiply" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="vr-product-details-content mt-5 mt-xl-0">
                                <h3 className="mb-4 fw-semibold">{product.name}</h3>
                                <div className="product-rating">
                                    <ul className="rating-star d-inline-flex">
                                        <li><i className="fas fa-star" /></li>
                                        <li><i className="fas fa-star" /></li>
                                        <li><i className="fas fa-star" /></li>
                                        <li><i className="fas fa-star" /></li>
                                        <li><i className="fas fa-star" /></li>
                                    </ul>
                                    <span className="fs-sm">(3 Customer Reviews)</span>
                                </div>
                                <h5 className="mb-0 mt-30">${product.price.toFixed(2)} <del className="ms-1 text-color">${product.oldPrice.toFixed(2)}</del></h5>
                                <p className="mb-40 mt-30">{product.description}</p>
                                <div className="color-variant">
                                    <span className="fs-sm text-uppercase text-main-color fw-medium">Color</span>
                                    <ul className="color-list mt-20">
                                        <li className="red"><a href="#" /></li>
                                        <li className="blue"><a href="#" /></li>
                                        <li className="green"><a href="#" /></li>
                                    </ul>
                                </div>
                                <div className="d-flex align-items-center mt-30 gap-3">
                                    <div className="quantity-box">
                                        <button type="button" className="drecrement"><i className="fa-solid fa-minus" /></button>
                                        <input type="text" defaultValue={1} />
                                        <button type="button" className="drecrement"><i className="fa-solid fa-plus" /></button>
                                    </div>
                                    <a href="#" className="template-btn primary-btn fs-sm text-uppercase h-40">ADD To Cart</a>
                                </div>
                                <a href="#" className="pd-wishlist-btn text-uppercase mt-30"><i className="fa-regular fa-heart" />ADD Wishlist</a>
                                <ul className="product-meta mt-32">
                                    <li>SKU:{product.sku}</li>
                                    <li>Categories: {product.category}</li>
                                    <li>Tags: {product.tags.join(', ')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="single-products-info pb-140">
                <div className="container">
                    <div className="single-product-tab">
                        <ul className="nav nav-tabs border-bottom" role="tablist">
                            <li><a href="#tab-1" data-bs-toggle="tab" className="active">Description</a></li>
                            <li><a href="#tab-2" data-bs-toggle="tab">Addition information</a></li>
                            <li><a href="#tab-3" data-bs-toggle="tab">Reviews(2)</a></li>
                        </ul>
                        <div className="tab-content mt-32">
                            <div className="tab-pane fade active show" id="tab-1" role="tabpanel">
                                {/* Description content */}
                                <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap flex-lg-nowrap">
                                    <div className="product-description">
                                        <p className="mb-0 fw-light">Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                                        <ul className="single-product-features mt-40">
                                            {/* ... feature list items ... */}
                                        </ul>
                                    </div>
                                    <div className="video-content flex-shrink-0 position-relative">
                                        <img src="/assets/user/images/banner/video-banner.jpg" alt="video banner" className="img-fluid" />
                                        <a href="https://www.youtube.com/watch?v=6WZOxnYi4Cs" data-fancybox="" className="video-popup-btn"><i className="fas fa-play"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                <ul className="product-meta d-flex gap-2 flex-column">
                                    <li>SKU:{product.sku}</li>
                                    <li>Categories: {product.category}</li>
                                    <li>Tags: {product.tags.join(', ')}</li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="tab-3" role="tabpanel">
                                <ul className="prduct-reviews">
                                    {/* ... review list items ... */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
