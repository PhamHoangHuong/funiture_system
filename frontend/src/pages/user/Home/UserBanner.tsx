import React from "react";

export default function UseBanner() {
    return (
        <>
            <section className="vr5-hero-section overflow-hidden position-relative overflow-hidden z-1">
                <img
                    src="assets/user/images/home-5/flower.png"
                    alt="flower"
                    className="img-fluid position-absolute end-0 bottom-0 z--1 flower-shape"
                />
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-xl-6">
                            <div
                                className="vr5-hero-banner"
                                data-background="assets/user/images/home-5/hero-bg.jpg"
                            />
                        </div>
                        <div className="col-xl-6">
                            <div className="vr5-hero-content-slider">
                                <div className="single-item">
                                    <span className="fw-semibold text-main-color text-uppercase">
                                        60% Flat Discount
                                    </span>
                                    <h1 className="mt-40 mb-5">
                                        New Year End Sale Hurry Up!
                                    </h1>
                                    <p className="mb-60">
                                        Sollicitudin natoque et nam dis potenti
                                        ante mi tincidunt. Scelerisque nam
                                        sociosqu lacinia aliquet ac penatibus at
                                        aptent consequat, lacus placerat congue
                                        quam vitae fames etiam.
                                    </p>
                                    <a
                                        href="#"
                                        className="template-btn primary-btn vr5-btn"
                                    >
                                        Show Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
