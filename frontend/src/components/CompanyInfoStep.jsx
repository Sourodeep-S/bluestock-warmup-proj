import React from 'react';
import { Box, Grid, TextField, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // An icon for the upload box

const CompanyInfoStep = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Logo & Banner Image
            </Typography>
            <Grid container spacing={3}>
                {/* Upload Logo Box */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '2px dashed grey',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">
                            Browse photo or drop here
                        </Typography>
                        <Typography variant="caption" display="block">
                            A photo larger than 400px is recommended.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Banner Image Box */}
                <Grid item xs={12} sm={6}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            border: '2px dashed grey',
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">
                            Banner Image
                        </Typography>
                        <Typography variant="caption" display="block">
                            Banner Images optimal dimension 1020x400.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Company Name */}
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="company_name"
                        name="company_name"
                        label="Company name"
                        value={formData.company_name || ''}
                        onChange={handleChange}
                    />
                </Grid>

                {/* About Us */}
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="description"
                        name="description"
                        label="About Us"
                        multiline
                        rows={4}
                        placeholder="Write down about your company. Let the candidate know who we are..."
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyInfoStep;