import { useEffect, FC, useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {setEvents, selectEvents} from '../features/events/eventSlice';
import {selectUser} from '../features/user/userSlice';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LoadingButton from '@mui/lab/LoadingButton';
import EventQuickEdit from './EventQuickEdit';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const MyEvents:FC = () => {

    const dispatch = useAppDispatch();
    const events = useAppSelector(selectEvents);
    const user = useAppSelector(selectUser);

    const [openEdit, setOpenEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const deleteEvent = async (id:any) =>{
        setDeleting(true);
        try{

            const resp = await axios.delete("http://localhost:5000/api/v1/events/" + id,{
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          withCredentials: true });
                
                console.log(resp.data);
    
            
    
            setDeleting(false);
            fetchEvents();
        }catch(err){
            console.log(err);
        }

    }

    const fetchEvents = async() =>{
        try{
          const resp = await axios.get("http://localhost:5000/api/v1/events/",{
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      withCredentials: true });
            
            console.log(resp.data.events);
          
          dispatch(setEvents(resp.data));
    
        }catch(err){
          console.log(err);
        }
        
      }
      useEffect(()=>{
        fetchEvents();

        console.log(events);
      }, [])
    
      return ( 
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4} sx={{p:8}}>
                {events.filter((ev)=> ev.creator.username == user.username ).map( (eventData) => 
                        <Grid key={eventData._id} item xs={12} sm={6} md={4} lg={3}>
                                <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar image">
                                        {eventData.creator.username[0].toUpperCase()}
                                    </Avatar>
                                    }
                                    title={eventData.title}
                                    subheader={eventData.creator.username}
                                />
                                <CardMedia
                                    component="img"
                                    height="174"
                                    image={eventData.url}
                                    alt="event image"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                    {eventData.description}
                                    </Typography>
                                </CardContent>
                            
                                <DialogActions>
                                    <Button  onClick={()=>setOpenEdit(true)}>Edit</Button>
                                    <LoadingButton 
                                    onClick={(e)=>deleteEvent(eventData._id)}
                                    startIcon={<AddLocationAltIcon fontSize="large"/>}
                                    loading={deleting}
                                    loadingPosition="start"//otherwise end
                                    variant="contained"
                                    size="medium"
                                    color="error"
                                >Delete</LoadingButton>
                                </DialogActions>
                            </Card>
                            <EventQuickEdit open={openEdit} onClose={()=>{setOpenEdit(false); fetchEvents()}} eventData={eventData} />
                        </Grid>
                    
                )}
                    
                    
                </Grid>
            </Box>
            
        </>
     );
}

export default MyEvents;