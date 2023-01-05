import * as React from 'react';
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Main from "../main/Main";
import SignIn from "../auth/sign-in/SignIn";
import SignUp from "../auth/sign-up/SignUp";

export const App = () => {
    return (

        <Container fixed>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={'login'} element={<SignIn/>}/>
                <Route path={'register'} element={<SignUp/>}/>
            </Routes>
        </Container>
    );
}



