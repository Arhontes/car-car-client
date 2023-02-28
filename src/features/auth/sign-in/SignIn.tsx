import * as React from 'react';
import {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SignInBody from "./sign-in-components/SignIn-Body";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {selectorCheckIsAuth} from "../../../common/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";

export default function SignIn() {

    const isAuth = useAppSelector(selectorCheckIsAuth)
    const navigate = useNavigate()

    useEffect(()=>{
        if (isAuth) navigate('/')
    },[isAuth])
    return (


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

    );
}
