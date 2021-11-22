import React, {useState, useEffect, useContext} from 'react';
import ProcessService from '../services/ProcessService';
import { StoreContext } from "../utils/store";
import ProcessCard from "./ProcessCard"

export default function ProcessList(props){
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    

    // useEffect(() => {
    //     const search = {long1: props.classId}
    //     setLoading(true)
    //     ProcessService.getAll(search).then((res) => {
    //         setLoading(false)
    //         setProcesses(res.data)
    //     }).catch((err) => {
    //         setLoading(false)
    //     })
    // }, [])

    return (
        <div className="row" id="courses">
            {props.processes.map((process, index) => <ProcessCard key={index} process={process}/>)}       
        </div>
    )
}