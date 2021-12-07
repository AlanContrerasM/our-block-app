import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useAppSelector } from '../app/hooks';
import {selectTheme} from '../features/theme/themeSlice';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { EventQuickDialog } from './EventQuickDialog';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbnJjb250cmVyYXNtIiwiYSI6ImNrd3NmZ29icDE1dXcydW84aGI4ZHZiajkifQ.z-xzhlSEjPgpRp-HEMOCNA';
 

const styles = {
    container: {
        position: "relative",
        display: "flex",
        flex: "1",
    },
    mapContainer: {
        // height: "100%",
        flex: "1",
        },
         
    sidebar: {
        backgroundColor: "rgba(35, 55, 75, 0.9)",
        color: "#fff",
        padding: "6px 12px",
        fontFamily: "monospace",
        zIndex: "1",
        position: "absolute",
        top: "0",
        left: "0",
        margin: "12px",
        borderRadius: "4px",
        },
  };

const dummyEventData = [
    {
        _id: "1",
        title: "title1",
        description: "description",
        category: "personal",
        coordinates: [-123.1328,49.2871],
        creator: {
            _id: "user1",
            username: "user1"
        },
        image: ""//from pixabay created by database
    },
    {
        _id: "2",
        title: "title2",
        description: "description",
        category: "sports",
        coordinates: [-123.1329,49.28711],
        creator: {
            _id: "user1",
            username: "user1"
        }
    },
    {
        _id: "3",
        title: "title3",
        description: "description",
        category: "night-life",
        coordinates: [-123.13285,49.2878],
        creator: {
            _id: "user1",
            username: "user1"
        }
    },
    {
        _id: "3",
        title: "title3",
        description: "description",
        category: "business",
        coordinates: [-123.13261,49.2878],
        creator: {
            _id: "user1",
            username: "user1"
        }
    },
    {
        _id: "3",
        title: "title3",
        description: "description",
        category: "community",
        coordinates: [-123.1327,49.2878],
        creator: {
            _id: "user1",
            username: "user1"
        }
    },
]

