import {createSlice} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

export interface ThemeState {
  dark: boolean;

}

const initialState: ThemeState = {
  dark: false,
};


export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggle: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggle } = themeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTheme = (state: RootState) => state.theme.dark;



export default themeSlice.reducer;
