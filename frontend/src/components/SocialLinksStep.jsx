import React from 'react';
import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// 1. Import the social media icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialLinksStep = ({ links, onLinkChange, onAddLink, onRemoveLink }) => {
    return (
        <Box>
            {links.map((link, index) => (
                <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Platform</InputLabel>
                            <Select
                                label="Platform"
                                name="platform"
                                value={link.platform}
                                onChange={(e) => onLinkChange(index, e)}
                            >
                                {/* 2. Add the icon next to the text in each MenuItem */}
                                <MenuItem value="Facebook">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <FacebookIcon sx={{ mr: 1 }} /> Facebook
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Twitter">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TwitterIcon sx={{ mr: 1 }} /> Twitter
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Instagram">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <InstagramIcon sx={{ mr: 1 }} /> Instagram
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Youtube">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <YouTubeIcon sx={{ mr: 1 }} /> Youtube
                                    </Box>
                                </MenuItem>
                                <MenuItem value="LinkedIn">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LinkedInIcon sx={{ mr: 1 }} /> LinkedIn
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            fullWidth
                            label="Profile link/Url..."
                            name="url"
                            value={link.url}
                            onChange={(e) => onLinkChange(index, e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        {links.length > 1 && (
                            <IconButton aria-label="delete" onClick={() => onRemoveLink(index)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            ))}

            <Button
                startIcon={<AddCircleOutlineIcon />}
                sx={{ mt: 2 }}
                onClick={onAddLink}
            >
                Add New Social Link
            </Button>
        </Box>
    );
};

export default SocialLinksStep;