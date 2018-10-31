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
        <div className="searchTitleDiv">
          <img src="/search_title_plane.png" />
          <h2 className="searchTitle">Welcome to the great flight search!</h2>
          <img src="/search_title_plane.png" />
        </div>
        {/*Error handling for bad input*/}
          {
            this.state.badInput
            ? <div className="searchSelectTitleDiv alert alert-danger">
                <h3><strong>Error:</strong> {this.state.badInputText} </h3>
              </div>
            : <div className="searchSelectTitleDiv">
                <h3>Please Select FROM and TO</h3>
              </div>
          }
          <div className="selectFormDiv">
            <form onSubmit={ ev => this.handleSubmit(ev) }>
            <div className="form-group">

              <select className="form-control form-control-lg" defaultValue="Select From" onChange={ev => this.handleInput(ev)}>
                <option value="Select From">Select From</option>
                <option value="SFO">SFO</option>
                <option value="SYD">SYD</option>
                <option value="BNE">BNE</option>
              </select>
              <select className="form-control form-control-lg" defaultValue="Select To" onChange={ev => this.handleInput(ev)}>
                <option value="Select To">Select To</option>
                <option value="SFO">SFO</option>
                <option value="SYD">SYD</option>
                <option value="BNE">BNE</option>
              </select>
              <input className="btn btn-light btn-lg fromToButton" type="submit" value="Search" />
            </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Search;
