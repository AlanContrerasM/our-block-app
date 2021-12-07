import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

//name, username, email, events
export interface UserState {
    value:{
        loggedIn: boolean
        name: String;
        username: String;
        email: String;
        events: [any];//array of object id.
    }

}

const initialState: UserState = {
    value: {loggedIn: false,
    name: "",
    username: "",
    email: "",
    events: [""]
    }//array of object id.
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.value = initialState.value
    },
    login: (state, action: PayloadAction<UserState>) => {
        state.value = action.payload.value;
      }
  },
});

export const { logout, login } = userSlice.actions;


// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user.value;



export default userSlice.reducer;
