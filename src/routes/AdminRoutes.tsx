import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ProductList from "../pages/admin/Products/ProductList"
import ProductCreate from "../pages/admin/Products/ProductCreate"
import ProductEdit from "../pages/admin/Products/ProductEdit"
import Login from "../pages/admin/auth/Login"
import Logout from "../pages/admin/auth/Logout"
import { useAuth } from "../contexts/AuthContext"
import Warehouse from "../pages/admin/Inventory/Warehouse"
import ReceivedOrders from "../pages/admin/Inventory/ReceivedOrders"
import CategoryList from "../pages/admin/Categories/CategoryList"
import CategoryCreate from "../pages/admin/Categories/CategoryCreate"
import OrdersList from "../pages/admin/Orders/OrdersList"
import OrdersDetails from "../pages/admin/Orders/OrdersDetails"
import OrdersCart from "../pages/admin/Orders/OrdersCart"
import OrdersCheckOut from "../pages/admin/Orders/OrdersCheckOut"
import Settings from "../pages/admin/Settings"

const AdminRoutes: React.FC = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    // if (!user) {
    //     return (
    //         <Routes>
    //             <Route path="login" element={<Login />} />
    //             <Route path="*" element={<Navigate to="login" />} />
    //         </Routes>
    //     )
    // }

    return (
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/create" element={<ProductCreate />} />
                <Route path="products/edit/:id" element={<ProductEdit />} />

                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/create" element={<CategoryCreate />} />

                <Route path="warehouse" element={<Warehouse />} />
                <Route path="received-orders" element={<ReceivedOrders />} />

                <Route path="orders-list" element={<OrdersList />} />
                <Route path="orders-details" element={<OrdersDetails />} />
                <Route path="orders-cart" element={<OrdersCart />} />
                <Route path="orders-checkout" element={<OrdersCheckOut />} />

                <Route path="settings" element={<Settings />} />

                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoutes
