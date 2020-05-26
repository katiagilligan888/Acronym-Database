import React from 'react';
import axios from "axios";
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

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
    backgroundColor: "blue",
    marginBottom: "50px"
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

  handleChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };  

  onSubmitHandler = event => {
    const newAcronym = {
      name: this.state.name,
      description: this.state.description, 
    };

    axios
      .post("http://localhost:6500/api/acronymNames", newAcronym)
      .then(response => {
        axios.get("http://localhost:6500/api/acronymNames").then(response => {
      this.setState({
        acronymData: response.data
      })
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    })
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    axios.get("http://localhost:6500/api/acronymNames").then(response => {
      this.setState({
        acronymData: response.data
      })
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    })
  }


  render(){
    return (
      <div >
        <div style = {style.container} >
          <h1 style = {{margin: "0 auto", alignItems: "center"}} >Acronym Database</h1>
          <header style = {{marginBottom: "20px"}}><strong>Add A New Acronym</strong></header>
          <TextField  onChange={this.handleChangeHandler} name="name" label="Acronym Name" placeholder="Enter Acronym Here" />
          <TextField  onChange={this.handleChangeHandler} name= "description" label="Description" multiline rows={3} />
          <br></br>
          <DefaultButton  onClick={this.onSubmitHandler} style = {style.button} text="Add to Database" />
          <BootstrapTable data={this.state.acronymData} striped hover>
            <TableHeaderColumn isKey dataField='id'> ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Acronym Name</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Acronym Description</TableHeaderColumn>
          </BootstrapTable>

        </div>
        
      </div>
    );
  }
}

export default App;
