import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import {Roles} from "../common/constants"
import {Link} from "react-router-dom";
import thumbnail from '../img/Picture1.jpg'

function CourseCard(props) {
    const {role} = useAuth()

    function formatLinkButton(){
      if(role == Roles.STUDENT){
        return 'Vào học'
      }
      else if(role == Roles.TEACHER){
        return 'Vào dạy'
      }
    }

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 py-2">
        <div className="card">
          <img src={thumbnail} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{props.course.tenLopHoc}</h5>
            <p className="card-text">{`Thời gian: T${props.course.ngayHoc}(${props.course.thoiGianBatDau} - ${props.course.thoiGianKetThuc})`}</p>
            <a target="_tab" href={props.course.link} className="btn btn-primary">{formatLinkButton()}</a>
            <Link to={'course/' + props.course.malophoc} className="btn .btn-secondary">Chi tiết</Link>
          </div>
        </div>
      </div>
    )
}

export default CourseCard;