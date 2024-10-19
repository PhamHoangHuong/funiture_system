import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ProductList from "../pages/admin/Products/ProductList"
import ProductCreate from "../pages/admin/Products/ProductCreate"
import ProductEdit from "../pages/admin/Products/ProductEdit"
// import Login from "../pages/admin/auth/Login"
import Logout from "../pages/admin/auth/Logout"
// import { useAuth } from "../contexts/AuthContext"
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
    // const { user, loading } = useAuth()

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    // if (!user) {
    //     return (
    //         <Routes>
    //             <Route path="login" element={<Login />} />
    //             <Route path="*" element={<Navigate to="login" replace />} />
    //         </Routes>
    //     )
    // }

    return (
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products">
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                </Route>
                <Route path="categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                </Route>
                <Route path="inventory">
                    <Route path="warehouse" element={<Warehouse />} />
                    <Route path="received-orders" element={<ReceivedOrders />} />
                </Route>
                <Route path="orders">
                    <Route index element={<OrdersList />} />
                    <Route path="details" element={<OrdersDetails />} />
                    <Route path="cart" element={<OrdersCart />} />
                    <Route path="checkout" element={<OrdersCheckOut />} />
                </Route>
                <Route path="settings" element={<Settings />} />
                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoutes