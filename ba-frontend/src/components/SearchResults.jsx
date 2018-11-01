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
        <div className="searchResultsTitleDiv">
          <hr/><hr/>
        <h2>Current flights from ({this.props.match.params.query.split("-to-")[0]}) to ( {this.props.match.params.query.split("-to-")[1]})</h2>
          <hr/><hr/>
        </div>
        <div className="searchResultsCardDiv container">
          <div className="row">

          {this.state.flights.map( f =>
            <div className="col">
              <div class="card text-white bg-info mb-3 searchResultsCard">
                <div class="card-header">Flight ID: {f.id}</div>
                <div class="card-body">
                  <h5 class="card-title">Plane ID: {f.plane_id} </h5>
                  <p class="card-text">This plane departs on {f.date}</p>
                  <Link to={`/flight/${f.id}`}><button className="btn btn-light searchResultsButton">Reserve Seats </button> </Link>
                </div>
              </div>
            </div> /*end of bootstrap col*/

          )}
        </div> {/*end of bootstrap row*/}
      </div> {/*end of bootstrap container*/}

      </div>
    );
  }
}
export default SearchResults;
