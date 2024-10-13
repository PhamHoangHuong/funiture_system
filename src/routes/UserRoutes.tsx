import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Login from "../pages/admin/auth/Login"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"

const UserRouter: React.FC = () => {
    const isAuthenticated = localStorage.getItem("auth") === "true"

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Navigate to="login" />} />
            </Routes>
        )
    }

    return (
        <UserLayout>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="*" element={<Navigate to="" />} />
            </Routes>
        </UserLayout>
    )
}

export default UserRouter
