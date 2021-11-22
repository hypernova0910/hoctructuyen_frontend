import React, {useState, useContext} from 'react';
import FluidInput from './FluidInput';
import Button from './Button'
import Divider from './Divider';
import './LoginContainer.css'
import { StoreContext } from "../utils/store";
import LoginService from '../services/LoginService'
import useAuth from '../hooks/useAuth';
import {AuthContext} from '../utils/AuthProvider'

function LoginContainer(props) {

  const [nameValidator, setNameValidator] = useState({value: true, message: 'Tên đăng nhập'})
  const [passwordValidator, setPasswordValidator] = useState({value: true, message: 'Mật khẩu'})
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  // const { idContext } = useContext(StoreContext);
  // const [id, setId] = idContext
  // const { roleContext } = useContext(StoreContext);
  // const [role, setRole] = roleContext
  // const { usernameContext } = useContext(StoreContext);
  // const [username, setUsername] = usernameContext
  const {loginAsStudent, loginAsTeacher} = useAuth()
  const { loadingContext, loginErrorMsgContext } = useContext(StoreContext);
  const [loginErrorMsg, setLoginErrorMsg] = loginErrorMsgContext

  function onClickBtLogInAsStudent(){
    let valid = true
    if(!onChangeName()){
      valid = false
    }
    if(!onChangePassword()){
      valid = false
    }
    if(valid){
      const data = {
        string1: name,
        string2: password,
      }
      loginAsStudent(data)
    }
  }

  function onClickBtLogInAsTeacher(){
    let valid = true
    if(!onChangeName()){
      valid = false
    }
    if(!onChangePassword()){
      valid = false
    }
    if(valid){
      const data = {
        string1: name,
        string2: password,
      }
      // console.log(user)
      // if(name == '18150078' && password == 'mhieu09-10p'){
      //   // setId(1)
      //   // setRole('GV')
      //   // setName('Hữu Phúc Ngô')
      // }
      // else{
      //   setLoginError(true)
      // }
      loginAsTeacher(data)
    }
  }

  function onChangeName(){
    setName(document.getElementById('name').value)
    if(document.getElementById('name').value == ''){
      setNameValidator({value: false, message: 'Chưa nhập tên đăng nhập'})
      return false
    }
    else{
      setNameValidator({value: true, message: 'Tên đăng nhập'})
      return true
    }
  }

  function onChangePassword(){
    setPassword(document.getElementById('password').value)
    if(document.getElementById('password').value == ''){
      setPasswordValidator({value: false, message: 'Chưa nhập mật khẩu'})
      return false
    }
    else{
      setPasswordValidator({value: true, message: 'Mật khẩu'})
      return true
    }
  }

  // onChangeName()
  // onChangePassword()
  const style = {
    margin: "15px 0"
  };
  return (
    <div className="login-container center-screen">
      <div className="title">
        Đăng nhập
      </div>
      <div className="login-error">{loginErrorMsg}</div>
      <FluidInput type="text" onChange={onChangeName} label={nameValidator.message} valid={nameValidator.value} id="name" style={style} />
      <FluidInput type="password" onChange={onChangePassword} label={passwordValidator.message} valid={passwordValidator.value} id="password" style={style} />
      <Button buttonText="Đăng nhập sinh viên" buttonClass="login-button login-button__student" onClick={onClickBtLogInAsStudent} />
      <Divider>Hoặc</Divider>
      <Button buttonText="Đăng nhập giáo viên" buttonClass="login-button login-button__teacher" onClick={onClickBtLogInAsTeacher} />
    </div>
  );
}

export default LoginContainer