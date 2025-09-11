import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/authSlice';
import authService from '../api/authService';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Call the API
            const data = await authService.login(formData);

            // 2. Dispatch the action to save the token in the Redux store
            dispatch(setToken(data.token));

            // 3. Redirect to the dashboard
            navigate('/');

        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            // In a real app, you would set an error state here to show the user
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        // The JSX for the form layout is the same as before
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left Gradient Panel */}
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    background: 'linear-gradient(to right bottom, #F9D8FF, #6647D6)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h2" sx={{ color: 'white', opacity: 0.5 }}>
                    IMG Placeholder
                </Typography>
            </Grid>

            {/* Right Form Panel */}
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Box}
                elevation={6}
                square
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '400px',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                        Login as a Company
                    </Typography>

                    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email ID"
                            name="email"
                            value={email}
                            onChange={onChange}
                            autoFocus
                        />
                        <Link href="#" variant="body2">
                            Login with OTP
                        </Link>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Enter your password"
                            // Dynamically set the type based on our state
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={onChange}
                            // This is the new part that adds the icon
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Grid container>
                            <Grid item xs>
                                {/* This empty item pushes the next one to the right */}
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#5C7FFF', borderRadius: '22.5px', textTransform: 'none', fontSize: '1rem' }}
                        >
                            Login
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Typography variant="body2">
                                    Don't have an account?{' '}
                                    <Link href="/register" variant="body2">
                                        Sign up
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;