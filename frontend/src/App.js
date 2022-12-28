import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

class CoordinateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0 0 \n1 3 \n5 2\n'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.value.match(/^[0-9.\s]+$/)){
      this.state.value = this.state.value.trim()
      this.state.value = this.state.value.replace("/s{2,}/g",''); 
      const arr = this.state.value.split(' ');
      if(arr.length % 2 != 0){
        alert('You must enter an even number of values!');
      } 
      else{
        alert('An essay was submitted: ' + this.state.value);
      }
    }
    else{
        alert('Your values must consist purely of real numbers!');
      }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{position : "absolute", left : "24px"}}>
        <label>
          Points:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} style={{height : "550px", width : "100px", fontSize : "40px",}} />
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
    height : "750px", width : "850px"}}/>
    </div>
  );
}
export default function MyApp() {
  return (
    <div>
      <h1 style={{position: "relative", left: "20px"}}>Graham Scan Visualizer</h1>
      <p style={{position: "relative", left: "24px"}}>Input some coordinates and watch the magic happen.</p>
      <p style={{position: "relative", left: "24px"}}>Every two space seperated values will be considered a 2D point.</p>
      <Preview />
      <CoordinateInput />
    </div>
  );
}