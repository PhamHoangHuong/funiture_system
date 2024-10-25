import React from "react"

import { Route, Routes, Navigate } from "react-router-dom"
import AdminLayout from "../layouts/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import ProductList from "../pages/admin/products/ProductList"
import ProductCreate from "../pages/admin/products/ProductCreate"
import ProductEdit from "../pages/admin/products/ProductEdit"
import Logout from "../pages/admin/auth/Logout"
import Warehouse from "../pages/admin/Inventory/Warehouse"
import ReceivedOrders from "../pages/admin/Inventory/ReceivedOrders"
import CategoryList from "../pages/admin/categories/CategoryList"
import CategoryCreate from "../pages/admin/categories/CategoryCreate"
import OrdersList from "../pages/admin/orders/OrdersList"
import OrdersDetails from "../pages/admin/orders/OrdersDetails"
import OrdersCart from "../pages/admin/orders/OrdersCart"
import OrdersCheckOut from "../pages/admin/orders/OrdersCheckOut"
import Settings from "../pages/admin/Settings"
import QuanLyKhachHangThemKhachHang from "../pages/admin/quanLyKhachHang/ThemKhachHang";
import QuanLyKhachHangDanhSachKhachHang from "../pages/admin/quanLyKhachHang/DanhSachKhachHang";
import PageManager from "../pages/admin/PageManager"

// New imports will be added here automatically

const AdminRoutes: React.FC = () => {
    return (
        <AdminLayout>
            <Routes>

                {/* New routes will be added here automatically */}
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
                <Route path="quan-ly-khach-hang/danh-sach" element={<QuanLyKhachHangDanhSachKhachHang />} />
                <Route path="quan-ly-khach-hang/them-moi" element={<QuanLyKhachHangThemKhachHang />} />

                <Route path="page-manager" element={<PageManager />} />

                <Route path="settings" element={<Settings />} />
                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoutes
