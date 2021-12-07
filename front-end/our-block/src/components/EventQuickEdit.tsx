import React, {FC, useState} from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import axios from 'axios';


interface Props{
    open:boolean;
    onClose:any;
    eventData: any;
}

//lets fetch from pixabay, one at a time.

export const EventQuickEdit:FC<Props> = ({open, onClose, eventData}) => {
    const [event, setEvent] = useState({...eventData});
    const [loading, setLoading] = useState(false);

    const updateEvent = async () =>{
        setLoading(true);
        try{
            console.log(event);
            const resp = await axios.put("http://localhost:5000/api/v1/events/" + eventData._id, event, {
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          withCredentials: true });
                
                console.log(resp.data);
                setLoading(false);
                onClose();

        }catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <Dialog open={open}  onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        onClose();
                    }
                }}>
                <DialogTitle>Create Event</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please provide the details for your event:
                </DialogContentText>
                
                <FormControl fullWidth component="form">
                    <TextField
                        
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={event.title}
                        onChange={(e)=>setEvent({...event, title: e.target.value})}
                        required
                    />
                    <TextField
                        
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={event.description}
                        onChange={(e)=>setEvent({...event, description: e.target.value})}
                        required
                    />
                    <DialogContentText>
                        Please select the category for your event:
                    </DialogContentText>
                    
                    <Select
                        label="Event Category"
                        placeholder="Select category event"
                        id="category"
                        value={event.category}
                        onChange={(e)=>setEvent({...event, category: e.target.value})}
                        required
                    >
                        <MenuItem value={"personal"} selected>Personal</MenuItem>
                        <MenuItem value={"sports"}>Sports</MenuItem>
                        <MenuItem value={"business"}>Business</MenuItem>
                        <MenuItem value={"night-life"}>Night Life</MenuItem>
                        <MenuItem value={"big-event"}>Big Event</MenuItem>
                        <MenuItem value={"community"}>Community</MenuItem>
                    </Select>
                    <DialogActions>
                        <LoadingButton 
                            onClick={(e)=>updateEvent()}
                            startIcon={<AddLocationAltIcon fontSize="large"/>}
                            loading={loading}
                            loadingPosition="start"//otherwise end
                            variant="contained"
                            size="medium"
                        >Edit</LoadingButton>
                    </DialogActions>
                </FormControl>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default EventQuickEdit;