import React from 'react';
import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FoundingInfoStep = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Row 1: Three Dropdowns */}
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="org-type-label">Organization Type</InputLabel>
                        <Select
                            labelId="org-type-label" name="organization_type"
                            value={formData.organization_type || ''} label="Organization Type" onChange={handleChange}
                        >
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="industry-type-label">Industry Types</InputLabel>
                        <Select
                            labelId="industry-type-label" name="industry"
                            value={formData.industry || ''} label="Industry Types" onChange={handleChange}
                        >
                            <MenuItem value="SaaS">SaaS</MenuItem>
                            <MenuItem value="E-commerce">E-commerce</MenuItem>
                            <MenuItem value="Fintech">Fintech</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="team-size-label">Team Size</InputLabel>
                        <Select
                            labelId="team-size-label" name="team_size"
                            value={formData.team_size || ''} label="Team Size" onChange={handleChange}
                        >
                            <MenuItem value="1-10">1-10</MenuItem>
                            <MenuItem value="11-50">11-50</MenuItem>
                            <MenuItem value="51-200">51-200</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Row 2: Two Text Fields */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth name="founded_date" label="Year of Establishment"
                        placeholder="dd/mm/yyyy" value={formData.founded_date || ''} onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth name="website" label="Company Website"
                        placeholder="Website url..." value={formData.website || ''} onChange={handleChange}
                    />
                </Grid>

                {/* Row 3: Large Text Area */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth name="company_vision" label="Company Vision"
                        multiline rows={5}
                        placeholder="Tell us about your company vision..."
                        value={formData.company_vision || ''}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FoundingInfoStep;