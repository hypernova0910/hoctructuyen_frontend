import React, {useState, useEffect, useContext} from 'react';
import CourseList from './CourseList';
import Dropdown from './Dropdown'
import CourseService from '../services/CourseService';
import useAuth from '../hooks/useAuth';
import {Roles} from "../common/constants"
import { StoreContext } from "../utils/store";
import Filter from './Filter'

function Home(props){
    const sortBy = ['Ngày học', 'Tên']
    const [order, setOrder] = useState(1)
    const [courses, setCourses] = useState([])
    const {user, role} = useAuth()
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    
    // componentDidMount() {
    useEffect(() => {
        let search = {}
        if(role == Roles.STUDENT){
            search = {
                long1: user.masinhvien,
                long2: order
            }
        }
        else if(role == Roles.TEACHER){
            search = {
                long1: user.magiaovien,
                long2: order
            }
        }
        setLoading(true)
        CourseService.getAll(search, role).then((res) => {
            setLoading(false)
            setCourses(res.data)
        }).catch((err) => {
            setLoading(false)
        })
    }, [order])

    function handleChange(index){
        setOrder(index + 1)
    }

    return(
        <>
            {/* <div className="container p-4">
                <Filter />
            </div> */}
            <div className="container p-4 d-flex">
                <label className="col-lg-8" style={{textAlign: 'right'}}></label>
                <label className="col-lg-2" style={{textAlign: 'right'}}>Sắp xếp theo</label>
                <div className="dropdown col-lg-2" id="sortBy">
                    <Dropdown items={sortBy} onChangeValue={handleChange}/>
                </div>
                {/* <label className="col-lg-2" style={{textAlign: 'right'}}>Lọc các HP</label>
                <div className="dropdown col-lg-2" id="filterBy">
                    <Dropdown items={filterBy}/>
                </div> */}
            </div>
            <div className="container p-4">
                <CourseList courses={courses} />
            </div>
        </>
    )
}

export default Home