import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import companyService from '../api/companyService';
import { toast } from 'react-toastify';

import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialLinksStep from '../components/SocialLinksStep';
import ContactStep from '../components/ContactStep';
import AccountSettings from '../components/AccountSettings';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const SettingsPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const [profileData, setProfileData] = useState({}); // State for the fetched data
    const { token } = useSelector((state) => state.auth);

    // useEffect to fetch data when the component loads
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await companyService.getCompanyProfile(token);
                setProfileData(response.data);
            } catch (error) {
                console.error(error);
                toast.error('Could not fetch company profile.');
            }
        };

        if (token) {
            fetchProfileData();
        }
    }, [token]); // The effect depends on the token

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            await companyService.updateCompanyProfile(profileData, token);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
                        <Tab label="Company Info" />
                        <Tab label="Founding Info" />
                        <Tab label="Social Media Profile" />
                        <Tab label="Contact Info" />
                        <Tab label="Account Settings" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <CompanyInfoStep formData={profileData} onProfileChange={handleProfileChange} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <FoundingInfoStep formData={profileData} onProfileChange={handleProfileChange} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <SocialLinksStep
                        links={profileData.social_links || []}
                    // We'll add update handlers later
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <ContactStep formData={profileData} onProfileChange={handleProfileChange} />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                   <AccountSettings/>
                </TabPanel>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
            </Box>
        </Container>
    );
};

export default SettingsPage;