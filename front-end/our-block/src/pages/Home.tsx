import { useEffect, FC } from "react";
import { Map } from '../components/Map';

const Home:FC = () => {

    useEffect(()=>{
        window.scroll(0,0);
    }, [])

    
    return ( 
        <Map/>
     );
}

export default Home;