import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

class CoordinateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0 0 \n1 3 \n5 2\n',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    var sub = this.state.value.replace(/\s+/g,' ').trim();
    if(sub.match(/^[0-9.\s]+$/)){
      var arr = sub.split(' ');
      if(arr.length % 2 == 0){
        event.preventDefault();
        this.setState({
        loading: true,
      })

      var api_post = new Object();
      api_post.vals = sub;
      this.setState({value: this.state.value});
      await fetch('http://localhost:8000/addsubmission', 
      {
        'method' : 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(api_post)
      });
      }
      else{
        alert("You must enter an even number of values!");
      }
    }
      else{
        alert("You must enter only numerical values!");
      }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{position : "absolute", left : "89px"}}>
        <label>
          Points:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} style={{height : "510px", width : "465px", fontSize : "40px",}} />
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
      <img src={require('./gscan.gif')} alt={"Finished!"} style={{position: "absolute", right : "10px", bottom : "15px",
    height : "800px", width : "800px"}}/>
    </div>
  );
}
export default function MyApp() {
  return (
    <div>
      <h1 style={{position: "relative", left: "85px"}}>Graham Scan Visualizer</h1>
      <p style={{position: "relative", left: "89px"}}>Input some coordinates and watch the magic happen.</p>
      <p style={{position: "relative", left: "89px"}}>Every two space seperated values will be considered a 2D point.</p>
      <CoordinateInput />
      <Preview />

    </div>
  );
}