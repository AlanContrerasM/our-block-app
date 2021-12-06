import React, {FC} from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props{
    open:any;
    onClose:any;
    eventData: any;
}
export const EventQuickDialog:FC<Props> = ({open, onClose, eventData}) => {
    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Create Event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose} color="error">Close</Button>
                    <Button variant="contained" onClick={onClose} color="error">Find out more</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
