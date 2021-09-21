import React from 'react';
import Timer from './Timer';
import Dropdown from './Dropdown';

class Filter extends React.Component {
    render() {
        const sortBy = ['Ngày học', 'Tên']
        const filterBy = ['Đang học', 'Đã học']

        return(
            <div className="row">
                <label className="col-lg-2" style={{textAlign: 'right'}}>Thời gian</label>
                <div className="col-lg-2" id="timer">
                    <Timer/>
                </div>
                <label className="col-lg-2" style={{textAlign: 'right'}}>Sắp xếp theo</label>
                <div className="dropdown col-lg-2" id="sortBy">
                    <Dropdown items={sortBy}/>
                </div>
                <label className="col-lg-2" style={{textAlign: 'right'}}>Lọc các HP</label>
                <div className="dropdown col-lg-2" id="filterBy">
                    <Dropdown items={filterBy}/>
                </div>
            </div>
        )
    }
}

export default Filter