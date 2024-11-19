import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../core/contexts/ProductContext";
import { formatCurrency } from "../../../core/hooks/format";
import { useCart } from "../../../core/contexts/CartContext";

export default function ProductCollection() {
    const { products, loading, error } = useProductContext();
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    // Chia sản phẩm thành các nhóm 4 sản phẩm
    const productsPerSlide = 4;
    const totalSlides = Math.ceil(products.length / productsPerSlide);
    
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Lấy sản phẩm cho slide hiện tại
    const currentProducts = products.slice(
        currentSlide * productsPerSlide,
        (currentSlide + 1) * productsPerSlide
    );

    return (
        <>
            <section className="vr5-collection-area ptb-140">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <h3 className="mb-0 fw-medium">Living Room Collection</h3>
                        </div>
                    </div>
                    <div className="position-relative">
                        <div className="vr5-collection-slider slider-spacing mt-5" 
                            style={{ 
                                display: 'flex', 
                                gap: '15px',
                                justifyContent: 'flex-start',
                                transition: 'transform 0.3s ease'
                            }}>
                            {currentProducts.map((product) => (
                                <div key={product.id} 
                                    className="vr5-product-card" 
                                    style={{ 
                                        flex: '0 0 calc(25% - 12px)',
                                        minWidth: '250px',
                                        maxWidth: 'calc(25% - 12px)'
                                    }}>
                                    <div className="feature-image position-relative">
                                        <img 
                                            src={typeof product.image === 'string' 
                                                ? product.image 
                                                : product.image instanceof File 
                                                    ? URL.createObjectURL(product.image) 
                                                    : "/assets/user/images/products/chair-md-2.png"
                                            } 
                                            alt={product.name} 
                                            className="img-fluid" 
                                            style={{
                                                width: '100%',
                                                height: '300px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div className="action-box">
                                            <a href="#" className="cart-btn" onClick={() => addToCart(product.id, 1)}>
                                                Add to Cart
                                            </a>
                                            <div className="action-btns">
                                                {/* ... action buttons ... */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-content" style={{ height: '200px', overflow: 'hidden' }}>
                                        <span className="fw-semibold subtitle text-uppercase">
                                            {product.category_ids ? `Category ${product.category_ids}` : "Uncategorized"}
                                        </span>
                                        <Link to={`/products/${product.id}`}>
                                            <h6 className="fw-semibold mt-3">{product.name}</h6>
                                        </Link>
                                        <p className="fs-sm mb-4">
                                            {product.description || "No description available."}
                                        </p>
                                        <span className="text-main-color fw-bold fs-sm">
                                            {formatCurrency(product.price)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Navigation buttons */}
                        <button 
                            onClick={prevSlide} 
                            className="position-absolute top-50 start-0 translate-middle-y" 
                            style={{
                                border: 'none',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                padding: '10px',
                                cursor: 'pointer',
                                zIndex: 1
                            }}
                            disabled={currentSlide === 0}
                        >
                            &#10094;
                        </button>
                        <button 
                            onClick={nextSlide} 
                            className="position-absolute top-50 end-0 translate-middle-y" 
                            style={{
                                border: 'none',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                padding: '10px',
                                cursor: 'pointer',
                                zIndex: 1
                            }}
                            disabled={currentSlide === totalSlides - 1}
                        >
                            &#10095;
                        </button>

                        {/* Pagination dots */}
                        <div className="text-center mt-4">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <span
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: currentSlide === index ? '#000' : '#ccc',
                                        margin: '0 5px',
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}