import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react';
import './App.css';

const style = {
  container: {
    border: "1px solid black", 
    padding: "20px", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    margin: "40px 50px"
  }, 
  outerContainer: {
    margin: "auto",
    alignItems: "center"
  }, 
  button: {
    color: "white", 
    backgroundColor: "blue"
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "", 
      description: ""
    }
  }
  render(){
    return (
      <div >
        <div style = {style.container} >
          <h1 style = {{margin: "0 auto", alignItems: "center"}} >Acronym Database</h1>
          <header style = {{marginBottom: "20px"}}><strong>Add A New Acronym</strong></header>
          <TextField label="Acronym Name" placeholder="Enter Acronym Here" />
          <TextField label="Description" multiline rows={3} />
          <br></br>
          <DefaultButton style = {style.button} text="Add to Database" />
        </div>
      </div>
    );
  }
}

export default App;
