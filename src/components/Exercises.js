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
      
    const formatDistanceLocale = {
    //   lessThanXSeconds: '{{count}}s',
    //   xSeconds: '{{count}}s',
    //   halfAMinute: '30s',
      lessThanXMinutes: '{{count}} phút',
      xMinutes: '{{count}} phút',
      aboutXHours: '{{count}} giờ',
      xHours: '{{count}} giờ',
      xDays: '{{count}} ngày',
      aboutXWeeks: '{{count}} tuần',
      xWeeks: '{{count}} tuần',
      aboutXMonths: '{{count}} tháng',
      xMonths: '{{count}} tháng',
      aboutXYears: '{{count}} năm',
      xYears: '{{count}} năm',
      overXYears: '{{count}} năm',
      almostXYears: '{{count}} năm',
    }
    
    function formatDistance(token, count, options) {
      options = options || {}
    
      const result = formatDistanceLocale[token].replace('{{count}}', count)
    
      if (options.addSuffix) {
        if (options.comparison < 0) {
          return 'sớm ' + result
        } else {
          return 'muộn ' + result
        }
      }
    
      return result
    }

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
                    <TableRow
                    key={exercise.masinhvien}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>
                        {exercise.tenSinhVien}
                    </TableCell>
                    <TableCell>
                        <Checkbox checked={exercise.idnhomfile != null}/>
                    </TableCell>
                    <TableCell>
                        {exercise.lansuacuoi ? (new Date(exercise.lansuacuoi).toLocaleString()) : ''}
                        <br/>
                        {exercise.lansuacuoi ? 
                        formatDistanceStrict(new Date(exercise.lansuacuoi), new Date(props.process.thoiGianNop), {
                            addSuffix: true,
                            locale: {
                            // ...vi,
                            formatDistance,
                        },
                        })
                        : ''}
                    </TableCell>
                    <TableCell>
                        <Checkbox checked={exercise.diem != null}/>
                    </TableCell>
                    <TableCell>
                        <Button
                        variant="contained"
                        component="label"
                        // sx={{margin: "8px 8px 8px 0"}}
                        onClick={() => {
                            setOpen(true)
                            setExercise(exercise)
                        }}
                        sx={exercise.idnhomfile != null ? {} : {display: 'none'}}
                        >
                        Chấm bài
                        
                        </Button>
                    </TableCell>
                    {/* <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <ExerciseForm open={open} handleClose={handleClose} reload={props.reload} exercise={exercise}/>
        </>
        // props.exercises.map((exercise) => <ExerciseCard key={exercise.idnhomfile} exercise={exercise}/>)
    )
}