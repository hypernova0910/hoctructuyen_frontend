import React, {useContext, useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom"
import './ProcessCard.css'
import {ProcessFormContext} from './CourseDetail';
import CountDown from './CountDown'
import useDialog from '../hooks/useDialog';
import useSnackbar from '../hooks/useSnackbar';
import ProcessService from '../services/ProcessService';
import useAuth from '../hooks/useAuth';
import {Roles} from "../common/constants"
import { display } from '@mui/system';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GroupStudentFileService from '../services/GroupStudentFileService';

export default function ProcessCard(props) {
    const {processContext, openContext, reloadContext, exerciseContext} = useContext(ProcessFormContext);
    const [process, setProcess ] = processContext
    const [open, setOpen] = openContext
    const [reload, setReload] = reloadContext
    const [exercise, setExercise] = exerciseContext
    const {showDialog} = useDialog()
    const {toast} = useSnackbar()
    const {user, role} = useAuth()
    const [nhomFileSV, setNhomFileSV] = useState(null)
    // const [daNopBai, setDaNopBai] = useState(false)
    // const [diem, setDiem] = useState()

    function onClickDetail(){
        setProcess(props.process)
        setOpen(true)
        if(role === Roles.STUDENT){
            setExercise(nhomFileSV)
        }
    }

    function onClickDelete(){
        let buttons = [
            {text: 'Hủy'},
            {text: 'Đồng ý',
            onClick: () => {
                //console.log(props.process.maquatrinh)
                ProcessService.deleteObj(props.process.maquatrinh).then((res) => {
                    toast('success', 'Xóa thành công')
                }).catch((err) => {
                    toast('error', 'Xóa thất bại')
                }).finally(() => {
                    setReload(true)
                })
            }}
        ]
        showDialog('Cảnh báo', 'Bạn có chắc muốn xóa quá trình này', buttons)
    }

    useEffect(() => {
        //console.log(role == Roles.STUDENT && props.process.thoiGianNop != null)
        if(role == Roles.STUDENT){
            GroupStudentFileService.getOneById(user.masinhvien, props.process.maquatrinh).then((res) => {
                // if(res.data){
                //     setDaNopBai(true)
                //     if(res.data.diem != null){
                //         setDiem(res.data.diem)
                //     }
                //     else{
                //         setDiem('Chưa chấm')
                //     }
                // }
                setNhomFileSV(res.data)
            })
        }
        
    }, [])

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {props.process.tenQuaTrinh}
            </TableCell>
            <TableCell>
                {props.process.thoiGianNop ? 
                <>
                    {new Date(props.process.thoiGianNop).toLocaleString("vi-VN")}
                    <br/>
                    <CountDown date={new Date(props.process.thoiGianNop)}/>
                </>
                : ''}
                
            </TableCell>
            <TableCell sx={role == Roles.TEACHER ? {display: 'none'} : {}}>
            {
                (role == Roles.STUDENT && props.process.thoiGianNop != null) ? <Checkbox checked={nhomFileSV}/> : <></>
            } 
            </TableCell>
            <TableCell sx={role == Roles.TEACHER ? {display: 'none'} : {}}>
                {nhomFileSV ? (nhomFileSV.diem ? nhomFileSV.diem : 'Chưa chấm') : ''}
            </TableCell>
            <TableCell>
                {/* <Button
                variant="contained"
                component="label"
                // sx={{margin: "8px 8px 8px 0"}}
                onClick={onClickDetail}
                // sx={exercise.idnhomfile != null ? {} : {display: 'none'}}
                >
                Chi tiết
                
                </Button> */}
                <Tooltip title="Chi tiết">
                    <IconButton sx={role == Roles.STUDENT ? {} : {display: 'none'}} onClick={onClickDetail}>
                        <InfoOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Chỉnh sửa">
                    <IconButton sx={role == Roles.TEACHER ? {} : {display: 'none'}} onClick={onClickDetail}>
                        <EditOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                    <IconButton sx={role == Roles.TEACHER ? {} : {display: 'none'}} onClick={onClickDelete}>
                        <DeleteOutlinedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Nộp bài">
                    <Link
                        // className={process ? (process.thoiGianNop ? '' : 'hidden') : "hidden"}
                        to={'/nop-bai/' + (props.process ? props.process.maquatrinh : '')}>
                    <IconButton sx={(props.process.thoiGianNop && role == Roles.STUDENT) ? {} : {display: 'none'}}>
                        <FileUploadOutlinedIcon/>
                    </IconButton>
                    </Link>
                </Tooltip>
                <Tooltip title="Chấm bài">
                    <Link
                        // className={process ? (process.thoiGianNop ? '' : 'hidden') : "hidden"}
                        to={'/cham-bai/' + (props.process ? props.process.maquatrinh : '')}>
                    <IconButton sx={(props.process.thoiGianNop && role == Roles.TEACHER) ? {} : {display: 'none'}}>
                        <GradingOutlinedIcon/>
                    </IconButton>
                    </Link>
                </Tooltip>
            </TableCell>
            {/* <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
        // <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 py-2">
        //     <div className="card">
        //         <h5 className={"card-header " +  (props.process.thoiGianNop ? 'required' : '')}>
        //             {props.process.thoiGianNop ? 'Yêu cầu nộp bài' : 'Không yêu cầu nộp bài'}
        //         </h5>
        //         <div className="card-body">
        //             <h5 className="card-title">{props.process.tenQuaTrinh}</h5>
        //             {/* <p className="card-text">
        //                 {props.process.yeuCauNopBai}
        //             </p> */}
        //             <a onClick={onClickDetail} className="btn btn-primary">Chi tiết</a>
        //             <a onClick={onClickDelete} className="btn btn-danger" style={role == Roles.TEACHER ? {} : {display: 'none'}}>Xóa</a>
        //         </div>
        //     </div>
        // </div>
        
    )
}