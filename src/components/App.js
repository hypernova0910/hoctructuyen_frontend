import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import LoginContainer from './LoginContainer';
import Background from './Background';
import CourseDetail from './CourseDetail';
import NotFound404 from './NotFound404';
import SubmitExercise from './SubmitExercise';
import MarkExercise from './MarkExercise'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreContext } from "../utils/store";
import useAuth from '../hooks/useAuth';
import ReactLoading from 'react-loading';
import ProcessForm from './ProcessForm';
import LoginService from '../services/LoginService'
import useSnackbar from '../hooks/useSnackbar';
import Intro from './Intro'

function App(){
    const { loadingContext } = useContext(StoreContext);
    const [loading, setLoading] = loadingContext
    const {user, role, logout} = useAuth()
    const [open, setOpen] = useState(false)
    const [matKhauCu, setMatKhauCu] = useState('')
    const [matKhauMoi, setMatKhauMoi] = useState('')
    const [matKhauMoi2, setMatKhauMoi2] = useState('')
    const [wrongPass, setWrongPass] = useState(false)
    const [identical, setIdentical] = useState(false)
    const {toast} = useSnackbar()

    function changePassword(){
        setMatKhauCu('');
        setMatKhauMoi('')
        setMatKhauMoi2('')
        setWrongPass(false)
        setIdentical(false)
        setOpen(true)
    }

    function saveChangePassword(){
        if(matKhauCu != user.password){
            setWrongPass(true)
            return
        }
        else{
            setWrongPass(false)
        }
        if(matKhauMoi != matKhauMoi2){
            setIdentical(true)
            return
        }
        else{
            setIdentical(false)
        }
        let userData = user
        userData.password = matKhauMoi
        LoginService.changePassword(userData, role).then((res) => {
            toast('success', '?????i m???t kh???u th??nh c??ng')
        }).finally(() => {
            setOpen(false)
            logout()
        })
    }

    function handleClose(){
        setOpen(false)
    }

    if(!user){
        return(
            <Background img="Picture1.jpg">
                <ReactLoading type='spin' color='#aaa' className={'center-screen top-component ' + (loading ? '' : 'hidden')} />
                <LoginContainer/>
            </Background>
        )
    }
    else{
        return(
            <div className="app">
                <ReactLoading type='spin' color='#aaa' className={'center-screen top-component ' + (loading ? '' : 'hidden') }/>
                <Router>
                    <Header changePassword={changePassword}/>
                    <div className="container" id="main">
                        <ErrorBoundary>
                            <Switch>
                                <Route path='/gioi-thieu' component={Intro}/>
                                <Route path='/course/:id' component={CourseDetail}/>
                                    {/* <Switch>
                                        <Route path='/' component={CourseDetail}/>
                                    </Switch> */}
                                <Route path='/nop-bai/:qtid' component={SubmitExercise}/>
                                <Route path='/cham-bai/:qtid' component={MarkExercise}/>
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route path="*" component={NotFound404} />
                            </Switch>
                        </ErrorBoundary>
                        <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
                        <DialogTitle>?????i m???t kh???u</DialogTitle>
                        <DialogContent>
                            <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                                // '& .MuiFormControlLabel-root': { m: 1, width: '30%' },
                            }}
                            noValidate
                            autoComplete="off">
                            <div className="row py-2">
                                <div className="col-lg-12">
                                    <TextField
                                    required
                                    error={wrongPass}
                                    id="matKhauCu"
                                    name="matKhauCu"
                                    label="M???t kh???u c??"
                                    autoComplete="off"
                                    type="password"
                                    // inputProps={{ inputProps: { min: 0, max: 10 } }}
                                    helperText={wrongPass ? "Sai m???t kh???u" : ''}
                                    value={matKhauCu}
                                    onChange={(e) => {setMatKhauCu(e.target.value)}}
                                    // inputProps={role === Roles.TEACHER ? {} : {readOnly: true}}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-lg-12">
                                    <TextField
                                    required
                                    // error={tenQuaTrinh.trim() == '' && !firstOpen}
                                    id="matKhauMoi"
                                    name="matKhauMoi"
                                    label="M???t kh???u m???i"
                                    autoComplete="off"
                                    type="password"
                                    // inputProps={{ inputProps: { min: 0, max: 10 } }}
                                    // helperText={tenQuaTrinh.trim() == '' && !firstOpen ? "Ch??a nh???p t??n qu?? tr??nh" : ''}
                                    value={matKhauMoi}
                                    onChange={(e) => {setMatKhauMoi(e.target.value)}}
                                    // inputProps={role === Roles.TEACHER ? {} : {readOnly: true}}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-lg-12">
                                    <TextField
                                    required
                                    error={identical}
                                    id="matKhauMoi2"
                                    name="matKhauMoi2"
                                    label="Nh???p l???i m???t kh???u m???i"
                                    autoComplete="off"
                                    type="password"
                                    // inputProps={{ inputProps: { min: 0, max: 10 } }}
                                    helperText={identical ? "X??c nh???n m???t kh???u m???i ch??a ch??nh x??c" : ''}
                                    value={matKhauMoi2}
                                    onChange={(e) => {setMatKhauMoi2(e.target.value)}}
                                    // inputProps={role === Roles.TEACHER ? {} : {readOnly: true}}
                                    />
                                </div>
                            </div>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>H???y</Button>
                            <Button onClick={saveChangePassword}>L??u</Button>
                        </DialogActions>
                        </Dialog>
                    </div>
                    <Footer/>
                </Router>
            </div>
        )
    }
}

export default App;