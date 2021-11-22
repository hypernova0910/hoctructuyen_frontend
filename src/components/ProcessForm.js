import React, {useContext, useState, useRef, useEffect, useReducer} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ProcessFormContext} from './CourseDetail';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import FileList from './FileList';
import ProcessService from '../services/ProcessService';
import useAuth from '../hooks/useAuth';
import useSnackbar from '../hooks/useSnackbar';
import TeacherFileService from '../services/TeacherFileService';

function reducer(state, action) {
    // if(action.type == 'assign'){
    //     //state.files.push(action.file)
    //     return {
    //         files: action.files,
    //         filesAdd: action.files,
    //         filesDelete: []
    //     }
    // }
    if(action.type == 'clear'){
        return {
            files: [],
            filesAdd: [],
            filesDelete: []
        }
    }
    else if(action.type == 'add'){
        state.files.push(action.file)
        if(action.file.id){
            state.filesAdd.push(action.file)
        }
        return {
            files: state.files,
            filesAdd: state.filesAdd,
            filesDelete: state.filesDelete
        }
    }
    else if(action.type == 'delete'){
        console.log('enter delete')
        //Trường hợp xóa file đã có trong csdl
        if(action.fileId){
            console.log('action.fileId')
            state.files = state.files.filter(file => file.idfilegv !== action.fileId || file.idfilegv === undefined)
            state.filesDelete.push(action.fileId)
        }
        //Trường hợp file chưa có trong csdl
        else if(action.fileIdNew){
            console.log('action.fileIdNew')
            state.files = state.files.filter(file => file.id !== action.fileIdNew || file.id === undefined)
            state.filesAdd = state.files.filter(file => file.id !== action.fileIdNew)
        }
        return {
            files: state.files,
            filesAdd: state.filesAdd,
            filesDelete: state.filesDelete
        }
    }
}

