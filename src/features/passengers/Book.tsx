import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {CreatePassengerDto} from "../../common/types/passengers-types";
import {Button, Container, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {TripType} from "../../common/types/trip-types";
import dayjs from "dayjs";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {addPassengerTC, passengersActions} from "./passenger-slice";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorCheckIsPassengerAdded, selectorGetAddedPassenger} from "../../common/selectors/passengers-selectors";
import {selectorGetAppStatus} from "../../common/selectors/app-selectors";

type BookStateType = {
    passenger:CreatePassengerDto
    trip:TripType
}
const Book = () => {
    const [open,setOpen] = useState(false)
    const {state,} = useLocation()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(selectorGetAppStatus)
    const isAdded = useAppSelector(selectorCheckIsPassengerAdded)
    const {passenger,trip} = state as BookStateType
    const day = dayjs(trip?.date).format("L")

    const onClickHandler = ()=> {
        dispatch(addPassengerTC(passenger))
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    useEffect(()=>{
        return ()=>{
            dispatch(passengersActions.setIsAdded(false))
        }
    },[])
    return (
        <Container fixed>
            <TableContainer component={Paper}>
                <Table >

                    <TableBody>
                        <TableRow>
                            <TableCell>Имя</TableCell>
                            <TableCell >{passenger?.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Фамилия</TableCell>
                            <TableCell >{passenger?.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Телефон</TableCell>
                            <TableCell >{passenger?.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Откуда</TableCell>
                            <TableCell >{passenger?.from}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Куда</TableCell>
                            <TableCell >{passenger?.to}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Дата поездки</TableCell>
                            <TableCell >{day.toString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >Время выезда</TableCell>
                            <TableCell >{trip.startTime}</TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
            <Dialog onClose={handleClose} open={open&&!!isAdded}>
                <div>
                    Успешно забронировано! С Вами свяжется менеджер для подтверждения! Данные о поездке можно найти в истории поездок меню пользователя
                </div>
            </Dialog>

            <Button disabled={appStatus==="loading"} onClick={()=>navigate(-1)} variant={"contained"}>
                Назад
            </Button>
            <Button disabled={isAdded||appStatus==="loading"} onClick={onClickHandler} variant={"contained"}>
                Забронировать
            </Button>
        </Container>
    );
};

export default Book;


