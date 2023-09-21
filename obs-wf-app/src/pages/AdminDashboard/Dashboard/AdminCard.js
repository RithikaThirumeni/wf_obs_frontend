import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AdminCard(){
    return (
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          Welcome Admin
        </Typography>
        <Typography variant="h5" sx={{ fontSize: 16 }}  component="div">
          Admin ID - {sessionStorage.getItem("adminID")}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Admin can view and verifiy customers
        </Typography>
        <Typography variant="body2">
            Admin can create new account for customer,
          <br />
          Enable or Disable customer accounts.
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small"sx={{flex:1}}>Change Password</Button>
      </CardActions>
      
    </Card>
    );
}