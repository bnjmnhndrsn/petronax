import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: null
    };
  }
  
  componentDidMount(){
    fetch('/api/wikipedia?date=1950-01-05')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({data: data[0]})
    });
  }
  
  render() {
    return (
      <div>{ JSON.stringify(this.state.data)  }</div>
    );
  }
}

export default App;
