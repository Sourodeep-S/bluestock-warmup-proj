import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessStep = () => {
    return (
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" component="h1" gutterBottom>
                Congratulations, your profile is 100% complete!
            </Typography>
            <Box>
                <Button variant="outlined" sx={{ mr: 2 }}>
                    View Dashboard
                </Button>
                <Button variant="contained">
                    View Profile
                </Button>
            </Box>
        </Box>
    );
};

export default SuccessStep;