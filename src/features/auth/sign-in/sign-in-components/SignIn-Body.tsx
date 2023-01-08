import React from 'react';
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import SignInBodyLinks from "./SignIn-BodyLinks";
import {SubmitHandler, useForm} from "react-hook-form";
import FormTextField from "../../../../common/components/FormTextField";
import {
    validationHelpers,
    validationMessages,
    validation
} from "../../../../common/constans/validation";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {loginTC} from "../../auth-slice";

type SignInFormInputs = {
    email: string
    password: string
}

const SignInBody = () => {

    const dispatch = useAppDispatch()

    const {control, handleSubmit, formState: {isValid}} = useForm<SignInFormInputs>({mode: "all"});

    const onSubmit: SubmitHandler<SignInFormInputs> = data => {
        dispatch(loginTC(data))
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>



            <FormTextField
                            type={"email"}
                            label={"Email"}
                            defaultValue={""}
                            name={"email"}
                            rules={{
                                required:validationMessages.isRequired,
                                pattern: {value:validation.email,message: validationMessages.incorrectEmail}
                            }}
                            control={control as any}/>

            <FormTextField
                            type={"password"}
                            label={"Пароль"}
                            defaultValue={""}
                            name={"password"}
                            rules={{
                                required:validationMessages.isRequired,
                                minLength:validationHelpers.getMinLengthMessage(6)
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