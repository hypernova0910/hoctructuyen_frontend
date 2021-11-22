import React, {useState, useEffect, useContext} from 'react';
import CourseCard from './CourseCard';
import CourseService from '../services/CourseService';
import useAuth from '../hooks/useAuth';
import {Roles} from "../common/constants"
import { StoreContext } from "../utils/store";

function CourseList(props) {
    // constructor(props) {
    //     super(props)
    //     this.state = {courses: []}
    // }
    const [courses, setCourses] = useState([])
    const {user, role} = useAuth()
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    let search = {
        long1: 0
    }
    if(role == Roles.STUDENT){
        search = {
            long1: user.masinhvien
        }
    }
    else if(role == Roles.TEACHER){
        search = {
            long1: user.magiaovien
        }
    }
    // componentDidMount() {
    useEffect(() => {
        setLoading(true)
        CourseService.getAll(search, role).then((res) => {
            setLoading(false)
            setCourses(res.data)
        }).catch((err) => {
            setLoading(false)
        })
    }, [])
    
    // }

    // render() {
        //console.log(this.state.courses)
        return (
            <div className="row" id="courses">
                 {courses.map((course, index) => <CourseCard key={index} course={course} />)}       
            </div>
        )
    // }
}

export default CourseList