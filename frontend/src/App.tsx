import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AdminRoutes from "./routes/AdminRoutes"
import UserRouter from "./routes/UserRoutes"
import { AuthProvider } from "./contexts/AuthContext"

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="/*" element={<UserRouter />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
