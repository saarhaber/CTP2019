import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

function City (props) {
 return (
  <div style={{display: 'flex', justifyContent: 'center',   flexDirection: 'row'}}> {props.zipData.map((item) =>
  <Card style={{ width: '18rem' , margin: '5px 5px'}}>
      <Card.Header>{item.LocationText}</Card.Header>
      <ul>
        <li>State: {item.State}</li>
        <li>Location: ({item.Lat},{item.Long})</li>
        <li>Population (estimated): {item.EstimatedPopulation}</li>
        <li>Total Wages: {item.TotalWages} </li>
      </ul>
      </Card>
    )}
    </div>
  );
}

class ZipSearchField extends Component {
  state = {
    zipData: [],
    zipInput: '',
  }
  handleChange = (event) => {
    this.setState({zipInput: event.target.value});
  }

  handleClick  = async () => {
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipInput}`);
    const zipData = await response.json();
    this.setState({zipData})
    console.log(zipData);
  }
  render(){
  return (<div>
    <input type="text" onChange={this.handleChange}/>
    <button onClick={this.handleClick}>
      Click to get cities
    </button>
    <br></br>
    <City zipData={this.state.zipData}/>
  </div>);
}
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField />
      </div>
    );
  }
}

export default App;
