import React, {FC, ReactElement} from 'react';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector } from './app/hooks';
import {selectTheme} from './features/theme/themeSlice';
import { Map } from './components/Map';


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
        <Header />
        <Map/>
      </ThemeProvider>
    </div>
  );
}

export default App;
