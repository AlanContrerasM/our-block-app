import { useEffect, FC } from "react";
import { Routes, Route} from 'react-router-dom';
import AllEvents from "../components/AllEvents";
import MyEvents from "../components/MyEvents";
import Event from "../components/Event";


const Events:FC = () => {

    useEffect(()=>{

    }, [])

    
    return ( 
        <>
            <Routes>
                    <Route path={`/AllEvents`}  element={<AllEvents/>} />
                    <Route path={`/MyEvents`} element={<MyEvents />} />
                    <Route path='/Event/:id' element={<Event/>} />
            </Routes>
        </>
     );
}

export default Events;