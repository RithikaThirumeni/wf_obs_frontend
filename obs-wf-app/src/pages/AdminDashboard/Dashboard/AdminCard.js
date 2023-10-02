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
        <Typography variant="h3" color="text.primary" gutterBottom>
          Welcome, Admin
        </Typography>
        <Typography variant="h4" component="div">
          Admin ID - {sessionStorage.getItem("adminID")}
        </Typography>
      </CardContent>
    </Card>
    );
}