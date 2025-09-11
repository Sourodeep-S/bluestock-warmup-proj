import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Link, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '', mobile_no: '', email: '', gender: 'M',
    password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { full_name, mobile_no, email, gender, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // You can also use toast for form validation errors
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      full_name, mobile_no, email,
      gender: gender.toUpperCase(),
      password,
    };

    try {
      // Destructure the message directly from the response
      const { message } = await authService.register(userData);

      // Use the message from the API in our success toast
      toast.success(message);

      // Redirect to the login page on success
      navigate('/login');
    } catch (error) {
      // This is the important part
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Gradient Panel */}
      <Grid
        item xs={false} sm={4} md={7}
        sx={{
          background: 'linear-gradient(to right bottom, #F9D8FF, #6647D6)',
          backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex',
          justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Typography variant="h2" sx={{ color: 'white', opacity: 0.5 }}>
          IMG Placeholder
        </Typography>
      </Grid>

      {/* Right Form Panel */}
      <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square display="flex" alignItems="center" justifyContent="center">
        <Box
          sx={{
            my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '100%', maxWidth: '450px',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Register as a Company
          </Typography>

          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth label="Full Name" name="full_name" value={full_name} onChange={onChange} autoFocus />
            <TextField margin="normal" required fullWidth label="Mobile No" name="mobile_no" value={mobile_no} onChange={onChange} />
            <TextField margin="normal" required fullWidth label="Official Email" name="email" value={email} onChange={onChange} />

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row name="gender" value={gender} onChange={onChange}>
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel value="F" control={<Radio />} label="Female" />
                <FormControlLabel value="O" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <TextField
              margin="normal" required fullWidth name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password} onChange={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal" required fullWidth name="confirmPassword" label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword} onChange={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center' }}>
              By registering, you agree to our data collection and usage policies.
              Please read our <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Use</Link>.
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: '#5C7FFF', borderRadius: '22.5px', textTransform: 'none', fontSize: '1rem' }}
            >
              Register
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/login" variant="body2">
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;