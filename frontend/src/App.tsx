import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AdminRoutes from "./routes/AdminRoutes"
import { AuthProvider } from "./contexts/AuthContext"
import UserRouter from "./routes/UserRoutes"

interface AppProps {
    isAdmin: boolean
}

const App: React.FC<AppProps> = ({ isAdmin }) => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {isAdmin ? (
                        <Route path="/admin/*" element={<AdminRoutes />} />
                    ) : (
                        <Route path="/*" element={<UserRouter />} />
                    )}
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
