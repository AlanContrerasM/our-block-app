import { useEffect, FC } from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import AllEvents from "../components/AllEvents";
import MyEvents from "../components/MyEvents";
import Event from "../components/Event";
import { useAppSelector, } from '../app/hooks';
import {selectUser} from '../features/user/userSlice';

const Events:FC = () => {

    //for user
    const user = useAppSelector(selectUser);
    useEffect(()=>{

    }, [])

    
    return ( 
        <>
            <Routes>
                    <Route path={`/AllEvents`}  element={<AllEvents/>} />
                    <Route path={`/MyEvents`} element={user.loggedIn ? <MyEvents /> : <Navigate to="/profile/signin"/>} />
                    <Route path='/Event/:id' element={<Event/>} />
            </Routes>
        </>
     );
}

export default Events;