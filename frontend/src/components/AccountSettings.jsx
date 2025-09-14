import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import companyService from '../api/companyService';
import { clearToken } from '../store/authSlice';


const AccountSettings = () => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handleClickShowPassword = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Handler for the delete button
    const handleDeleteCompany = async () => {
        // Show a confirmation dialog before proceeding
        if (window.confirm('Are you sure you want to delete your company profile? This action cannot be undone.')) {
            try {
                const response = await companyService.deleteCompanyProfile(token);
                toast.success(response.message);
                dispatch(clearToken()); // Log the user out by clearing their token
                navigate('/dashboard'); // Redirect to the login page
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete company profile.');
            }
        }
    };

    return (
        <Box>
            {/* Change Password Section */}
            <Typography variant="h6" gutterBottom>
                Change Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, maxWidth: '800px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="current" label="Current Password" type={showPasswords.current ? 'text' : 'password'}
                            fullWidth value={passwords.current} onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClickShowPassword('current')}>
                                            {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="new" label="New Password" type={showPasswords.new ? 'text' : 'password'}
                            fullWidth value={passwords.new} onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClickShowPassword('new')}>
                                            {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="confirm" label="Confirm Password" type={showPasswords.confirm ? 'text' : 'password'}
                            fullWidth value={passwords.confirm} onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleClickShowPassword('confirm')}>
                                            {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 2 }}>
                    Change Password
                </Button>
            </Box>

            {/* Delete Company Section */}
            <Box sx={{ mt: 5, p: 2, border: '1px solid', borderColor: 'error.main', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Delete Your Company
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    This action cannot be undone!
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<WarningAmberIcon />}
                    onClick={handleDeleteCompany}>
                    Close Account
                </Button>
            </Box>
        </Box>
    );
};

export default AccountSettings;