import React from 'react';
import { Box, Grid, TextField, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CompanyInfoStep = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Logo & Banner Image
            </Typography>

            {/* Grid container for the two upload boxes */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Upload Logo Box */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2, textAlign: 'center', border: '2px dashed grey', height: '200px',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">Browse photo or drop here</Typography>
                        <Typography variant="caption" display="block">A photo larger than 400px is recommended.</Typography>
                    </Paper>
                </Grid>

                {/* Banner Image Box */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2, textAlign: 'center', border: '2px dashed grey', height: '200px',
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">Banner Image</Typography>
                        <Typography variant="caption" display="block">Banner Images optimal dimension 1020x400.</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Full-width fields are now outside the above grid */}
            <TextField
                required fullWidth id="company_name" name="company_name" label="Company name"
                value={formData.company_name || ''}
                onChange={handleChange}
                sx={{ mb: 3 }}
            />

            <TextField
                required fullWidth id="description" name="description" label="About Us"
                multiline rows={6}
                placeholder="Write down about your company. Let the candidate know who we are..."
                value={formData.about_company || ''}
                onChange={handleChange}
            />
        </Box>
    );
};

export default CompanyInfoStep;