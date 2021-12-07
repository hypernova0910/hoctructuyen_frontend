import axios from "axios"
import Constants from "../common/constants"

const STUDENT_REST_API_URL = Constants.API_URL + 'sinhvien/'

class StudentService{
    getAllStatusSubmit(data){
        return axios.post(STUDENT_REST_API_URL + 'getAllStatusSubmit/0/0', data)
    }
}

export default new StudentService()