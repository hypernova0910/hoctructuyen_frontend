import React from 'react';
import CourseList from './CourseList';
import Filter from './Filter'

class Home extends React.Component {
    render() {
        return(
            <>
                <div className="container p-4">
                    <Filter />
                </div>
                <div className="container p-4">
                    <CourseList />
                </div>
            </>
        )
    }
}

export default Home