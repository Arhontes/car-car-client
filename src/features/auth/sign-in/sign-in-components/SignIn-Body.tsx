import React from 'react';
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import SignInBodyLinks from "./SignIn-BodyLinks";
import {SubmitHandler, useForm} from "react-hook-form";
import FormTextField from "../../../../common/components/FormTextField";
import {validation} from "../../../../common/constans/validation";

type FormInput  = {
    email: string
    password: string
}

const SignInBody = () => {

    const {control, handleSubmit, formState: {isValid}} = useForm<FormInput>({mode: "all"});

    const onSubmit: SubmitHandler<FormInput> = data => {
        console.log(data)
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>

            <FormTextField
                            label={"Email"}
                            defaultValue={""}
                            name={"email"}
                            rules={{
                                required:"Поле обязательно к заполнению",
                                pattern: {value:validation.email,message: "Некорректный email"}
                            }}
                            control={control as any}/>

            <FormTextField
                            label={"Password"}
                            defaultValue={""}
                            name={"password"}
                            rules={{
                                required:"Введите пароль",
                            }}
                            control={control as any}/>

            <Button
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Войти
            </Button>
            <SignInBodyLinks/>
        </Box>
    );
};

export default SignInBody;