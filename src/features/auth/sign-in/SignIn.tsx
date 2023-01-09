import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SignInBody from "./sign-in-components/SignIn-Body";

const theme = createTheme();

export default function SignIn() {


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
                    <SignInBody/>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
