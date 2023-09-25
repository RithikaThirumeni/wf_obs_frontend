import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Hidden, InputAdornment, InputLabel, MenuItem  } from '@mui/material';
import { useState } from 'react';
import { deposit } from '../../services/DepositService';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Deposit() {
  const [expanded, setExpanded] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const [alertContent, setAlertContent] = React.useState("");
  const [errorContent, setErrorContent] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
        "accountNumber":Number(formdata.get('accountNumber')),
        "amount":parseFloat(formdata.get('amount')),
    }
    console.log(data.amount);
    deposit(data)
      .then((response) => {
        console.log(response);
        if(response.data.responseText==="Updated balance!"){
          setAlert(true);
          setAlertContent(response.data.responseText);
        }
        else{
          setAlert(false);
          setErrorContent(response.data.responseText+" "+response.data.errors);
          
        }
      })
      .catch( error => {
          alert("Error = "+error);
      });  
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            D
          </Avatar>
        }
        
      />
      <CardContent>
        <Typography variant="h3" color="text.primary">
          Deposit
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField inputProps={{step:0.01}}
                          InputProps={{endAdornment:<InputAdornment position='end'>Rupees</InputAdornment>}}
                        required
                        fullWidth
                        type='number'
                        id="amount"
                        label="Amount"
                        name="amount"
                        helperText="enter upto 2 decimal places"
                      />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                      <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        required
                        fullWidth
                        id="accountNumber"
                        label="Account Number"
                        name="accountNumber"
                        />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Deposit
                </Button>
              </Box>
            </Box>
          </Container>
          {alert?(
            <Typography paragraph>{alertContent}</Typography>
          ):<Typography paragraph>{errorContent}</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
}
