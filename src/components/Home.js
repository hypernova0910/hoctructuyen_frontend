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
    const years = ['Tất cả', 2022, 2021, 2020, 2019]
    const semesters = ['Tất cả', 1, 2]
    const [order, setOrder] = useState(1)
    const [year, setYear] = useState(0)
    const [semester, setSemester] = useState(0)
    const [courses, setCourses] = useState([])
    const {user, role} = useAuth()
    const { loadingContext } = useContext(StoreContext);
    const [ loading, setLoading ] = loadingContext
    
    // componentDidMount() {
    useEffect(() => {
        console.log(order)
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
        console.log(search)
        setLoading(true)
        CourseService.getAllInSemester(search, role, year, semester).then((res) => {
            setLoading(false)
            setCourses(res.data)
        }).catch((err) => {
            setLoading(false)
        })
    }, [order, year, semester])

    function handleChangeOrder(index){
        setOrder(index + 1)
    }

    function handleChangeYear(index){
        if(index == 0){
            setYear(0)
        }
        else{
            setYear(years[index])
        }
    }

    function handleChangeSemester(index){
        if(index == 0){
            setSemester(0)
        }
        else{
            setSemester(semesters[index])
        }
    }

    return(
        <>
            {/* <div className="container p-4">
                <Filter />
            </div> */}
            <div className="container p-4 d-flex">
                {/* <label className="col-lg-8" style={{textAlign: 'right'}}></label> */}
                <label className="col-lg-2" style={{textAlign: 'right'}}>Năm học</label>
                <div className="dropdown col-lg-2" id="year">
                    <Dropdown items={years} onChangeValue={handleChangeYear}/>
                </div>
                <label className="col-lg-2" style={{textAlign: 'right'}}>Kỳ</label>
                <div className="dropdown col-lg-2" id="semester">
                    <Dropdown items={semesters} onChangeValue={handleChangeSemester}/>
                </div>
                <label className="col-lg-2" style={{textAlign: 'right'}}>Sắp xếp theo</label>
                <div className="dropdown col-lg-2" id="sortBy">
                    <Dropdown items={sortBy} onChangeValue={handleChangeOrder}/>
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