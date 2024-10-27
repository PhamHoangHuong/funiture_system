import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8c57ff',
            light: '#b085ff',
            dark: '#6200ea',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        minHeight: 40,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#8c57ff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8c57ff',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        transform: 'translate(14px, 10px) scale(1)',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                    },
                    // Thêm style cho multiline TextField
                    '& .MuiInputBase-multiline': {
                        padding: '8px 14px',
                        lineHeight: 1.5, // Điều chỉnh khoảng cách giữa các dòng
                    },
                },
            },
            variants: [
                {
                    props: { multiline: true },
                    style: {
                        '& .MuiInputBase-root': {
                            minHeight: 'auto',
                            padding: '8px 14px',
                        },
                        '& .MuiInputBase-inputMultiline': {
                            lineHeight: 1.5,
                        },
                    },
                },
            ],
        },
        MuiFormControl: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        height: 40,
                    },
                    '& .MuiInputLabel-root': {
                        transform: 'translate(14px, 10px) scale(1)',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '&.MuiInputBase-root': {
                        height: 40,
                    },
                },
            },
        },
        MuiInputLabel: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: 'auto',
                    padding: '6px 16px',
                },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                },
            },
        },
    },
});

export default theme;
