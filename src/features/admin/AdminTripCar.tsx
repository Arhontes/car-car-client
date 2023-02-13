import React, {ReactNode, useEffect} from 'react';
import {Car} from "../../common/types/cars-types";
import {UpdateTripDto} from "../../common/types/trip-types";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

type AdminTripCarPropsType = {
    cars: Car[] | null,
    currentCar: Car | null
    tripId:string
    updateTrip:(tripId: string, updateDto: UpdateTripDto) => void
}

const AdminTripCar = React.memo(({cars,currentCar,...restProps}:AdminTripCarPropsType) => {
    const [licensePlate, setLicensePlate] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setLicensePlate(event.target.value as string);
    };
    useEffect(()=>{
        const car = cars?.find(el=>el.licensePlate===licensePlate)
        if (car)
            restProps.updateTrip(restProps.tripId, {car} )
    },[licensePlate])
    return (
        <Box>
            <Box>
                {currentCar?.licensePlate? `Сейчас назначено: ${currentCar.licensePlate}` : `Не назначено` }
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="trip-car-select-label">Авто</InputLabel>
                    <Select
                        labelId="trip-car-select-label"
                        id="trip-car-select"
                        value={licensePlate}
                        label="Авто"
                        onChange={handleChange}
                    >
                        {cars?.map((el) => (
                            <MenuItem key={el.carId} value={el.licensePlate}>
                                {el.licensePlate}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>

    );
})

export default AdminTripCar;