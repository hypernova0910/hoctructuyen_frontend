import React from 'react';

class CourseCard extends React.Component {
    render() {
        return (
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 py-2">
            <div className="card">
              <img src={"img/" + this.props.course.image} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{this.props.course.title}</h5>
                <p className="card-text">{`Thời gian: T${this.props.course.dayOfWeek}(${this.props.course.periodStart} - ${this.props.course.periodEnd})`}</p>
                <a target="_tab" href={this.props.course.link} className="btn btn-primary">Vào học</a>
                <a href={'course/' + this.props.course.id} className="btn .btn-secondary">Chi tiết</a>
              </div>
            </div>
          </div>
        )
    }
}

export default CourseCard;