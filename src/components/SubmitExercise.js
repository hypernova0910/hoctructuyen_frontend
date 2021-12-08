import React, {useState, useEffect, useRef, useReducer, useContext} from 'react';
import {useParams, Link} from "react-router-dom";
import ProcessService from '../services/ProcessService';
import GroupStudentFileService from '../services/GroupStudentFileService';
import StudentFileService from '../services/StudentFileService';
import { StoreContext } from "../utils/store";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useAuth from '../hooks/useAuth';
import useSnackbar from '../hooks/useSnackbar';
import {FileType} from '../common/constants'
import FileList from './FileList'
import NotFound404 from './NotFound404';
import useDialog from '../hooks/useDialog';

function reducer(state, action) {
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
            state.files = state.files.filter(
                (file => file.idfilesv !== action.fileId || file.idfilesv === undefined)
            )
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

export default function SubmitExercise(props) {
    const params = useParams()

    // const [tenQuaTrinh, setTenQuaTrinh] = useState('')
    // const [moTa, setMoTa] = useState('')
    // const [thoiGianNop, setThoiGianNop] = useState(null)

    const [process, setProcess] = useState(null)

    const [nhomFileSinhVien, setNhomFileSinhVien] = useState()

    const {user, role} = useAuth()

    const fileCountRef = useRef(0)
    const fileInput = useRef()
    const [state, dispatch] = useReducer(reducer, {files: [], filesAdd: [], filesDelete: []})
    const {toast} = useSnackbar()
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    const [empty, setEmpty] = useState(false)
    const {showDialog} = useDialog()
    const MB = 1024 * 1024
    let id = 0
    
    useEffect(() => {
        //id = parseInt(qtid)
        //console.log(parseInt(qtid))
        // setId(parseInt(qtid))
        // console.log(id)
        dispatch({type: 'clear'})
        setLoading(true)
        try{
            // setId(parseInt(params.qtid))
            id = parseInt(params.qtid)
            console.log(id)
        }catch(e){
            console.error(e)
            return
        }
        ProcessService.getOneById(id).then((res) => {
            // setTenQuaTrinh(res.data.tenQuaTrinh)
            // setMoTa(res.data.moTa)
            // setThoiGianNop(res.data.thoiGianNop)
            setProcess(res.data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
        GroupStudentFileService.getOneById(user.masinhvien, id).then((res) => {
            console.log(res.data)
            setLoading(false)
            setNhomFileSinhVien(res.data)
            if(res.data){
                StudentFileService.getAllFiles({long1: res.data.idnhomfile}).then((res2) => {
                    for(let file of res2.data){
                        //console.log(file)
                        dispatch({file: file, type: "add"})
                    }
                })
            }
            
        }).catch((err) => {
            setLoading(false)
        })
        // console.log(user.masinhvien)
        // console.log(id)
        
    }, [])

    function handleChooseFile(e){
        if(fileInput.current.files){
            let sumSize = 0
            let invalidFileIndex = []
            for(let i = 0; i < fileInput.current.files.length; i++){
                if(fileInput.current.files[i].size/MB >= 5){
                    invalidFileIndex.push(i)
                    showDialog(
                        'Cảnh báo', 
                        'File ' + fileInput.current.files[i].name + ' có kích cỡ vượt quá 5MB nên không được chấp nhận', 
                        [{text: 'OK'}]
                    )
                    continue
                }
                sumSize += fileInput.current.files[i].size
            }
            if(sumSize/MB >= 20){
                showDialog(
                    'Cảnh báo', 
                    'Tổng kích thước các file đã chọn vượt 20MB nên không được chấp nhận', 
                    [{text: 'OK'}]
                )
                return
            }
            for(let i = 0; i < fileInput.current.files.length; i++){
                //console.log(fileInput.current.files[i])
                if(invalidFileIndex.includes(i)){
                    continue
                }
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

    function handleClickCancel(){
        props.history.goBack()
    }

    function handleClickSave(){
        if(nhomFileSinhVien){
            console.log(nhomFileSinhVien)
            // obj.maquatrinh = process.maquatrinh
            let success = true
            // ProcessService.updateObj(obj).then((res) => {
            if(state.files.length == 0){
                setEmpty(true)
                return
            }
            
            // }).catch((err) => {
            //     success = false
            // })
            // console.log(state.filesAdd.length)
            // console.log(state.filesDelete.length)
            if(state.filesAdd.length > 0){
                let formData = new FormData();
                formData.append('idsinhvien', new Blob([JSON.stringify(user.masinhvien)], {type:"application/json"}));
                formData.append('idquatrinhhoc', new Blob([JSON.stringify(process.maquatrinh)], {type:"application/json"}));
                for (let i = 0; i < state.filesAdd.length; i++) {
                    formData.append('files', state.filesAdd[i].file);
                }
                StudentFileService.uploadFile(formData).then((res) => {
                    //alert('success', 'Thêm mới thành công')
                }).catch((err) => {
                    //alert('error', 'Thêm mới thất bại')
                    success = false
                })
            }
            if(state.filesDelete.length > 0){
                const search = {listLong1: state.filesDelete}
                StudentFileService.deleteFiles(search).then((res) => {
                    //alert('success', 'Thêm mới thành công')
                }).catch((err) => {
                    //alert('error', 'Thêm mới thất bại')
                    success = false
                })
            }
            if(success) {
                toast('success', 'Nộp bài thành công')
                props.history.goBack()
            }
            else{
                toast('error', 'Nộp bài thất bại')
            }
        }
        else{
            let obj = {
                quaTrinhHoc: {maquatrinh: parseInt(params.qtid)},
                sinhVien: {masinhvien: user.masinhvien},
            }
            console.log(obj)
            GroupStudentFileService.addObj(obj).then((res) => {
                console.log(res)
                console.log(fileInput.current)
                if(state.filesAdd.length > 0){
                    let formData = new FormData();
                    formData.append('idsinhvien', new Blob([JSON.stringify(user.masinhvien)], {type:"application/json"}));
                    formData.append('idquatrinhhoc', new Blob([JSON.stringify(parseInt(params.qtid))], {type:"application/json"}));
                    for (let i = 0; i < state.filesAdd.length; i++) {
                        formData.append('files', state.filesAdd[i].file);
                    }
                    StudentFileService.uploadFile(formData).then((res) => {
                        toast('success', 'Nộp bài thành công')
                        props.history.goBack()
                    }).catch((err) => {
                        toast('error', 'Nộp bài thất bại')
                    })
                }
                // else{
                //     toast('success', 'Thêm mới thành công')
                // }
            })
        }
        setEmpty(false)
    }

    if(!process){
        if(!loading){
            return <NotFound404/>
        }
        else{
            return <></>
        }
        
    }
    return (
        <div>
            <h1>{process.tenQuaTrinh}</h1>
            <p>{process.moTa}</p>
            <p>{'Hạn nộp: ' + (new Date(process.thoiGianNop).toLocaleString())}</p>
            <div className="d-flex">
                <Button
                variant="contained"
                component="label"
                sx={{margin: "8px 8px 8px 0"}}
                >
                Thêm file
                <input
                    type="file"
                    onChange={(e) => {
                        handleChooseFile(e)
                    }}
                    ref={fileInput}
                    hidden
                    multiple
                />
                </Button>
            </div>
            <label>Tài liệu</label>
            <div style={{color: 'red'}}>{empty ? "Bạn chưa đính kèm file nào để nộp" : ""}</div>
            <div className="row py-2">
                <div className="col-lg-12">
                    <FileList type={FileType.STUDENT} files={state.files} fileMangager={[state, dispatch]}/>
                </div>
            </div>
            <div className="d-flex" style={{float: 'right'}}>
                {/* <div className="col-lg-9">
                </div>
                <div className="col-lg-3"> */}
                    <button
                    
                    className="btn" 
                    onClick={handleClickCancel} 
                    >
                        Hủy
                    </button>
                    <button
                    onClick={handleClickSave} 
                    className="btn btn-primary" 
                    >
                        Lưu
                    </button>
                {/* </div> */}
            </div>
        </div>
        
    )
}