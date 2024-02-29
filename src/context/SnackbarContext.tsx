'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

type SnackbarMessage = {
  message: string;
  severity: AlertColor;
};

type SnackbarContextType = {
  showSnackbar: (message: string, severity: AlertColor) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<
    SnackbarMessage | undefined
  >(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackPack.length && !currentSnackbar) {
      // Take the first snackbar from the snack pack and show it
      setCurrentSnackbar({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && currentSnackbar && open) {
      // Close the current snackbar to show the next one
      setOpen(false);
    }
  }, [snackPack, currentSnackbar, open]);

  const showSnackbar = (message: string, severity: AlertColor = 'info') => {
    setSnackPack((prev) => [...prev, { message, severity }]);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentSnackbar(undefined);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          onClose={handleClose}
          severity={currentSnackbar?.severity}
          sx={{ width: '100%' }}
        >
          {currentSnackbar?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
