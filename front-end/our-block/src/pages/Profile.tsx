import { useEffect, FC } from "react";
import { Routes, Route} from 'react-router-dom';
import Logout from "../components/Logout";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

const Profile:FC = () => {

    useEffect(()=>{

    }, [])

    
    return ( 
        <>
            <Routes>
                    <Route path={`/logout`} element={<Logout />} />
                    <Route path={`/signin`} element={<SignIn />} />
                    <Route path='/register' element={<Register/>} />
            </Routes>
        </>
     );
}

export default Profile;