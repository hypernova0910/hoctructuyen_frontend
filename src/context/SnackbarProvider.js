import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const SnackbarContext = React.createContext(null);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ({ children }) => {
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('')
    const [message, setMessage] = useState('')

    const store = {
        openContext: [open, setOpen],
        severityContext: [severity, setSeverity],
        messageContext: [message, setMessage]
    };

    function handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <SnackbarContext.Provider value={store}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};