import React from "react";

export default function UserCategorySection() {
    return (
        <>
            <section className="vr5-category-section overflow-hidden">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-xl-6">
                            <div className="vr5-ct-single-box position-relative border-bottom-0 border-start-0">
                                <img src="/assets/user/images/home-5/ct-1.jpg" alt="not found" className="img-fluid" />
                                <a href="shop-list.html" className="explore-btn">Office Sofa</a>
                            </div>
                            <div className="row g-0">
                                <div className="col-sm-6">
                                    <div className="vr5-ct-single-box position-relative border-start-0">
                                        <img src="/assets/user/images/home-5/ct-2.jpg" alt="not found" className="img-fluid" />
                                        <a href="shop-list.html" className="explore-btn">Chair</a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="vr5-ct-single-box position-relative border-start-0">
                                        <img src="/assets/user/images/home-5/ct-3.jpg" alt="not found" className="img-fluid" />
                                        <a href="shop-list.html" className="explore-btn">Side Table</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="vr5-ct-single-box position-relative border-start-0 large-box">
                                <img src="/assets/user/images/home-5/ct-4.jpg" alt="not found" className="img-fluid" />
                                <a href="shop-list.html" className="explore-btn">Decoration</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
