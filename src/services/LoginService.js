import axios from "axios"
import Constants, {Roles} from "../common/constants"

const LOGIN_REST_API_URL = Constants.API_URL + 'login/'
const STUDENT_REST_API_URL = Constants.API_URL + 'sinhvien/'
const TEACHER_REST_API_URL = Constants.API_URL + 'giaovien/'

class LoginService{
    loginByStudent(obj){
        return axios.post(LOGIN_REST_API_URL + 'sinhvien', obj)
    }

    loginByTeacher(obj){
        return axios.post(LOGIN_REST_API_URL + 'giaovien', obj)
    }

    changePassword(data, role){
        if(role == Roles.STUDENT){
            return axios.post(STUDENT_REST_API_URL + 'updateSinhVien', data)
        }
        else if(role == Roles.TEACHER){
            return axios.post(TEACHER_REST_API_URL + 'updateGiaoVien', data)
        }
    }
}

export default new LoginService()