import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import ShopSection from "./ShopSection";

export default function UserProductLayout() {
    return (
        <>
            <Breadcrumb />
            <ShopSection />
            <Outlet />
        </>
    );
}
