import React, { useRef, useEffect, useState } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from '@mui/material/Box';
 
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



export  const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-123.1328);
    const [lat, setLat] = useState(49.2871);
    const [zoom, setZoom] = useState(14.22);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

   
    
    
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
    }, []);
    
    //darkmode controller for map
    const dark = useAppSelector(selectTheme);
    useEffect(()=>{
        if (!map.current) return; 
        !dark ? map.current.setStyle('mapbox://styles/mapbox/streets-v11'): map.current.setStyle('mapbox://styles/mapbox/dark-v10'); 
    }, [dark])
    
    //create new Draggable marker for when trying to add new Event
    const addNewMarker = (e) => {
        setLoading(true);
        // console.log(e.target.textContent);
        const marker = new mapboxgl.Marker({
            draggable: true
            })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false}).setHTML("<h1>Move Me</h1>"))
            .addTo(map.current)
            .togglePopup();
             
        function onDragEnd() {
            const {lng, lat} = marker.getLngLat();
            marker.togglePopup();
            handleClickOpen();
        }


            
        marker.on('dragend', onDragEnd);
        marker.on('dragstart', marker.togglePopup);
        
    }


    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleCancel = () =>{
        //use navigate
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


        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please provide the details for your event:
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />
            <FormControl fullWidth>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="title"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleClose}>Keep placing my event</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}