import * as React from 'react';
import {Dayjs} from 'dayjs';
import 'dayjs/locale/ru';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

type CustomDatePickerType = {
    datePickerValue: Dayjs | null
    setDatePickerValue: (value: Dayjs | null) => void
}

export const CustomDatePicker = ({datePickerValue, setDatePickerValue}: CustomDatePickerType) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
            <Stack spacing={3}>
                <DatePicker
                    value={datePickerValue}
                    onChange={(newValue) => setDatePickerValue(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}