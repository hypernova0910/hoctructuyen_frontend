import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
import CourseService from '../services/CourseService';
import NotFound404 from './NotFound404';

function CourseDetail() {
    let params = useParams()
    let id = 0
    try{
        id = parseInt(params.id)
    }catch(e){
        console.error(e)
    }
    const course = CourseService.getOneById(id)
    if(course){
        return (
            <div>{course.title}</div>
        )
    }
    else{
        return <NotFound404/>
    }
}

export default CourseDetail;