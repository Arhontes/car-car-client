import React from 'react';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const SignInBodyLinks = () => {
    return (
        <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                    Забыли пароль?
                </Link>
            </Grid>
            <Grid item>
                <Link href="#" variant="body2">
                    {"Нет аккаунта? Зарегистрироваться"}
                </Link>
            </Grid>
        </Grid>
    );
};

export default SignInBodyLinks;