import React from 'react';
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const SignUpBodyLinks = () => {



    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href="login" variant="body2">
                    Уже есть аккаунт? Войти
                </Link>
            </Grid>
        </Grid>
    );
};

export default SignUpBodyLinks;