import gscan from './gifs/default.gif'
import './App.css';
import React  from 'react';
class CoordinateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '0 0\n2 0\n0 2',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  
  async handleSubmit(event) {
    event.preventDefault();
    var sub = this.state.value.replace(/\s+/g,' ').trim();
    if(sub.match(/^[0-9.\s]+$/)){
      var arr = sub.split(' ');
      if(arr.length % 2 == 0){
        var api_post = new Object();
        api_post.vals = sub;
        await fetch('/api/addsubmission', 
        {
          'method' : 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(api_post)
        })
        .then(response => response.blob())
        .then(blob => {
          const objURL = URL.createObjectURL(blob);
          gscan = objURL;
        });
        }
      else{
        alert("You must enter an even number of values!");
      }
    }
    else{
      alert("You must enter only numerical values!");
    }
    this.setState({value: this.state.value});
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} style={{position : "absolute", left : "89px"}}>
        <label>
          Points:
          <br></br>
          <textarea value={this.state.value} onChange={this.handleChange} style={{height : "510px", width : "465px", fontSize : "40px",}} 
                    maxlength={1000} />
          <br></br>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Preview/>
      </div>
    );
  }
}

class Preview extends React.Component {
  render() {
    return <div>
    <img src={gscan} alt={"Finished!"} style={{position: "relative", left : "600px", bottom : "178px",
  height : "800px", width : "800px"}}/>
  </div>
  };
}

export default function MyApp() {
  return (
    <div>
      <h1 style={{position: "relative", left: "85px"}}>Graham Scan Visualizer</h1>
      <p style={{position: "relative", left: "89px"}}>Input some coordinates and watch the magic happen.</p>
      <p style={{position: "relative", left: "89px"}}>Every two space seperated values will be considered a 2D point.</p>
      <CoordinateInput/>
    </div>
  );
}