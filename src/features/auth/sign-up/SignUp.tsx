import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SignUpBody from "./sign-up-components/SignUp-Body";

const theme = createTheme();

export default function SignUp() {


    return (

        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">

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
            </Container>
        </ThemeProvider>
    );
}