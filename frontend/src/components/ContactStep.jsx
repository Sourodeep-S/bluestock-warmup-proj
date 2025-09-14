import React from 'react';
import { Box, Grid, TextField, InputAdornment } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline'; // 1. Import the icon

const ContactStep = ({ formData, onProfileChange }) => {
    const handleChange = (e) => {
        onProfileChange(e);
    };

    const handlePhoneChange = (value) => {
        onProfileChange(value)
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Map Location */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="map_location"
                        label="Map Location"
                        value={formData.map_location_url || ''}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Phone Input */}
                <Grid item xs={12}>
                    <PhoneInput
                        country={'in'}
                        value={formData.headquarter_phone_no || ''}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%', height: '56px' }} // Match MUI default height
                    />
                </Grid>

                {/* Email Input */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="contact_email"
                        //label="Email"
                        placeholder='Email'
                        value={formData.headquarter_mail_id || ''}
                        onChange={handleChange}
                        // 2. Add the InputProps for the startAdornment
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactStep;