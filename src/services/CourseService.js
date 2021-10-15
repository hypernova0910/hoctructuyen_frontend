import axios from "axios"
import Constants from "../common/constants"

const CLASS_INFO_REST_API_URL = Constants.API_URL + 'classInfo/'

class CourseService{
    getAll(){
        return axios.get(CLASS_INFO_REST_API_URL + 'getAll')
    }

    getOneById(id){
        return axios.get(CLASS_INFO_REST_API_URL + 'getOneById/' + id)
    }
}

export default new CourseService()