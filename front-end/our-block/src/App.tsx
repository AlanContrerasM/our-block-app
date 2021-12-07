import React, {FC, ReactElement, useEffect} from 'react';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {selectTheme} from './features/theme/themeSlice';
import {setEvents} from './features/events/eventSlice';
import {login} from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Profile from './pages/Profile';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import axios from 'axios';



const App:FC = ():ReactElement => {
  const dark = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light', // Switching the dark mode 
    },
  });

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

  const isLoggedIn = async() =>{
    try{
      const resp = await axios.get("http://localhost:5000/api/v1/users/profile",{
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true });
        
        console.log(resp.data.user);
      
        dispatch(login({value: {loggedIn: true,
          name: resp.data.name,
          username: resp.data.username,
          email: resp.data.email,
          events: resp.data.events
          }}));

    }catch(err){
      console.log("user not logged in");
    }
    
  }

  useEffect(()=>{
    fetchEvents();
    isLoggedIn();
  }, [])


  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}> 
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Paper elevation={0} sx={{minHeight: "100vh", display:"flex", flexDirection:"column"}}>
              <Header />
            
              <Routes>
                <Route path='/' element={<Home />} /> 
                <Route path='/about' element={<About/>}/>
                <Route path='/events/*' element={<Events/>}/>
                <Route path='/profile/*' element={<Profile />}/>

                {/* <Route path='/profile/*' element={login?<Profile />: <Navigate to="/"/>}/>
                <Route path='/post/:id' element={<Post/>} />
                <Route path='/pictures/:search' element={<Pictures/>} />
                <Route path='/tasks/*' element={<Task/>} />
                <Route path="*" element={<NotFound/>} /> */}
            </Routes>
              
          </Paper>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
