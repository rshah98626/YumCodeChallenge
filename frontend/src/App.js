import React from 'react'
import './App.css'
import axios from 'axios'
import Dropdown from './Dropdown.js'
import EmployeeSearch from './EmployeeSearch'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      employees: [],
      citiesToEmployees: {}
    }
  }

  async componentDidMount() {
    const data = await axios.get('https://airro-yum.s3-us-west-2.amazonaws.com/recruiting/challenge_data/employees.json')
      .then(d => {
        return d["data"]["employees"]
      })

    // map employees to each city
    var citiesEmployeesMap = {}
    for(let index in data){
      let emp = data[index]
      for(let ind in emp["locations"]){
        let loc = emp["locations"][ind]
        if (loc in citiesEmployeesMap) {
          citiesEmployeesMap[loc].push({"name": emp["name"], "title": emp["title"]})
        } else {
          citiesEmployeesMap[loc] = [{"name": emp["name"], "title": emp["title"]}]
        }
      }
    }

    // reset state
    this.setState({ employees: data, citiesToEmployees: citiesEmployeesMap })
  }

  render() {
    return(
      <>
      {
        Object.keys(this.state.citiesToEmployees).map((item, key) =>
          <Dropdown key={key} city={item} emps={this.state.citiesToEmployees[item]} />
        )
      }
      <EmployeeSearch employees={this.state.employees}> </EmployeeSearch>
      </>
    )
  }
}

export default App;
