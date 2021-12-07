import React, {useState, useEffect, useRef, useReducer, useContext} from 'react';
import {useParams, Link} from "react-router-dom";
import StudentService from '../services/StudentService';
import ProcessService from '../services/ProcessService';
import { StoreContext } from '../utils/store'
import Exercises from './Exercises';

export default function MarkExercise(props){
    let id = 0
    const params = useParams()
    const [exercises, setExercises] = useState([])
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    const [isReload, setReload] = useState(true)
    const [process, setProcess] = useState({})

    useEffect(() => {
        if(!isReload){
            return
        }
        setLoading(true)
        try{
            // setId(parseInt(params.qtid))
            id = parseInt(params.qtid)
            //console.log(id)
        }catch(e){
            console.error(e)
            setReload(false)
            return
        }
        const data = {
            long2: id
        }
        ProcessService.getOneById(id).then((res) => {
            setProcess(res.data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
        StudentService.getAllStatusSubmit(data).then((res) => {
            setExercises(res.data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        }).finally(() => {
            setReload(false)
        })
        
    }, [isReload])

    function reload(){
        setReload(true)
    }

    return (
        <>
            <h1>{"Số bài đã nộp: " + exercises.filter((exercise) => exercise.idnhomfile != null).length + "/" + exercises.length}</h1>
            <Exercises reload={reload} process={process} exercises={exercises}/>
        </>
    )
}