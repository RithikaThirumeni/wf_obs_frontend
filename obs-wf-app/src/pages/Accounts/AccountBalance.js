
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
import { displayAccountBalance } from "../../services/DisplayAccountService";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function AccountBalance() {
  const [expanded, setExpanded] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState("");
  var [accountBalance, setAccountBalance] = useState("");
  const container = React.useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
        "accountNumber":Number(formdata.get('accountNumber'))
    }
    displayAccountBalance(formdata.get('accountNumber'))
      .then((response)=>{
        if(response.data.responseText==="success"){
          setErrors(false);
          setAlert(true);
          setAccountBalance(response.data.obj);
          console.log(accountBalance);
        }
        else{
            setErrors(true);
            setErrorText(response.data.responseText);
        }
        console.log(response);
        
      }) 
      setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            B
          </Avatar>
        }
        
      />
      <CardContent>
        <Typography variant="h3" color="text.primary">
          Account Balance
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
                  View Balance
                </Button>
              </Box>
            </Box>
          </Container>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
                {!errors ? (
                <Portal container={container.current}>
                    <span>Balance : {accountBalance} Rupees only</span>
                </Portal>
                ) : (
                    <Portal container={container.current}>
                        <span>{errorText}</span>
                    </Portal>
                    )}
            </Typography>
            <Box sx={{ p: 1, my: 1 }} ref={container} />
        </CardContent>
      </Collapse>
    </Card>
  );
}