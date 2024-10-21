import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import UserLayout from "../layouts/user/UserLayout"
import Home from "../pages/user/Home/Home"
import Dashboard from "../pages/user/Dashboard"

const UserRouter: React.FC = () => {
    return (
        <UserLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </UserLayout>
    )
}

export default UserRouter
