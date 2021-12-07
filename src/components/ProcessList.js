import React, {useState, useEffect, useContext} from 'react';
import ProcessService from '../services/ProcessService';
import { StoreContext } from "../utils/store";
import ProcessCard from "./ProcessCard"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';
import {Roles} from '../common/constants'
import GroupStudentFileService from '../services/GroupStudentFileService';

export default function ProcessList(props){
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    const {user, role} = useAuth()

    // useEffect(() => {
    //     const search = {long1: props.classId}
    //     setLoading(true)
    //     ProcessService.getAll(search).then((res) => {
    //         setLoading(false)
    //         setProcesses(res.data)
    //     }).catch((err) => {
    //         setLoading(false)
    //     })
    // }, [])

    return (
        // <div className="row" id="courses">
        //     {props.processes.map((process, index) => <ProcessCard key={index} process={process}/>)}       
        // </div>
        <>
            <TableContainer component={Paper} sx={{ margin: "10px 0"}}>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Quá trình</TableCell>
                    <TableCell>Thời gian nộp bài</TableCell>
                    <TableCell sx={role == Roles.TEACHER ? {display: 'none'} : {}}>Trạng thái nộp bài</TableCell>
                    <TableCell sx={role == Roles.TEACHER ? {display: 'none'} : {}}>Điểm</TableCell>
                    <TableCell>Chức năng</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.processes.map((process, index) => 
                    // let checked = false
                    // GroupStudentFileService.getOneById(user.masinhvien, process.maquatrinh).then((res) => {
                    //     if(res.data){
                    //         checked = true
                    //     }
                    // })
                    // return (
                        
                    // )
                    <ProcessCard key={process.maquatrinh} process={process}/>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            {/* <ExerciseForm open={open} handleClose={handleClose} exercise={exercise}/> */}
        </>
    )
}