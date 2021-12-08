import React, {useState, useReducer} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DialogContext = React.createContext(null);

export default ({ children}) => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [buttons, setButtons] = useState([])
    //const [confirmHandler, setConfirmHandler] = useState(() => {})
    const [confirmHandler, setConfirmHandler] = useReducer((state, action) =>{
        return () => {
            action()
            setOpen(false);
        }
    })

    const store = {
        openContext: [open, setOpen],
        confirmHandlerContext: [confirmHandler, setConfirmHandler],
        messageContext: [message, setMessage],
        titleContext: [title, setTitle],
        buttonsContext: [buttons, setButtons]
    };

    // const handleConfirm = () => {
    //     confirmHandler()
    //     setOpen(false)
    // }
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <DialogContext.Provider value={store}>
            {children}
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    buttons.map((button) => 
                    <Button 
                    onClick={() => {
                        if(typeof button.onClick == 'function'){
                            button.onClick()
                        }
                        setOpen(false);
                    }}>{button.text}
                    </Button>
                    )
                }
                {/* <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={confirmHandler}>Đồng ý</Button> */}
            </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    );
  }