export default function ProcessForm(props){
    const {openContext, courseContext, firstOpenContext, reloadContext, processContext} = useContext(ProcessFormContext);
    const [open, setOpen] = openContext
    const [course, setCourse] = courseContext
    const [reload, setReload] = reloadContext
    const [process, setProcess ] = processContext
    //const [value, setValue] = useState(new Date());
    const [state, dispatch] = useReducer(reducer, {files: [], filesAdd: [], filesDelete: []})
    const fileCountRef = useRef(0)
    const fileInput = useRef()

    const [firstOpen, setFirstOpen] = firstOpenContext

    const [tenQuaTrinh, setTenQuaTrinh] = useState('')
    const [yeuCauNopBai, setYeuCauNopBai] = useState(false)
    const [thoiGianNop, setThoiGianNop] = useState(new Date())
    const [moTa, setMoTa] = useState('')
    const {user} = useAuth()
    const {toast} = useSnackbar()

    //const fileCardsRef = useRef([{}, {}])
    //console.log(fileCards)

    useEffect(() => {
        //console.log(process)
        dispatch({type: 'clear'})
        if(process != null){
            //console.log('render')
            setTenQuaTrinh(process.tenQuaTrinh)
            setYeuCauNopBai(process.thoiGianNop ? true : false)
            setThoiGianNop(process.thoiGianNop ? process.thoiGianNop : new Date())
            setMoTa(process.moTa)
            fileCountRef.current = 0
            const search = {
                long1: user.magiaovien,
                long2: process.maquatrinh
            }
            TeacherFileService.getAllFiles(search).then((res) =>{
                for(let file of res.data){
                    //console.log(file)
                    dispatch({file: file, type: "add"})
                }
            })
        }
    }, [process])

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit() {
        if(tenQuaTrinh.trim() == ''){
            setFirstOpen(false)
            return
        }
        let obj = {tenQuaTrinh, thoiGianNop: (yeuCauNopBai ? thoiGianNop: null), moTa, lopHoc: {malophoc: course.malophoc}}
        if(process){
            obj.maquatrinh = process.maquatrinh
            let success = true
            ProcessService.updateObj(obj).then((res) => {
                
            }).catch((err) => {
                success = false
            })
            // console.log(state.filesAdd.length)
            // console.log(state.filesDelete.length)
            if(state.filesAdd.length > 0){
                let formData = new FormData();
                formData.append('idgiaovien', new Blob([JSON.stringify(user.magiaovien)], {type:"application/json"}));
                formData.append('idquatrinhhoc', new Blob([JSON.stringify(process.maquatrinh)], {type:"application/json"}));
                for (let i = 0; i < state.filesAdd.length; i++) {
                    formData.append('files', state.filesAdd[i].file);
                }
                TeacherFileService.uploadFile(formData).then((res) => {
                    //alert('success', 'Thêm mới thành công')
                }).catch((err) => {
                    //alert('error', 'Thêm mới thất bại')
                    success = false
                })
            }
            if(state.filesDelete.length > 0){
                const search = {listLong1: state.filesDelete}
                TeacherFileService.deleteFiles(search).then((res) => {
                    //alert('success', 'Thêm mới thành công')
                }).catch((err) => {
                    //alert('error', 'Thêm mới thất bại')
                    success = false
                })
            }
            if(success) {
                toast('success', 'Cập nhật thành công')
            }
            else{
                toast('error', 'Cập nhật thất bại')
            }
        }
        else{
            ProcessService.addObj(obj).then((res) => {
                //console.log(res.data)
                //console.log(fileInput.current)
                if(state.filesAdd.length > 0){
                    let formData = new FormData();
                    formData.append('idgiaovien', new Blob([JSON.stringify(user.magiaovien)], {type:"application/json"}));
                    formData.append('idquatrinhhoc', new Blob([JSON.stringify(res.data)], {type:"application/json"}));
                    for (let i = 0; i < state.filesAdd.length; i++) {
                        formData.append('files', state.filesAdd[i].file);
                    }
                    TeacherFileService.uploadFile(formData).then((res) => {
                        toast('success', 'Thêm mới thành công')
                    }).catch((err) => {
                        toast('error', 'Thêm mới thất bại')
                    })
                }
                else{
                    toast('success', 'Thêm mới thành công')
                }
            })
        }
        
        setOpen(false);
        setReload(true)
    }

    function handleChooseFile(e){
        if(fileInput.current.files){
            // for(let i = 0; i < fileInput.current.files.length; i++){
            //     let fileObj = {
            //         id: fileCountRef.current++,
            //         file: fileInput.current.files[i],
            //         fileName: fileInput.current.files[i].name
            //     }
            //     dispatch({file: fileObj})
            // }
            for(let i = 0; i < fileInput.current.files.length; i++){
                let fileObj = {
                    id: ++fileCountRef.current,
                    file: fileInput.current.files[i],
                    tenFile: fileInput.current.files[i].name
                }
                console.log(fileObj)
                dispatch({file: fileObj, type: "add"})
            }
            fileInput.current.files = undefined
        }
        
    }

    return(
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Thêm mới quá trình học</DialogTitle>
            <DialogContent>
            <Box
            
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                    // '& .MuiFormControlLabel-root': { m: 1, width: '30%' },
                }}
                noValidate
                autoComplete="off"
                >
                <div className="row py-2">
                    <div className="col-lg-4">
                    <TextField
                    required
                    error={tenQuaTrinh.trim() == '' && !firstOpen}
                    id="tenQuaTrinh"
                    name="tenQuaTrinh"
                    label="Tên quá trình"
                    autoComplete="off"
                    helperText={tenQuaTrinh.trim() == '' && !firstOpen ? "Chưa nhập tên quá trình" : ''}
                    value={tenQuaTrinh}
                    onChange={(e) => {setTenQuaTrinh(e.target.value)}}
                    />
                    </div>
                    <div className="col-lg-4">
                        <FormControlLabel control={<Checkbox checked={yeuCauNopBai} id="yeuCauNopBai" onChange={(e) => {setYeuCauNopBai(e.target.checked)}} />} label="Yêu cầu nộp bài" />
                    </div>
                    <div className="col-lg-4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Thời gian nộp"
                        value={thoiGianNop}
                        onChange={(newValue) => {
                            setThoiGianNop(newValue);
                        }}
                        disabled={!yeuCauNopBai}
                        inputFormat="dd-MM-yyyy HH:mm"
                    />
                    </LocalizationProvider>
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-lg-12">
                        <TextField
                        id="moTa"
                        name="moTa"
                        label="Mô tả"
                        multiline={true}
                        autoComplete="off"
                        value={moTa ? moTa : ''}
                        onChange={(e) => {setMoTa(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-lg-4">
                    <Button
                    variant="contained"
                    component="label"
                    // sx={{margin: "8px"}}
                    >
                    Thêm file
                    <input
                        type="file"
                        onChange={handleChooseFile}
                        ref={fileInput}
                        hidden
                        multiple
                    />
                    </Button>
                    </div>
                    
                </div>
                <div className="row py-2">
                    <div className="col-lg-12">
                        <FileList files={state.files} fileMangager={[state, dispatch]}/>
                    </div>
                </div>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmit}>Lưu</Button>
            </DialogActions>
        </Dialog>
    )
}