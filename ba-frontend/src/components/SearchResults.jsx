import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FLIGHTS_URL = "http://localhost:3000/flights/search"

class SearchResults extends Component {

  constructor(){
    super();
    this.state = {
      flights: []
    };
    this.performQuery = this.performQuery.bind( this );
  }

  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      const queryParams = this.props.match.params.query.split("-")
      const fromVar = queryParams[0]
      const toVar = queryParams[2]
      const searchParams = {origin: fromVar, destination:toVar}
      this.performQuery( searchParams );
    }
  }

  componentDidMount(){
    const queryParams = this.props.match.params.query.split("-")
    const fromVar = queryParams[0]
    const toVar = queryParams[2]
    const searchParams = {origin: fromVar, destination:toVar}
    this.performQuery( searchParams );
  }

  performQuery( searchParams ){
    axios.get(FLIGHTS_URL, {params:searchParams})
    .then( response => {
      this.setState({flights: response.data})
    })
    .catch( err => {
      console.warn(err);
    });
  }

  render(){
    return (
      <div>
        <br/>
        <hr/><hr/>
        <h2>The search results for search {this.props.match.params.query}!</h2>
        <ul>
          {
            this.state.flights.map( f =>
              <ul key={f.id}>
                <li>Flight Id: {f.id}</li>
                <li>Plane Id: {f.id}</li>
                <li>Date: {f.date}</li>
                <li><Link to={`/flight/${f.id}`}>Reserve Seats</Link></li>
              </ul>
            )
          }
        </ul>
      </div>
    );
  }
}
export default SearchResults;
