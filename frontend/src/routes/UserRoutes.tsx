import React from "react"
import { Route, Routes } from "react-router-dom"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"
import UserProductLayout from "../pages/user/product/UserProductLayout"
import ProductDetails from "../pages/user/product/ProductDetails"

const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<UserProductLayout />} />
                <Route path="products/:id" element={<ProductDetails />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes
