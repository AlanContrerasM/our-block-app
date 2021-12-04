import React, {FC, ReactElement} from 'react';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppSelector } from './app/hooks';
import {selectTheme} from './features/theme/themeSlice';


const App:FC = ():ReactElement => {

  const dark = useAppSelector(selectTheme);

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light', // Switching the dark mode 
    },
  });


  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </>
  );
}

export default App;
