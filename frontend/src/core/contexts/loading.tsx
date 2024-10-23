import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  );
}

// Tạo context cho trạng thái loading
export const LoadingContext = React.createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

// Provider component để quản lý trạng thái loading
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}

// Hook để sử dụng loading context
export function useLoading() {
  return React.useContext(LoadingContext);
}
