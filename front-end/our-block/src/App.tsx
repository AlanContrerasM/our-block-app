import React, {FC, ReactElement} from 'react';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector } from './app/hooks';
import {selectTheme} from './features/theme/themeSlice';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Profile from './pages/Profile';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';



const App:FC = ():ReactElement => {

  const dark = useAppSelector(selectTheme);

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light', // Switching the dark mode 
    },
  });


  return (
    <div style={{height:"100vh", display: "flex", flexDirection: "column", minHeight: "100vh"}}> 
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Paper elevation={0} sx={{minHeight: "100vh", display:"flex", flexDirection:"column"}}>
              <Header />
            
              <Routes>
                <Route path='/' element={<Home/>} /> 
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
