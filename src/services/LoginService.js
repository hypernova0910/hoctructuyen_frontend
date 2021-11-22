import axios from "axios"
import Constants from "../common/constants"

const LOGIN_REST_API_URL = Constants.API_URL + 'login/'

class LoginService{
    loginByStudent(obj){
        return axios.post(LOGIN_REST_API_URL + 'sinhvien', obj)
    }

    loginByTeacher(obj){
        return axios.post(LOGIN_REST_API_URL + 'giaovien', obj)
    }
}

export default new LoginService()