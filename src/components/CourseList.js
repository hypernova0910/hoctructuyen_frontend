import React from 'react';
import CourseCard from './CourseCard';
import CourseService from '../services/CourseService';

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {courses: []}
    }

    componentDidMount() {
        this.setState({courses: CourseService.getAll()})
    }

    render() {
        return (
            <div className="row" id="courses">
                 {this.state.courses.map((course, index) => <CourseCard key={index} course={course} />)}       
            </div>
        )
    }
}

export default CourseList