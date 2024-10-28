import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AdminRoutes from "./routes/AdminRoutes"
import UserRouter from "./routes/UserRoutes"
import { AuthProvider } from "./core/contexts/AuthContext"
import './core/i18n/config'
import theme from './theme'  // Import theme mới

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/admin/*" element={<AdminRoutes />} />
                        <Route path="/*" element={<UserRouter />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
