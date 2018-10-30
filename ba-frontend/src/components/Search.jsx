import React, { Component } from 'react';
// import SearchResults from './components/SearchResults'

class Search extends Component {

  //Set an initial search query for the from-to
  constructor(){
    super();
    this.state = {
      from: '',
      to: ''
    }
  }

  handleIncorrectInput(){
    console.log("Bad input");
  }

  handleSubmit(event){
    const fromVar = this.state.from
    const toVar = this.state.to
    event.preventDefault(); // prevent form submit from causing reload of page
    if(fromVar && toVar && (toVar !== fromVar)) {
      console.log("Yay!");
    } else {
      this.handleIncorrectInput()
    }
    this.props.history.push(`/search/${ this.state.from }-to-${this.state.to}`);
  }

  handleInput(event){
    // console.log(event.target);
    if (event.target[0].textContent === "Select From") {
      this.setState({ from: event.target.value });
    }else {
      this.setState({ to: event.target.value });
    }
    //Useful to log the properties and values
    // console.dir(event.target[0].textContent)
  }

  render(){
    return (
      <div>
        <h2>Flight Search</h2>
          <form onSubmit={ ev => this.handleSubmit(ev) }>
            <select defaultValue="" onChange={ev => this.handleInput(ev)}>
              <option value="" disabled>Select From</option>
              <option value="SFO">SFO</option>
              <option value="SYD">SYD</option>
              <option value="BNE">BNE</option>
            </select>
            <select defaultValue="" onChange={ev => this.handleInput(ev)}>
              <option value="" disabled>Select To</option>
              <option value="SFO">SFO</option>
              <option value="SYD">SYD</option>
              <option value="BNE">BNE</option>
            </select>
            <input type="submit" value="Search" />
          </form>
      </div>
    );
  }
}

export default Search;
