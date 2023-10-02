
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
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateField, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import {AdapterDateFns} from '@mui/lab/AdapterDateFns'
import dayjs from 'dayjs';
import en from 'dayjs/locale/en-in';
import { displayAccountStatement } from '../../services/AccountStatementService';
import AccountStatementTable from './AccountStatementTable';

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

export default function AccountStatement() {
  const [expanded, setExpanded] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState("");

  var [accountStatement, setAccountStatement] = useState("");
  const container = React.useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
        "accountNumber":Number(formdata.get('accountNumber'))
    }
    displayAccountStatement(Number(formdata.get('accountNumber')), formdata.get("startDate"), formdata.get("endDate"))
      .then((response)=>{
        console.log(response);
        if(response.data.responseText==="sucessfully retrieved statement"){
           
          setAccountStatement(response.data.obj);
          if(accountStatement.length===0){
            setAlert(false);
            setErrors(true);
            setErrorText("No Transactions available");
          }
          else{
            setErrors(false);
            setAlert(true);
          }
          console.log(accountStatement, response.data.responseText);
        }
        else{
            setErrors(true);
            setErrorText(response.data.responseText);
        }
        
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
            S
          </Avatar>
        }
        
      />
      <CardContent>
        <Typography variant="h3" color="text.primary">
          Account Statement
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
                  <Grid item xs={12} sm={12}>
                      <TextField InputLabelProps={{shrink:true}}
                        required
                        fullWidth
                        type='date'
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                      />
                  </Grid>
                  <br></br>
                  <Grid item xs={12} sm={12}>
                      <TextField InputLabelProps={{shrink:true}}
                        required
                        fullWidth
                        type='date'
                        id="endDate"
                        label="End Date"
                        name="endDate"
                      />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  View Statement
                </Button>
              </Box>
            </Box>
          </Container>
          <Typography sx={{ p: 2 }}>{errors?(<p>{errorText}</p>):(
                <Popover
                id='simple-popover'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorPosition={{left:'50%', top:'50%'}}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'center',
                }}
              >
                <AccountStatementTable accountStatement={accountStatement} alert={alert}></AccountStatementTable>
              </Popover>
            )}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}