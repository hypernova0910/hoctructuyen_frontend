import React from 'react';
import {formatDistanceToNow} from 'date-fns'
import vi from 'date-fns/locale/vi'

class CountDown extends React.Component {
    constructor(props) {
      super(props);
      this.state = {timeLeft: ""};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      if(!this.props.date){
        return
      }
      this.setState({
        timeLeft: formatDistanceToNow(this.props.date, {addSuffix: true, locale: vi})
      });
    }
  
    render() {
      return (
          <>{this.state.timeLeft}</>
      );
    }
}

export default CountDown;