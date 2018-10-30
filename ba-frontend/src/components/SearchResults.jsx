import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const DATA_URL = "https://api.myjson.com/bins/nbmvu"

class SearchResults extends Component {
  constructor(){
    super();
    this.state = {
      flights: []
    };
    this.performQuery = this.performQuery.bind( this );
  }

  componentDidMount(){
    // console.dir(this.props.match);
    const queryParams = this.props.match.params.query.split("-")
    const fromVar = queryParams[0]
    const toVar = queryParams[2]
    this.performQuery( fromVar, toVar );
  }

  performQuery( fromVar, toVar ){
    axios.get( DATA_URL)
    .then( response => {
      const allFlights = response.data.data
      const relevantFlights = allFlights.filter(function(flight){
        return (flight.origin === fromVar && flight.destination === toVar);
      });
      console.log(relevantFlights);
      this.setState({
        flights: relevantFlights
      });
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
