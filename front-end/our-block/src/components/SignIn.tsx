import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate} from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
  login
} from '../features/user/userSlice';
import axios from 'axios';

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        try{
          const resp = await axios.post("http://localhost:5000/api/v1/users/login", form,{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true });

            // console.log(resp);

            //set user dispatch redux, 
            dispatch(login({value: {loggedIn: true,
              name: resp.data.name,
              username: resp.data.username,
              email: resp.data.email,
              events: resp.data.events
              }}));

            navigate('/');
            
        }catch(err){
          console.log(err);
        }
              
      };



  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={form.email}
                onChange={(e)=>setForm({...form, email: e.target.value})}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
                onChange={(e)=>setForm({...form, password: e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link  variant="body2" component={NavLink} to="/profile/register">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link  variant="body2" component={NavLink} to="/profile/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignIn;