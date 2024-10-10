import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const Logout: React.FC = () => {
    const { handleLogout } = useAuth();

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return <div>Logging out...</div>;
};

export default Logout;