export  const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-123.1328);
    const [lat, setLat] = useState(49.2871);
    const [zoom, setZoom] = useState(14.22);
    const [loading, setLoading] = useState(false);
    const [savingMarker, setSavingMarker] = useState(false);
    const [open, setOpen] = useState(false);
    const [openQuickDialog, setOpenQuickDialog] = useState(false);
    const [dataQuickDialog, setdataQuickDialog] = useState(dummyEventData[0])
    const [newMarker, setNewMarker] = useState(null);
    const [newMarkerData, setNewMarkerData] = useState({
        title: "",
        description: "",
        coordinates: [],
        category: "personal"
        //creator will be provided with the api middleware
    })

    //theme provider for popups
    const dark = useAppSelector(selectTheme);

    const theme = createTheme({
      palette: {
        mode: dark ? 'dark' : 'light', // Switching the dark mode 
      },
    });

   
    
    
    //create map
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        //Add controls, search bar, locator, zoom extra controls
        map.current.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
        );
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }));
        map.current.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
        map.current.addControl(new mapboxgl.NavigationControl({visualizePitch: true}), 'bottom-right');
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps

        generateEventMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    //darkmode controller for map
    
    useEffect(()=>{
        if (!map.current) return; 
        !dark ? map.current.setStyle('mapbox://styles/mapbox/streets-v11'): map.current.setStyle('mapbox://styles/mapbox/dark-v10'); 
    }, [dark])
    

    //create markers for existing events
    const generateEventMarkers = () =>{
        dummyEventData.forEach(event=>{

            const placeholder = document.createElement('div');
            
            ReactDOM.render(
                <ThemeProvider theme={theme}>
                    <Paper sx={{p:3, bgcolor: 'background.default'}}>
                        <DialogTitle>{event.title.slice(0,30) + "..."}</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                {event.category[0].toUpperCase()  + event.category.split("-").join(" ").slice(1) + ": " + event.description.slice(0,30) + "..."}
                            </DialogContentText>
                        </DialogContent>
                        <Button fullWidth variant="contained" onClick={()=>{setOpenQuickDialog(true); setdataQuickDialog(event)}}>Place Here!</Button>
                    </Paper>
            </ThemeProvider>, placeholder);

            //create Popup
            let color = "#3FB1CE"
            switch(event.category){
                case("personal"):
                    color = "#3FB1CE"
                    break;
                case("sports"):
                    color = "#ff3d00"
                    break;
                case("big-event"):
                    color = "#651fff"
                    break;
                case("community"):
                    color = "#00e676"
                    break;
                case("night-life"):
                    color = "#ffea00"
                    break;
                case("business"):
                    color = "#009688"
                    break;
                default:
                    break;

            }

        
            const marker = new mapboxgl.Marker({color: color})
                .setLngLat(event.coordinates)
                // .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setHTML("<h1>Move Me</h1>"))
                .setPopup(new mapboxgl.Popup({closeButton: false}).setDOMContent(placeholder)) 
                .addTo(map.current)
                .togglePopup();
            
            marker.getElement().style.cursor = "pointer";
            marker.getPopup().getElement().lastChild.style.padding = "0px";
            marker.togglePopup();
            

        })
    }


    //create new Draggable marker for when trying to add new Event
    const addNewMarker = (e) => {
        setLoading(true);
        const placeholder = document.createElement('div');
        ReactDOM.render(
            <ThemeProvider theme={theme}>
                <Paper sx={{p:3, bgcolor: 'background.default'}}>
                    <DialogTitle>Your Event</DialogTitle>
                    <Button fullWidth variant="contained" onClick={handleClickOpen}>Place Here!</Button>
                </Paper>
        </ThemeProvider>, placeholder);

        //create Popup
        

        
        const marker = new mapboxgl.Marker({
            draggable: true
            })
            .setLngLat([lng, lat])
            // .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setHTML("<h1>Move Me</h1>"))
            .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setDOMContent(placeholder)) 
            .addTo(map.current)
            .togglePopup();
        
        marker.getElement().style.cursor = "pointer";
        marker.getPopup().getElement().lastChild.style.padding = "0px";
        setNewMarker(marker);
        setNewMarkerData({...newMarkerData, coordinates: [lng,lat]})

        function onDragEnd() {
            const {lng, lat} = marker.getLngLat();
            marker.togglePopup();
            setNewMarkerData({...newMarkerData, coordinates: [lng,lat]})
        }


            
        marker.on('dragend', onDragEnd);
        marker.on('dragstart', marker.togglePopup);
        
    }


    const saveNewMarker = (e) => {
        if(e.target.form.reportValidity()){
            console.log(newMarkerData)
            setSavingMarker(true);
            //post data to database

            setSavingMarker(false);
            setLoading(false);
            //empty Dialog if someone wants to create new marker
            newMarker.remove();
            setNewMarkerData({
                title: "",
                description: "",
                coordinates: [],
                category: "personal"
                //creator will be provided with the api middleware
            })
            setOpen(false);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
        setOpenQuickDialog(false);
    };
    const handleCancel = () =>{
        setLoading(false);
        newMarker.remove();
        setOpen(false);
    }



    return (
        <div className="Map" style={styles.container}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }} style={styles.sidebar}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </Box>
           
            <div ref={mapContainer}  style={styles.mapContainer} />
            <Box sx={{position: "absolute", zIndex: "1", bottom: "5vh", right: "10vh"}}>
                <LoadingButton
                    onClick={addNewMarker}
                    startIcon={<AddLocationAltIcon fontSize="large"/>}
                    loading={loading}
                    loadingPosition="start"//otherwise end
                    variant="contained"
                    size="medium"
                    >
                    Create Event
                </LoadingButton>
            </Box>


            <Dialog open={open}  onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
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
                        value={newMarkerData.title}
                        onChange={(e)=>setNewMarkerData({...newMarkerData, title: e.target.value})}
                        required
                    />
                    <TextField
                        
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newMarkerData.description}
                        onChange={(e)=>setNewMarkerData({...newMarkerData, description: e.target.value})}
                        required
                    />
                    <DialogContentText>
                        Please select the category for your event:
                    </DialogContentText>
                    
                    <Select
                        label="Event Category"
                        placeholder="Select category event"
                        id="category"
                        value={newMarkerData.category}
                        onChange={(e)=>setNewMarkerData({...newMarkerData, category: e.target.value})}
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
                        <Button disabled={savingMarker} onClick={handleCancel} color="error">Cancel</Button>
                        <Button disabled={savingMarker} onClick={handleClose}>Keep placing my event</Button>
                        <LoadingButton 
                            onClick={(e)=>saveNewMarker(e)}
                            startIcon={<AddLocationAltIcon fontSize="large"/>}
                            loading={savingMarker}
                            loadingPosition="start"//otherwise end
                            variant="contained"
                            size="medium"
                        >Save Event</LoadingButton>
                    </DialogActions>
                </FormControl>
                </DialogContent>
            </Dialog>

            <EventQuickDialog open={openQuickDialog} onClose={handleClose} eventData={dataQuickDialog}/>
        </div>
    );
}