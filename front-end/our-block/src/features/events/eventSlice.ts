import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

//name, username, email, events
export interface EventState {
    value: {events: any[]}
}

const initialState: EventState = {
    value: {events: []}
};


export const eventSlice = createSlice({
  name: 'event',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEvents: (state, action: PayloadAction<any>) => {
        state.value.events = action.payload.events;
      }
  },
});

export const { setEvents } = eventSlice.actions;


// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectEvents = (state: RootState) => state.event.value.events;



export default eventSlice.reducer;
