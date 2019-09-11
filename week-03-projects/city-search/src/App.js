import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

function City (props) {
 return (
  <div >
    <table style={{ display: 'flex', flexWrap: 'wrap', padding: '10px 10px'}}>
  {props.cityData.map((item) =>
      <tc  style={{padding: '10px 10px'}} >{item}</tc>
    )}
    </table>
    </div>
  );
}

class CitySearchField extends Component {
  state = {
    cityData: [],
    cityInput: '',
  }
  handleChange = (event) => {
    this.setState({cityInput: event.target.value});
  }

  handleClick  = async () => {
    const cityInput = this.state.cityInput.toUpperCase();
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/city/${cityInput}`);
    const cityData = await response.json();
    this.setState({cityData})
    console.log(cityData);
  }
  render(){
  return (<div>
    <input type="text" onChange={this.handleChange}/>
    <button onClick={this.handleClick}>
      Click to get cities
    </button>
    <br></br>
    <City cityData={this.state.cityData}/>
  </div>);
}
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField />
      </div>
    );
  }
}

export default App;
