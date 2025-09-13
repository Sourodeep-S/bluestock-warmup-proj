import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Container, LinearProgress } from '@mui/material';

import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialLinksStep from '../components/SocialLinksStep';
import ContactStep from '../components/ContactStep';
import SuccessStep from '../components/SuccessStep';

const steps = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

const DashboardPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    social_links: [{ platform: '', url: '' }],
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

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

  const progressValue = (activeStep / steps.length) * 100;

  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      {activeStep !== steps.length && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1">Setup Progress</Typography>
            <Typography variant="body1" color="primary">{`${Math.round(progressValue)}% Completed`}</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progressValue} sx={{ mb: 4 }} />
        </>
      )}

      <Stepper activeStep={activeStep} sx={{ my: 4, display: activeStep === steps.length ? 'none' : 'flex' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <SuccessStep />
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
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