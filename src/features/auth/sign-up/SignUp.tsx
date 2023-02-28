import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SignUpBody from "./sign-up-components/SignUp-Body";
import {Box, Container, Paper} from "@mui/material";

export default function SignUp() {


    return (

            <Container component="main" maxWidth="xs">

                <Paper sx={{paddingX:3}}>
                    <CssBaseline/>

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <SignUpBody/>
                    </Box>
                </Paper>

            </Container>
    );
}