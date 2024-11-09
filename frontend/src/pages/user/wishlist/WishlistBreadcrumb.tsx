import React from "react";
import { Link } from "react-router-dom";

export default function WishlistBreadcrumb() {
    return (
        <div className="breadcrumb-section pt-40 pb-40">
            <div className="container-1700">
                <p className="breadcrumb-text mb-0">
                    <Link to="/">Home</Link> / <span className="text-main-color">Wishlist</span>
                </p>
            </div>
        </div>
    );
}
