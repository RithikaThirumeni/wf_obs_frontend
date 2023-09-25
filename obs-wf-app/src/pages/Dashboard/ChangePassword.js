
import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { resetPassword } from '../../services/ResetPasswordService';

export default function ChangePassword({alert}) {
  const [sendotp, setSendotp] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const handleOtpChange=(event)=>{
    setOtp(event.target.value);
  }
  const handlePasswordChange=(event)=>{
    setPassword(event.target.value);
  }
  const handleSendOtp = () => {
    setSendotp(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        "emailID":sessionStorage.getItem("emailID"),
        "password":password,
        "otp":Number(otp)
    }
    resetPassword(data)
      .then((response)=>{
        console.log(response);
        setAlertText(response.data.responseText);        
      })
  }


  return (
    
        <React.Fragment>
            {alert?(
        // <Card sx={{ maxWidth: 345 }}>
        <Card fullWidth>
        
        <CardContent>
            <Typography variant="h4" color="text.primary">
            Change Password
            </Typography>
        </CardContent>      
            <CardContent>
            <Container component="main" maxWidth="xs">
                <Box>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField 
                            required
                            fullWidth
                            id="emailID"
                            label="Email ID"
                            name="emailID"
                            />
                    </Grid>
                    {sendotp?(
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField 
                                required
                                fullWidth
                                type='number'
                                id="otp"
                                label="OTP"
                                value={otp}
                                onChange={handleOtpChange}
                                name="otp"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                            Reset Password
                            </Button>
                        </Grid>
                        </Box>
                    ):null}
                    </Grid>
                    <Typography variant="body" color="text.primary">
                        {alertText}
                    </Typography>
                
                </Box>
            </Container>
            
            </CardContent>
            <CardActions>
                <Button size="small" sx={{flex:1}} onClick={handleSendOtp}>Send OTP to Email</Button>
            </CardActions>
    </Card>
    ):null}
    </React.Fragment>
    
    
  );
}
