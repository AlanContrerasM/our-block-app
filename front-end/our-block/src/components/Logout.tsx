import React, {useEffect} from 'react';
import axios from 'axios';
import { useAppDispatch } from '../app/hooks';
import { logout} from '../features/user/userSlice';
import { useNavigate} from 'react-router-dom';

const Logout = () => {
    
    useEffect(()=>{
        logoutUser();
    }, [])

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function logoutUser(){
		try{
			const resp = await axios.get("http://localhost:5000/api/v1/users/logout",{
				headers: {
				  'Content-Type': 'application/json'
				},
				 withCredentials: true });
			console.log(resp);

            dispatch(logout());
            navigate("/");
			// setUser({loggedIn:false, userEmail: ""});

		}catch(err){
		  console.log(err);
		}
	}

    return (
        <>
            Loging out in progress
        </>
    )
}

export default Logout;
