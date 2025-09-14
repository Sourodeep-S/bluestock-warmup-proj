import React, { useRef } from 'react';
import { Box, Grid, TextField, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import imageUploadService from '../api/imageUploadService';

const CompanyInfoStep = ({ formData, onProfileChange }) => {
    const { token } = useSelector((state) => state.auth);

    // Refs for the hidden file inputs
    const logoInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    const handleChange = (e) => {
        onProfileChange(e);
    };

    // --- Logo Upload Logic ---
    const handleLogoBoxClick = () => logoInputRef.current.click();
    const handleLogoFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const response = await imageUploadService.uploadLogo(file, token);
                onProfileChange({ target: { name: 'company_logo_url', value: response.data.url } });
                toast.success('Logo uploaded successfully!');
            } catch (error) {
                console.error(error);
                toast.error('Logo upload failed.');
            }
        }
    };

    // --- Banner Upload Logic ---
    const handleBannerBoxClick = () => bannerInputRef.current.click();
    const handleBannerFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const response = await imageUploadService.uploadBanner(file, token);
                onProfileChange({ target: { name: 'company_banner_url', value: response.data.url } });
                toast.success('Banner uploaded successfully!');
            } catch (error) {
                console.error(error);
                toast.error('Banner upload failed.');
            }
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Logo & Banner Image</Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Upload Logo Box */}
                <Grid item xs={12} sm={6}>
                    <input type="file" ref={logoInputRef} onChange={handleLogoFileChange} style={{ display: 'none' }} accept="image/*" />
                    <Paper onClick={handleLogoBoxClick} variant="outlined" sx={{ p: 2, textAlign: 'center', border: '2px dashed grey', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        {formData.company_logo_url ? (
                            <img src={formData.company_logo_url} alt="Company Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        ) : (
                            <>
                                <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="body2">Browse photo or drop here</Typography>
                            </>
                        )}
                    </Paper>
                </Grid>

                {/* Banner Image Box */}
                <Grid item xs={12} sm={6}>
                    <input type="file" ref={bannerInputRef} onChange={handleBannerFileChange} style={{ display: 'none' }} accept="image/*" />
                    <Paper onClick={handleBannerBoxClick} variant="outlined" sx={{ p: 2, textAlign: 'center', border: '2px dashed grey', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        {formData.company_banner_url ? (
                            <img src={formData.company_banner_url} alt="Company Banner" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                        ) : (
                            <>
                                <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="body2">Banner Image</Typography>
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <TextField required fullWidth name="company_name" label="Company name" value={formData.company_name || ''} onChange={handleChange} sx={{ mb: 3 }} />
            <TextField required fullWidth name="about_company" label="About Us" multiline rows={6} value={formData.about_company || ''} onChange={handleChange} />
        </Box>
    );
};

export default CompanyInfoStep;