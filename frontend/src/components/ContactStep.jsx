import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const ContactStep = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // react-phone-input-2 has a different onChange signature
    const handlePhoneChange = (value) => {
        setFormData({ ...formData, contact_phone: value });
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
                        value={formData.map_location || ''}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Phone Input */}
                <Grid item xs={12}>
                    <PhoneInput
                        country={'us'} // Default country
                        value={formData.contact_phone || ''}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%' }}
                    />
                </Grid>

                {/* Email Input */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="contact_email"
                        label="Email"
                        value={formData.contact_email || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactStep;