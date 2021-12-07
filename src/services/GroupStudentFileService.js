import axios from "axios"
import Constants from "../common/constants"

const GROUP_STUDENT_FILE_REST_API_URL = Constants.API_URL + 'NhomFileSinhVien/'

class GroupFileSinhVienService{
    getOneById(idsv, idqth){
        return axios.get(GROUP_STUDENT_FILE_REST_API_URL + 'getOneById/' + idsv + '/' + idqth)
    }

    getOneByIdNFSV(idnfsv){
        return axios.get(GROUP_STUDENT_FILE_REST_API_URL + 'getOneByIdNSFV/' + idnfsv)
    }

    addObj(data){
        return axios.post(GROUP_STUDENT_FILE_REST_API_URL + '/addNhomFileSinhVien', data)
    }

    updateObj(data){
        return axios.post(GROUP_STUDENT_FILE_REST_API_URL + '/updateNhomFileSinhVien', data)
    }

    deleteObj(id){
        return axios.post(GROUP_STUDENT_FILE_REST_API_URL + '/deleteQuaTrinhHoc', id, {
            headers: {'Content-Type': 'application/json'}
        })
    }
}

export default new GroupFileSinhVienService()