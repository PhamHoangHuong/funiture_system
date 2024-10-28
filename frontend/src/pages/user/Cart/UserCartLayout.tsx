import React from "react";
import { Outlet } from "react-router-dom";
import CartBreadcrumb from "./CartBreadcrumb";

export default function UserCartLayout() {
    return (
        <>
            <CartBreadcrumb />
            <div className="cart-container">
                <Outlet />
            </div>
        </>
    );
}

