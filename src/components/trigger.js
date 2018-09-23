import React, { Component } from 'react';

class Trigger extends React.Component {
  constructor(props){
    super(props);
    this.state = {isOpen: false, value: '', imageurl: '' };
    this.handleTrigger = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.intervalID = setInterval (
      () => this.tick(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleClick() {
     this.setState(state => ({
       isOpen: !state.isOpen
     }));
   }

   handleChange(event) {
  this.setState({value: event.target.value});
}


  tick() {
    if(this.state.value){
      this.setState({isOpen: true});
      this.setState({imageurl: 'https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/lock-open-key-512.png'});
    } else {
      this.setState({isOpen: false});
      this.setState({imageurl: 'https://cdn2.iconfinder.com/data/icons/pictograms-4/512/52-512.png'});
    }
  }



  render() {
    return (
      <div>
      <div className="padlock">
        <div className="keyhole"></div>
      </div>
      <form>
        <label>
          <input type="text" name="code" value={this.state.value} onChange=
          {this.handleChange} />
        </label>
      </form>
      <h2>{this.state.isOpen ? 'ON' : 'OFF'}  </h2>
</div>

  );
}
}

export default Trigger;
