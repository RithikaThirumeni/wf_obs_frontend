import React from 'react';
import ChangePassword from '../Dashboard/ChangePassword';
import MaterialLink from "@mui/material/Link";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export const ForgotPassword = () => {    
    return(
        <Grid>
        <Grid item>
        <ChangePassword sx={{flex:1}} alert={true}/>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
                  <MaterialLink component={Link} to="/login" variant="body2">
                    {"Go To Login Page"}
                  </MaterialLink>
                </Grid>
        </Grid>
    );

}