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
// import { useAppSelector } from '../app/hooks';
// import {selectUser} from '../features/user/userSlice';
import axios from 'axios';





const Register = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        try{
            if(form.password === confPassword){
                const resp = await axios.post("http://localhost:5000/api/v1/users/register-user", form);
                console.log(resp.data);
                navigate('/profile/signin');
            }
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={form.name}
                onChange={(e)=>setForm({...form, name: e.target.value})}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="username"
              value={form.username}
                onChange={(e)=>setForm({...form, username: e.target.value})}
              
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={confPassword}
                onChange={(e)=>setConfPassword( e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="accept" color="primary" />}
              label="Accept Terms"
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

export default Register;