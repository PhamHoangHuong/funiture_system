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
                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
        </AdminLayout>
    )
}

export default AdminRoutes
