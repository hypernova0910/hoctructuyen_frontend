import { useContext } from "react";
import { AuthContext } from "../utils/AuthProvider";
import LoginService from "../services/LoginService";
import { StoreContext } from "../utils/store";

export default function useAuth(){
    //console.log(useContext(AuthContext))
    const [ state, dispatch ] = useContext(AuthContext);
    const { loadingContext, loginErrorMsgContext } = useContext(StoreContext);
    const [loading, setLoading] = loadingContext
    const [loginErrorMsg, setLoginErrorMsg] = loginErrorMsgContext
    const loginAsStudent = (data) => {
        setLoading(true)
        setLoginErrorMsg('')
        LoginService.loginByStudent(data).then((res) => {
            setLoading(false)
            dispatch({type: 'login_student', data: res.data})
            if(!res.data){
                setLoginErrorMsg('Tên đăng nhập hoặc mật khẩu không đúng')
            }
        }).catch((err) => {
            setLoading(false)
            setLoginErrorMsg('Lỗi kết nối')
            //console.log(err)
        })
    }
    const loginAsTeacher = (data) => {
        // làm gì đó ở đây
        // let success = false;
        // LoginService.loginByTeacher(data).then((res) => {
        //     dispatch({type: 'login_teacher', data: res.data})
        //     console.log(res)
        //     if(res.data){
        //         success = true
        //     }
        //     return success
        // })
        setLoading(true)
        setLoginErrorMsg('')
        LoginService.loginByTeacher(data).then((res) => {
            setLoading(false)
            dispatch({type: 'login_teacher', data: res.data})
            if(!res.data){
                setLoginErrorMsg('Tên đăng nhập hoặc mật khẩu không đúng')
            }
        }).catch((err) => {
            setLoading(false)
            setLoginErrorMsg('Lỗi kết nối')
            //console.log(err)
        })
    }
    const logout = () => {
        // làm gì đó ở đây
        dispatch({ type: "logout", data: {} })
    }
    // ...  còn một số thức khác
    // const isAuthenticated = () => {
    //     return state.expiresAt && new Date().getTime() < state.expiresAt;
    // };
    // ...  còn một số thức khác
    return {
        // isAuthenticated,
        user: state.user,
        role: state.role,
        // userId: state.user ? state.user : null,
        loginAsStudent,
        loginAsTeacher,
        logout,
    }
}