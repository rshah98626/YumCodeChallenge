import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class EmployeeSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchValue: '',
      employeesMatchSearch: [],
    }
  }

  handleTextFieldChange = (e) => {
    // reset employees if empty
    if(e.target.value === ''){
      this.setState({ searchValue: e.target.value, employeesMatchSearch: [] })
      return
    }

    // find employees which match target string
    const currentSearchValue = e.target.value
    const searchTerm = currentSearchValue.toLowerCase()
    var employeesMatchSearch = []

    for(let ind in this.props.employees){
      let emp = this.props.employees[ind]
      if(emp["name"].toLowerCase().startsWith(searchTerm)){
        employeesMatchSearch.push(emp)
      }
    }

    this.setState({
      searchValue: currentSearchValue,
      employeesMatchSearch: employeesMatchSearch
    })
  }

  render() {
    const { employeesMatchSearch } = this.state
    return (
      <div style={{paddingTop: '20px'}}>
        <div>
          <Grid container spacing={1} alignItems="flex-end" justify="center">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Find employees" value={this.state.searchValue} onChange={this.handleTextFieldChange.bind(this)}/>
            </Grid>
          </Grid>
        </div>
        <div style={{paddingTop: '5px'}}>
          {
            employeesMatchSearch.map((emp, key) => {
              return (
                <Card key={key} width="100%">
                  <CardContent>
                    <Typography justify="center">
                      {emp["name"] + ", " + emp["title"]}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default EmployeeSearch
