import React from 'react';
import './FluidInput.css';

class FluidInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        value: ""
      };
    }
    focusField() {
      const { focused } = this.state;
      this.setState({
        focused: !focused
      });
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      this.setState({
        value: value
      });
      if(this.props.onChange){
        this.props.onChange()
      }
    }
    render() {
      const { type, label, style, id, valid } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value != "") {
        inputClass += " fluid-input--open";
      }
      
      return (
        <div className={inputClass + (valid ? '' : ' fluid-input--invalid')} style={style}>
          <div className="fluid-input-holder">
            
            <input 
              className="fluid-input-input"
              type={type}
              id={id}
              onFocus={this.focusField.bind(this)}
              onBlur={this.focusField.bind(this)}
              onChange={this.handleChange.bind(this)}
              autoComplete="off"
            />
            <label className={"fluid-input-label" + (valid ? '' : ' fluid-input-label--invalid') } htmlFor={id}>{label}</label>
            {/* <label className="validator">Chưa nhập</label> */}
          </div>
        </div>
      );
    }
}

export default FluidInput;