import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormTextField from "../../../../common/components/FormTextField";
import {validation, validationHelpers, validationMessages} from "../../../../common/constans/validation";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {registerTC} from "../../auth-slice";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {selectorGetAppStatus} from "../../../../common/selectors/app-selectors";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import SignUpBodyLinks from "./SignUp-BodyLinks";
import {useNavigate} from "react-router-dom";
import {selectorCheckIsAuth} from "../../../../common/selectors/auth-selectors";

type SignUpFormInputs = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string,
}

const SignUpBody = () => {

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(selectorCheckIsAuth)
    const appStatus = useAppSelector(selectorGetAppStatus)

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const {control, handleSubmit, formState: {isValid}, getValues} = useForm<SignUpFormInputs>({mode: "all"});

    const onSubmit: SubmitHandler<SignUpFormInputs> = data => {
        dispatch(registerTC(data))
    };

    useEffect(()=>{
        if (isAuth){
            navigate("/")
        }
    },[isAuth])
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={"??????"}
                        defaultValue={""}
                        name={"firstName"}
                        rules={{
                            required: validationMessages.isRequired,
                            maxLength: validationHelpers.getMaxLengthMessage(20)
                        }}
                        control={control as any}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={"??????????????"}
                        defaultValue={""}
                        name={"lastName"}
                        rules={{
                            required: validationMessages.isRequired,
                            maxLength: validationHelpers.getMaxLengthMessage(20)
                        }}
                        control={control as any}/>
                </Grid>
                <Grid item xs={12}>

                    <FormTextField
                        type={"email"}
                        label={"Email"}
                        defaultValue={""}
                        name={"email"}
                        rules={{
                            required: validationMessages.isRequired,
                            pattern: {value: validation.email, message: validationMessages.incorrectEmail},
                            maxLength: validationHelpers.getMaxLengthMessage(50)
                        }}
                        control={control as any}/>
                </Grid>
                <Grid item xs={12}>

                    <FormTextField
                        label={"?????????? ????????????????"}
                        defaultValue={""}
                        name={"phone"}
                        rules={{
                            required: validationMessages.isRequired,
                            pattern: {
                                value: validation.phone,
                                message: "????????????: 89103123167 ?????? +7-910-221-22-22 ?????? +7(910)-221-22-22"
                            },
                            maxLength: validationHelpers.getMaxLengthMessage(50)
                        }}
                        control={control as any}/>

                </Grid>
                <Grid item xs={12}>
                    <div style={{position: "relative"}}>
                        <FormTextField
                            type={showPassword ? 'text' : 'password'}
                            label={"????????????"}
                            defaultValue={""}
                            name={"password"}
                            rules={{
                                required: validationMessages.isRequired,
                                pattern: {
                                    value: validation.password,
                                    message: validationMessages.incorrectPassword
                                },
                                minLength: validationHelpers.getMinLengthMessage(6),
                                maxLength: validationHelpers.getMaxLengthMessage(20),
                            }}
                            control={control as any}/>
                        <IconButton onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    sx={{position: "absolute", top: 24, right: 0}}>
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </div>

                </Grid>
                <Grid item xs={12}>
                    <FormTextField
                        type={"password"}
                        label={"?????????????????????????? ????????????"}
                        defaultValue={""}
                        name={"confirmPassword"}
                        rules={{
                            validate: (value) => validationHelpers.confirmPasswords(value,getValues("password"))
                        }}
                        control={control as any}/>
                </Grid>
            </Grid>
            <Button
                disabled={!isValid || appStatus === "loading"}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                ????????????????????????????????????
            </Button>
            <SignUpBodyLinks/>
        </Box>
    );
};

export default SignUpBody;