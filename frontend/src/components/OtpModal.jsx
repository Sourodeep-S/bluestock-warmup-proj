import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Link } from '@mui/material';

const OtpModal = ({ open, onClose, onVerifySuccess }) => {

    // This function will be called when the user clicks "Verify Mobile"
    const handleVerify = () => {
        // In a real application, you would make an API call here to verify the OTP.
        // Since that's not built yet, we'll just assume it's successful.

        // Call the success function passed down from the parent (RegisterPage)
        onVerifySuccess();
    };

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
                        Enter the One Time Password (OTP) which has been sent to (+91 92222****442)
                    </Typography>
                </Box>

                <TextField
                    autoFocus
                    margin="dense"
                    id="otp"
                    label="Enter Your OTP Here"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ my: 2 }}
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