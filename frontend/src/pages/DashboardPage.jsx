import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';

// We will create these component files next
import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialLinksStep from '../components/SocialLinksStep';
import ContactStep from '../components/ContactStep';

const steps = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

const DashboardPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CompanyInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <FoundingInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <SocialLinksStep formData={formData} setFormData={setFormData} />;
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
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
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