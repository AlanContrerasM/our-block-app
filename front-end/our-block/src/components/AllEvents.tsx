import { useEffect, FC } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useAppSelector } from '../app/hooks';
import {selectEvents} from '../features/events/eventSlice';


const AllEvents:FC = () => {

    const events = useAppSelector(selectEvents);

    useEffect(()=>{

    }, [])

    
    return ( 
        <>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} sx={{p:8}}>
                {events.map( (eventData) => 
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
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                    <ShareIcon />
                                    </IconButton>
                                </DialogActions>
                            </Card>
                        </Grid>
                    
                )}
                    
                    
                </Grid>
            </Box>
        </>
     );
}

export default AllEvents;