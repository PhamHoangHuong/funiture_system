import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, refreshToken, getProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/translation';
import { AuthContextType, User } from '../hooks/dataTypes';



// Rename the context and hook
const UserAuthContext = createContext<AuthContextType | undefined>(undefined);

// Component Provider để quản lý trạng thái xác thực
export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State để lưu thông tin người dùng và trạng thái loading
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Kiểm tra xác thực khi component được mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Hàm kiểm tra trạng thái xác thực
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                const response = await getProfile();
                setUser(response.data);
            }
        } catch (error) {
            console.error(t('authCheckError'), error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý đăng nhập
    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            setUser(response.data.user);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            // navigate('/admin/dashboard');
            return { success: true };
        }
        catch (error) {
            console.error(t('loginError'), error);
            return { success: false, error: t('invalidCredentials') };
        }
    };

    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/admin/login');
        } catch (error) {
            console.error(t('logoutError'), error);
        }
    };

    // Hàm làm mới token
    const handleRefreshToken = async () => {
        try {
            const response = await refreshToken();
            localStorage.setItem('access_token', response.data.access_token);
            return true;
        } catch (error) {
            console.error(t('refreshTokenError'), error);
            setUser(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return false;
        }
    };

    // Cung cấp context cho các component con
    return (
        <UserAuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleRefreshToken }}>
            {children}
        </UserAuthContext.Provider>
    );
};

// Hook tùy chỉnh để sử dụng AuthContext
export const useUserAuth = () => {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error('useUserAuth must be used within a UserAuthProvider');
    }
    return context;
};