import React, {useState, useEffect, useRef, useReducer, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import FileList from './FileList'
import {FileType} from '../common/constants'
import StudentFileService from '../services/StudentFileService'
import GroupStudentFileService from '../services/GroupStudentFileService'
import useAuth from '../hooks/useAuth';
import useSnackbar from '../hooks/useSnackbar';

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

export default function ExerciseForm(props){
  const [state, dispatch] = useReducer(reducer, {files: [], filesAdd: [], filesDelete: []})
  const {user} = useAuth()
  const [diem, setDiem] = useState()
  const [nhanXet, setNhanXet] = useState('')
  const {toast} = useSnackbar()

  useEffect(() => {
    dispatch({type: 'clear'})
    // console.log(props.exercise.idnhomfile)
    if(props.exercise.idnhomfile){
        GroupStudentFileService.getOneByIdNFSV(props.exercise.idnhomfile).then((res) => {
          setDiem(res.data.diem)
          setNhanXet(res.data.nhanXet)
        })
        StudentFileService.getAllFiles({long1: props.exercise.idnhomfile}).then((res) => {
            for(let file of res.data){
                //console.log(file)
                dispatch({file: file, type: "add"})
            }
        })
    }
  }, [props.exercise])

  function handleSave() {
    const search = {
      long1: props.exercise.idnhomfile,
      double1: diem,
      string1: nhanXet
    }
    GroupStudentFileService.updateObj(search).then((res) => {
      toast('success', 'Chấm điểm thành công')
    })
    props.handleClose()
    props.reload()
  }

  return (
      <Dialog maxWidth="md" fullWidth open={props.open}>
      <DialogTitle>{"Chấm bài sinh viên " + props.exercise.tenSinhVien}</DialogTitle>
      <DialogContent>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { width: '100%' },
            // '& .MuiFormControlLabel-root': { m: 1, width: '30%' },
        }}
        noValidate
        autoComplete="off">
          <label>File đã nộp</label>
          <div className="row py-2">
              <div className="col-lg-12">
                <FileList type={FileType.STUDENT} files={state.files} fileMangager={[state, dispatch]}/>
              </div>
          </div>
          <div className="row py-2">
              <div className="col-lg-4">
                <TextField
                required
                // error={tenQuaTrinh.trim() == '' && !firstOpen}
                id="diem"
                name="diem"
                label="Điểm"
                autoComplete="off"
                type="number"
                // inputProps={{ inputProps: { min: 0, max: 10 } }}
                // helperText={tenQuaTrinh.trim() == '' && !firstOpen ? "Chưa nhập tên quá trình" : ''}
                value={diem != null ? diem : ''}
                onChange={(e) => {setDiem(e.target.value)}}
                // inputProps={role === Roles.TEACHER ? {} : {readOnly: true}}
                />
              </div>
          </div>
          <div className="row py-2">
              <div className="col-lg-12">
                  <TextField
                  id="nhanXet"
                  name="nhanXet"
                  label="Nhận xét"
                  multiline={true}
                  autoComplete="off"
                  value={nhanXet ? nhanXet : ''}
                  onChange={(e) => {
                      //setChanged(true)
                      setNhanXet(e.target.value)
                  }}
                  // inputProps={role === Roles.TEACHER ? {} : {readOnly: true}}
                  />
              </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Hủy</Button>
        <Button onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
    )
}