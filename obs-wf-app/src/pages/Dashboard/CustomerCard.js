import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import ChangePassword from './ChangePassword';
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
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CustomerCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState("");
  const handleChangePassword = (event) => {
    event.preventDefault();
    setAlert(true);
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setAlert(true);
  };

  const open = Boolean(anchorEl);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" color="text.primary" gutterBottom>
          {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}
        </Typography>

        <Typography variant="h6" component="div">
          Customer ID - {sessionStorage.getItem("customerID")}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {sessionStorage.getItem("activeStatus")?(<p>Active</p>):(<p>Inactive</p>)}
        </Typography>
        <Typography variant="h6">
          Phone Number : {sessionStorage.getItem("phoneNumber")}
          <br/>
          Email : {sessionStorage.getItem("emailID")}
          <br />
          Date of Birth : {sessionStorage.getItem("dateOfBirth")}
        </Typography>
      </CardContent>
      <CardActions >
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          Change Password
          {/* <Button size="small" sx={{flex:1}} onClick={handleChangePassword}>Change Password</Button> */}
        </ExpandMore>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {!alert?(null):(
                <ChangePassword sx={{flex:1}} alert={alert}></ChangePassword>
            )}
          </Container>
        </CardContent>
      </Collapse>
      {/* <Typography sx={{ p: 2 }}>{!alert?(null):(
              <ChangePassword sx={{flex:1}} alert={alert}></ChangePassword>
          )}
      </Typography> */}
    </Card>
  );
}
