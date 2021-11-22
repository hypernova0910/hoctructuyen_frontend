import axios from "axios"
import Constants from "../common/constants"

const PROCESS_REST_API_URL = Constants.API_URL + 'quatrinhhoc/'

class ProcessService{
    getAll(search){
        return axios.post(PROCESS_REST_API_URL + '/getAll', search)
    }

    getOneById(id){
        return axios.get(PROCESS_REST_API_URL + 'getOneById/' + id)
    }

    addObj(data){
        return axios.post(PROCESS_REST_API_URL + '/addQuaTrinhHoc', data)
    }

    updateObj(data){
        return axios.post(PROCESS_REST_API_URL + '/updateQuaTrinhHoc', data)
    }

    deleteObj(id){
        return axios.post(PROCESS_REST_API_URL + '/deleteQuaTrinhHoc', id, {
            headers: {'Content-Type': 'application/json'}
        })
    }
}

export default new ProcessService()