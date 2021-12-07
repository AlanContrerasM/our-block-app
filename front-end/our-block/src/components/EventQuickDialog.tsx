import React, {FC} from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

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



interface Props{
    open:boolean;
    onClose:any;
    eventData: any;
}

//lets fetch from pixabay, one at a time.

export const EventQuickDialog:FC<Props> = ({open, onClose, eventData}) => {


    return (
        <div>
            <Dialog open={open} onClose={onClose} sx={{p:"0"}}>
                {/* <DialogTitle>{eventData.title}</DialogTitle> */}
                <DialogContent sx={{p:"5px"}} >
                    
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar image">
                                {eventData.creator.username[0].toUpperCase()}
                            </Avatar>
                            }
                            title={eventData.title}
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="174"
                            image="https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg"
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {eventData.description}
                            </Typography>
                        </CardContent>
                        {/* <CardActions disableSpacing>  disableSpacing
                            <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                            <Button variant="contained" onClick={onClose} color="error">Close</Button>
                            
                            <Button fullWidth variant="contained" onClick={onClose} >See More</Button>
                        </CardActions> */}
                    
                        <DialogActions>
                         <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                            <ShareIcon />
                            </IconButton>
                            <Button variant="contained" onClick={onClose} >Find More</Button>
                        </DialogActions>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}
