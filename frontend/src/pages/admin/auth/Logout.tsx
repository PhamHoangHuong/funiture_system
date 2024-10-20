import React, { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Box, Typography, Stack } from '@mui/material';
import { LoadingSpinner } from '../../../contexts/loading'; // Giả sử đường dẫn này là chính xác

const Logout: React.FC = () => {
    const { handleLogout } = useAuth();

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h5">
                    Đang đăng xuất . . .
                <LoadingSpinner />
                </Typography>
            </Stack>
        </Box>
    );
};

export default Logout;
