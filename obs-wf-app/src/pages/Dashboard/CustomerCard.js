import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useLocation, Link, useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CustomerCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 16 }}  component="div">
          Customer ID - {sessionStorage.getItem("customerID")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {sessionStorage.getItem("residentAddress")}
        </Typography>
        <Typography variant="body2">
          Phone Number : {sessionStorage.getItem("phoneNumber")}, Email : {sessionStorage.getItem("emailID")}
          <br />
          Date of Birth : {sessionStorage.getItem("dateOfBirth")}
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small">Edit Details</Button>
        <Button size="small"sx={{flex:1}}>Change Password</Button>
        <Button size="small">Change PIN</Button>
      </CardActions>
      
    </Card>
  );
}
