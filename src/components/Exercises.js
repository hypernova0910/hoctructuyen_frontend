import React, {useState, useEffect, useRef, useReducer, useContext} from 'react';
import ExerciseForm from './ExerciseForm'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {formatDistance, formatDistanceStrict} from 'date-fns'
import vi from 'date-fns/locale/vi'
import ExerciseCard from './ExerciseCard'

export default function Exercises(props){
    const [open, setOpen] = React.useState(false);
    const [exercise, setExercise] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // formatDistanceToNowStrict(datems, {
    //     addSuffix: true,
    //     locale: {
    //       ...locale,
    //       formatDistance,
    //   },
    // })

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: "10px 0"}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Sinh viên</TableCell>
                    <TableCell>Đã nộp bài</TableCell>
                    <TableCell>Thời gian nộp bài</TableCell>
                    <TableCell>Đã chấm bài</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.exercises.map((exercise, index) => (
                    <ExerciseCard 
                    key={exercise.masinhvien} 
                    exercise={exercise} 
                    process={props.process}
                    handleClickMark={() => {
                        setOpen(true);
                        setExercise(exercise);
                    }}/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <ExerciseForm open={open} handleClose={handleClose} reload={props.reload} exercise={exercise}/>
        </>
        // props.exercises.map((exercise) => <ExerciseCard key={exercise.idnhomfile} exercise={exercise}/>)
    )
}