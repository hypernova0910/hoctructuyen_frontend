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
    
    
    // }

    // render() {
        //console.log(this.state.courses)
        return (
            <div className="row" id="courses">
                 {props.courses.map((course, index) => <CourseCard key={index} course={course} />)}       
            </div>
        )
    // }
}

export default CourseList