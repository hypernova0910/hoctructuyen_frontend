import axios from "axios"
import Constants from "../common/constants"

const STUDENT_FILE_REST_API_URL = Constants.API_URL + 'filesinhvien/'

class StudentFileService{
    uploadFile(data){
        return axios.post(STUDENT_FILE_REST_API_URL + 'uploadfiles', data)
    }

    getAllFiles(search){
        return axios.post(STUDENT_FILE_REST_API_URL + 'printallfiles', search)
    }

    downloadFile(search){
        const config = { responseType: 'arraybuffer' }
        return axios.post(STUDENT_FILE_REST_API_URL + 'downloadfile', search, config)
    }

    deleteFiles(search){
        return axios.post(STUDENT_FILE_REST_API_URL + 'deletefiles', search)
    }
}

export default new StudentFileService()