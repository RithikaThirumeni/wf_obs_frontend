import React from 'react'
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

function ForgotPassword(props) {

    function handleCancelClick(){
        props.forgotPasswordBtnClick(false)
    }

    return (
        <>
            <Grid container sx={{ marginBottom: "0.5rem" }}>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={5}>
                    <text>Forgot Password</text>
                </Grid>
            </Grid>

            <Grid container alignItems={"center"} spacing={1}>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Email"
                        type='email'
                        size='small'
                        fullWidth
                        placeholder='Enter Registered Email ID'
                        required
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button size="small" variant='contained'>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button size='small' variant='outlined' onClick={handleCancelClick}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ForgotPassword