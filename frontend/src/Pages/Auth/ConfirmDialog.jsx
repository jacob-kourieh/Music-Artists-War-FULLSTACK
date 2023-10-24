import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ConfirmDialog(props) {
    const { isOpen, title, children, onConfirm, onCancel } = props;

    const handleClose = () => {
        return false;
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{children}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default ConfirmDialog;
