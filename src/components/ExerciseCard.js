import React, {useState, useEffect, useRef, useReducer, useContext} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {formatDistance, formatDistanceStrict} from 'date-fns'
import vi from 'date-fns/locale/vi'

export default function ExerciseCard({exercise, handleClickMark, process}) {
    // const [late, setLate] = useState(false)

    // useEffect(() => {
    //     if(exercise.lansuacuoi){
    //         if(new Date(exercise.lansuacuoi) > new Date(process.thoiGianNop)){
    //             setLate(true)
    //         }
    //     }
    // }, [])

    const formatDistanceLocale = {
        lessThanXSeconds: '{{count}} giây',
        xSeconds: '{{count}} giây',
        halfAMinute: '30 giây',
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

    return(
        
        <TableRow
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
                <span style={new Date(exercise.lansuacuoi) > new Date(process.thoiGianNop) ? {color: 'red'} : {}}>{exercise.lansuacuoi ? 
                formatDistanceStrict(new Date(exercise.lansuacuoi), new Date(process.thoiGianNop), {
                    addSuffix: true,
                    locale: {
                    ...vi,
                    formatDistance,
                },
                })
                : ''}</span>
            </TableCell>
            <TableCell>
                <Checkbox checked={exercise.diem != null}/>
            </TableCell>
            <TableCell>
                <Button
                variant="contained"
                component="label"
                // sx={{margin: "8px 8px 8px 0"}}
                onClick={handleClickMark}
                sx={exercise.idnhomfile != null ? {} : {display: 'none'}}
                >
                Chấm bài
                
                </Button>
            </TableCell>
            {/* <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
    )
}