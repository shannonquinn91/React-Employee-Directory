import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//create a copy of the original list to show on ui
export default class App extends Component {
  state = {
    employees: [],
    copy: [],
    keys: ["ID", "First Name", "Last Name", "Email"]
  };
    
  //get data from random user api
  componentDidMount() {
      const data = fetch("https://randomuser.me/api/?results=50");

      data.then((response) => response.json())
      .then((response) => {
          this.setState({employees: response.results, copy: response.results});
          //console.log(response.results)
      })
  }

  sortLastName = () => {
    let employees = this.state.employees;
    employees.sort((a, b) => {
      let lastNameA = a.name.last;
      let lastNameB = b.name.last;
      if (lastNameA < lastNameB) {
        return -1;
      }
      if (lastNameA > lastNameB) {
        return 1;
      }
      return 0;
    })
    this.setState({employees})
  }

  sortByID = () => {
    let ids = this.state.employees;
    ids.sort((a, b) => {
      let idA = a.login.salt;
      let idB = b.login.salt;
      if (idA < idB) {
        return -1;
      } 
      if (idA > idB) {
        return 1;
      }
      return 0;
    })
    this.setState({employees: ids})
  }

filterFemales = () => {
  let employees = this.state.copy;
  let females = employees.filter((employee) => employee.gender === "female")
  //console.log(females)
  this.setState({copy: females})
}
filterMales = () => {
  let employees = this.state.copy;
  let males = employees.filter((employee) => employee.gender === "male")
  //console.log(males)
  this.setState({copy: males})
}

removeFilters = () => {
  let employees = this.state.employees;
  this.setState({copy: employees})
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="welcome">Welcome to the Employee Directory</h1>
          <h3 className="directions">Use the buttons below to sort or filter the employees.</h3>
          <div>
            <button type="button" className="btn btn-primary filter" onClick={this.sortLastName}>Sort by Last Name</button>
            <button type="button" className="btn btn-danger filter" onClick={this.sortByID}>Sort by ID</button>
            <button type="button" className="btn btn-success filter" onClick={this.filterFemales}>Show Females Only</button>
            <button type="button" className="btn btn-warning filter" onClick={this.filterMales}>Show Males Only</button>
            <button type="button" className="btn btn-dark filter" onClick={this.removeFilters}>Remove Filters</button>
          </div>  
        </header>
        <table className="table">
          <thead className="thead">
              <tr>
                {this.state.keys.map((key) => 
                  (
                    <th scope="col" key={key}>{key}</th>
                  )
                )}
              </tr>
          </thead>
          <tbody>
              {this.state.copy.map((employee) => (
                  <tr key={employee.login.salt}>
                      <th scope="row" key={employee.login.salt}>{employee.login.salt}</th>
                          <td key={employee.name.first}>{employee.name.first}</td>
                          <td key={employee.name.last}>{employee.name.last}</td>
                          <td key={employee.email}>{employee.email}</td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

