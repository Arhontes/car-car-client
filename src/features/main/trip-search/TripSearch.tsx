import React from 'react';
import {Box} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import vw from '../../../common/assets/vw.png'

type Inputs = {
    from: string,
    to: string,
    date: string
};

const TripSearch = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    return (
        <Box sx={{
            display: "flex",
            alignItems: "top",
            justifyContent: "center",
            height: 400,
            backgroundImage: `url(${vw})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundSize: "contain",
        }}>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input style={{height: 35, margin: 10}} defaultValue="Онега" {...register("from", {required: true})} />

                {/* include validation with required or other standard HTML validation rules */}
                <input style={{height: 35, margin: 10}}
                       defaultValue="Aрхангельск" {...register("to", {required: true})} />

                {/* include validation with required or other standard HTML validation rules */}
                <input style={{height: 35, margin: 10}}
                       defaultValue={currentDate} {...register("date", {required: true})} />

                {/* errors will return when field validation fails  */}
                {errors.date && <span>This field is required</span>}

                <button style={{height: 35, margin: 10}} type={"submit"}> Найти поездку</button>
            </form>

        </Box>

    );
};

export default TripSearch;