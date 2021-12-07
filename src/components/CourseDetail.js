import React, {useState, useEffect, useContext} from 'react';
import { StoreContext } from "../utils/store";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import CourseService from '../services/CourseService';
import NotFound404 from './NotFound404';
import ProcessList from './ProcessList'
import Button from './Button'
import ProcessForm from './ProcessForm'
import ProcessService from '../services/ProcessService';
import {Roles} from "../common/constants"
// import {ProcessFormContext} from '../contexts/ProcessFormContext';

export const ProcessFormContext = React.createContext(null);

function CourseDetail(props) {
    const params = useParams()
    //const [idLopHoc, setIdLopHoc] = useState(0)
    let id = 0
    const [course, setCourse] = useState(null);
    const [processes, setProcesses ] = useState([])
    const [process, setProcess ] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [firstOpen, setFirstOpen] = useState(false);
    const [reload, setReload] = useState(true)
    const [exercise, setExercise] = useState()
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    const context = {
        openContext: [open, setOpen],
        courseContext: [course, setCourse],
        firstOpenContext: [firstOpen, setFirstOpen],
        reloadContext: [reload, setReload],
        processContext: [process, setProcess],
        exerciseContext: [exercise, setExercise]
    }

    const {role} = useAuth()
    //const {openContext} = useContext(ProcessFormContext);
    //const [open, setOpen] = openContext
    const location = useLocation()
    

    useEffect(() => {
        if(!reload){
            return
        }
        //console.log(location)
        try{
            id = parseInt(params.id)
        }catch(e){
            console.error(e)
            return
        }
        setLoading(true)
        CourseService.getOneById(id).then((res) => {
            //console.log(res.data)
            //setLoading(false)
            setCourse(res.data)
            const search = {long1: id}
            //setLoading(true)
            ProcessService.getAll(search).then((res) => {
                setLoading(false)
                setProcesses(res.data)
            }).catch((err) => {
                setLoading(false)
                console.error(err)
            })
        })
        .catch((err) => {
            setLoading(false)
            console.error(err)
        })
        if(!loading){
            setReload(false)
        }
        //$("#processForm").dialog("close")
        //setCourse({title: "LOL", teacher: {name: "Hiếu"}})
    }, [reload]);

    const handleClickOpen = () => {
        setProcess(null)
        setOpen(true);
        setFirstOpen(true);
        setExercise(null)
    };

    const style = {
        float: 'right'
    }
    if(role !== Roles.TEACHER){
        style.display = 'none'
    }
    
    if(course){
        return (
            <ProcessFormContext.Provider value={context}>
                <div className="row">
                    <div className="col-lg-9">
                        <h1>{course.tenLopHoc}</h1>
                        <h3>{'Giáo viên: ' + course.giaoVien.tenGiaoVien}</h3>
                    </div>
                    <div className="col-lg-3">
                        <button
                        onClick={handleClickOpen} 
                        className="btn btn-primary" 
                        style={style}>
                            Thêm quá trình
                        </button>
                    </div>
                </div>
                <ProcessList processes={processes}/>
                <ProcessForm/>
            </ProcessFormContext.Provider>
        )
    }
    else if(!loading){
        return <NotFound404/>
    }
    else{
        return (<></>)
    }
    
}

export default CourseDetail;