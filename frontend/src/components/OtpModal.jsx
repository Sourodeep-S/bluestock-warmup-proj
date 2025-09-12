import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Link } from '@mui/material';

// 1. Receive the new mobileNumber prop
const OtpModal = ({ open, onClose, onVerifySuccess, mobileNumber }) => {

    const handleVerify = () => {
        onVerifySuccess();
    };

    // 2. Create a masked version of the number for display
    const maskedNumber = mobileNumber
        ? `${mobileNumber.substring(0, 6)}****${mobileNumber.substring(mobileNumber.length - 3)}`
        : '';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Great! Almost done!
                <Typography variant="body1" component="p">
                    Please verify your mobile no
                </Typography>
            </DialogTitle>

            <DialogContent>
                {/* Email Verification Info Box */}
                <Box sx={{ bgcolor: '#E8F5E9', p: 2, borderRadius: 2, textAlign: 'center', my: 2 }}>
                    <Typography variant="body2">
                        A verification link has been sent to your email. Please check your inbox and verify.
                    </Typography>
                </Box>

                {/* OTP Info Box */}
                <Box sx={{ bgcolor: '#FCE4EC', p: 2, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                        {/* 3. Use the masked number here */}
                        Enter the One Time Password (OTP) which has been sent to ({maskedNumber})
                    </Typography>
                </Box>

                <TextField
                    autoFocus margin="dense" id="otp" label="Enter Your OTP Here" type="text"
                    fullWidth variant="outlined" sx={{ my: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                        Didn't receive OTP? <Link href="#">Resend OTP</Link>
                    </Typography>
                    <Typography variant="body2">
                        Having Trouble? <Link href="#">Report Issue!</Link>
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{ flexGrow: 1 }}>
                    Close
                </Button>
                <Button onClick={handleVerify} variant="contained" sx={{ flexGrow: 1, bgcolor: '#5C7FFF' }}>
                    Verify Mobile
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OtpModal;