import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';

import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialLinksStep from '../components/SocialLinksStep';
import ContactStep from '../components/ContactStep';
import SuccessStep from '../components/SuccessStep';

const steps = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

const DashboardPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Initialize social_links as an array with one empty link
    social_links: [{ platform: '', url: '' }],
  });

  // --- Handlers for the multi-step form navigation ---
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- NEW Handlers for the dynamic social links ---
  const handleSocialLinkChange = (index, event) => {
    const newLinks = [...formData.social_links];
    newLinks[index][event.target.name] = event.target.value;
    setFormData({ ...formData, social_links: newLinks });
  };

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      social_links: [...formData.social_links, { platform: '', url: '' }],
    });
  };

  const handleRemoveSocialLink = (index) => {
    const newLinks = [...formData.social_links];
    newLinks.splice(index, 1);
    setFormData({ ...formData, social_links: newLinks });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CompanyInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <FoundingInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        // Pass the new props down to the SocialLinksStep component
        return (
          <SocialLinksStep
            links={formData.social_links}
            onLinkChange={handleSocialLinkChange}
            onAddLink={handleAddSocialLink}
            onRemoveLink={handleRemoveSocialLink}
          />
        );
      case 3:
        return <ContactStep formData={formData} setFormData={setFormData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      <Typography component="h1" variant="h4" align="center">
        Company Registration
      </Typography>
      <Stepper activeStep={activeStep} sx={{ my: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <SuccessStep/>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
};

export default DashboardPage;