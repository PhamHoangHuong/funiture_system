import React, { useEffect } from 'react';
import { useAuth } from '../../../core/contexts/AuthContext';
import { Box, Stack, Typography } from '@mui/material';
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
                </Typography>
            </Stack>
        </Box>
    );
};

export default Logout;
