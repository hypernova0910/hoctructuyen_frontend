import axios from "axios"
import Constants, {Roles} from "../common/constants"

const CLASS_INFO_REST_API_URL = Constants.API_URL + 'lophoc/'

class CourseService{
    getAll(search, role){
        //console.log(search)
        if(role == Roles.STUDENT){
            return axios.post(CLASS_INFO_REST_API_URL + 'sinhvien/getAll/0/10', search)
        }
        else if(role == Roles.TEACHER){
            return axios.post(CLASS_INFO_REST_API_URL + 'giaovien/getAll/0/10', search)
        }
    }

    getOneById(id){
        return axios.get(CLASS_INFO_REST_API_URL + 'getOneById/' + id)
    }
}

export default new CourseService()