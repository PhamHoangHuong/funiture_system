import React from "react"
import { Route, Routes } from "react-router-dom"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"
// import ProductList from "../pages/user/product/ProductList"
import UserProductLayout from "../pages/user/product/UserProductLayout"

const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<UserProductLayout />}>
                    {/* <Route index element={<ProductList />} /> */}
                    {/* Thêm các route con khác cho sản phẩm ở đây nếu cần */}
                </Route>
            </Route>
        </Routes>
    )
}

export default UserRoutes
