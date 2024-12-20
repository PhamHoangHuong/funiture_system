import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../../core/contexts/ProductContext';
import { Product } from '../../../core/hooks/dataTypes';
import { formatCurrency } from '../../../core/hooks/format';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchProductById } = useProductContext();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await fetchProductById(parseInt(id));
                    if (fetchedProduct) {
                        setProduct(fetchedProduct);
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadProduct();
    }, [id, fetchProductById]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                        <div className="single-item text-center">
                                            <span className="zoom-on-hover d-inline-block">
                                                <img src={product.image} alt={product.name} className="img-fluid mood-multiply d-inline-block" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Thumbnail slider removed as it's not part of the Product type */}
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
                                <h5 className="mb-0 mt-30">{formatCurrency(product.price)}</h5>
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
                                    <li>SKU: {product.sku}</li>
                                    <li>Categories: {product.category_id ? `Category ${product.category_id}` : 'Uncategorized'}</li>
                                    <li>Stock: {product.stock_quantity}</li>
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
                            <li><a href="#tab-2" data-bs-toggle="tab">Additional information</a></li>
                            <li><a href="#tab-3" data-bs-toggle="tab">Reviews(2)</a></li>
                        </ul>
                        <div className="tab-content mt-32">
                            <div className="tab-pane fade active show" id="tab-1" role="tabpanel">
                                <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap flex-lg-nowrap">
                                    <div className="product-description">
                                        <p className="mb-0 fw-light">{product.content || 'No detailed description available.'}</p>
                                    </div>
                                    {product.video_link && (
                                        <div className="video-content flex-shrink-0 position-relative">
                                            <img src="/assets/user/images/banner/video-banner.jpg" alt="video banner" className="img-fluid" />
                                            <a href={product.video_link} data-fancybox="" className="video-popup-btn"><i className="fas fa-play"></i></a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                <ul className="product-meta d-flex gap-2 flex-column">
                                    <li>SKU: {product.sku}</li>
                                    <li>Categories: {product.category_id ? `Category ${product.category_id}` : 'Uncategorized'}</li>
                                    <li>Weight: {product.weight ? `${product.weight} kg` : 'N/A'}</li>
                                    <li>Stock: {product.stock_quantity}</li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="tab-3" role="tabpanel">
                                <ul className="prduct-reviews">
                                    {/* Review content would go here */}
                                    <li>No reviews yet.</li>
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
