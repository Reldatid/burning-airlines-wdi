import React, { Component } from 'react';
// import SearchResults from './components/SearchResults'

class Search extends Component {

  //Set an initial search query for the from-to
  constructor(){
    super();
    this.state = {
      from: 'Select From',
      to: 'Select To',
      badInput: false,
      badInputText: ""
    }
  }

  handleIncorrectInput(event, errorMessage){
    this.setState({badInput:true, badInputText: errorMessage });
  }

  handleSubmit(event){
    const fromVar = this.state.from
    const toVar = this.state.to

    event.preventDefault(); // prevent form submit from causing reload of page

    if(fromVar ==="Select From" || toVar==="Select To") {
      const errorMessage = "Please select a valid option for both fields"
      this.handleIncorrectInput(event, errorMessage)
    } else if (fromVar === toVar) {
      const errorMessage = "Destination and Origin cannot be the same"
      this.handleIncorrectInput(event, errorMessage)
    }

    else {
      this.setState({badInput: false});
      this.props.history.push(`/search/${ this.state.from }-to-${this.state.to}`);
    }
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
        {/*Error handling for bad input*/}
          {
            this.state.badInput
            ? <h2>Error: {this.state.badInputText} </h2>
            : <h3>Select to and from</h3>
          }
          <form onSubmit={ ev => this.handleSubmit(ev) }>
            <select defaultValue="Select From" onChange={ev => this.handleInput(ev)}>
              <option value="Select From">Select From</option>
              <option value="SFO">SFO</option>
              <option value="SYD">SYD</option>
              <option value="BNE">BNE</option>
            </select>
            <select defaultValue="Select To" onChange={ev => this.handleInput(ev)}>
              <option value="Select To">Select To</option>
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
