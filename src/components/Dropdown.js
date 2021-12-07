import React from 'react';
import './Dropdown.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedValue: props.items[0]}
    }

    // handleClick(e, index) {
        
    // }

    render() {
        return(
            <>
                <button className="btn btn-secondary dropdown-toggle width-fill" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selectedValue}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.props.items.map((item, index) =>{
                        return <a key={index} className="dropdown-item course-order" onClick={
                            (e) => {
                                e.preventDefault()
                                this.setState({'selectedValue': item})
                                this.props.onChangeValue(index)
                            }
                        } href="#">{item}</a>
                    })}
                </div>
            </>
        )
    }
}

export default Dropdown