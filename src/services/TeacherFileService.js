import axios from "axios"
import Constants from "../common/constants"

const TEACHER_FILE_REST_API_URL = Constants.API_URL + 'filegiaovien/'

class TeacherFileService{
    uploadFile(data){
        return axios.post(TEACHER_FILE_REST_API_URL + 'uploadfiles', data)
    }

    getAllFiles(search){
        return axios.post(TEACHER_FILE_REST_API_URL + 'printallfiles', search)
    }

    downloadFile(search){
        const config = { responseType: 'arraybuffer' }
        return axios.post(TEACHER_FILE_REST_API_URL + 'downloadfile', search, config)
    }

    deleteFiles(search){
        return axios.post(TEACHER_FILE_REST_API_URL + 'deletefiles', search)
    }
}

export default new TeacherFileService()