import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0,0,\n1,3,\n5,2,\n'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{position : "absolute", left : "50px"}}>
        <label>
          Points:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} style={{height : "600px", width : "100px", fontSize : "30px",}} />
          <br></br>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function Preview() {
  return (
    <div>
      <img src={require('./gscan.gif')} alt={"Finished!"} style={{position: "absolute", right : "100px", top : "20px",
    height : "750px", width : "750px"}}/>
    </div>
  );
}
export default function MyApp() {
  return (
    <div>
      <h1 style={{position: "relative", left: "20px"}}>Graham Scan Visualizer</h1>
      <p style={{position: "relative", left: "20px"}}>Input some coordinates and watch the magic happen</p>
      <Preview />
      <EssayForm />
    </div>
  );
}