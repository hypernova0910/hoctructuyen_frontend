import React from 'react';
import LoginContainer from './LoginContainer';
import './Background.css'
import background from '../img/Picture1.jpg'

class Background extends React.Component {
    render() {
        return(
            <div className="bg" style={{backgroundImage: `url(${background})`}}>
                {this.props.children}
            </div>
        )
    }
}

export default Background