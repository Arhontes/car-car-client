import React from "react";
import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormTextField from "../../common/components/FormTextField";
import {validation, validationHelpers, validationMessages} from "../../common/constans/validation";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetAppStatus} from "../../common/selectors/app-selectors";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserType} from "../../common/types/profile-types";
import {updateProfileTC} from "./profile-slice";

type ProfileInputs = {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
}
export const ProfileInfo =React.memo(({phone, email, lastName, firstName, userId}: UserType) => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(selectorGetAppStatus)

    const {control, handleSubmit, formState: {isValid}} = useForm<ProfileInputs>({
        mode: "all", defaultValues: {
            email: email!,
            lastName: lastName!,
            firstName: firstName!,
            phone: phone!
        }
    });

    const onSubmit: SubmitHandler<ProfileInputs> = data => {
        dispatch(updateProfileTC({profileId: userId!, updateProfileDto: data}))
    };

    return (

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={"Имя"}
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
                        label={"Фамилия"}
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
                        label={"Номер телефона"}
                        defaultValue={""}
                        name={"phone"}
                        rules={{
                            required: validationMessages.isRequired,
                            pattern: {
                                value: validation.phone,
                                message: "Пример: 89103123167 или +7-910-221-22-22 или +7(910)-221-22-22"
                            },
                            maxLength: validationHelpers.getMaxLengthMessage(50)
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
                Подтвердить
            </Button>
        </Box>
    )

})