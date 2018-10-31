import React, { Component } from 'react';
import axios from 'axios';
const GET_RESV_URL = "http://localhost:3000/flights/"
const POST_RESV_URL = "http://localhost:3000/reservations/"

class Flight extends Component{

  constructor(){
    super();
    this.state = {
      seatAvailability: []
    };
    this.performQuery = this.performQuery.bind( this );
  }

  componentDidMount(){
    const searchUrl = GET_RESV_URL + this.props.match.params.id
    this.performQuery(searchUrl)
  }

  performQuery( url ){
    axios.get(url)
    .then( response => {
      console.log(response);
      this.setState({seatAvailability: response.data.bookings})
    })
    .catch( err => {
      console.warn(err);
    });
  }

  // saveReservation(){
  //   const reservationParams = {
  //     user_id: 1,
  //     flight_id: this.props.match.params.id,
  //     row: 1,
  //     column: 2
  //   }
  //   axios.post(POST_RESV_URL, {params:reservationParams})
  //   .then(response => {
  //     this.setState({seatAvailability: response.data})
  //     //Please send back the response when post is created
  //     // this.setState({secrets: [response.data.secret,...this.state.secrets]})
  //   })
  //   .catch(console.warn)
  // }

  render(){
    return (
      <div>
        <br/>
        <hr/><hr/>
        <h2>The search results for flight id:  {this.props.match.params.id}!</h2>
        <ul>
          {
            this.state.seatAvailability.map((s,index) =>
              <ul>
                <li>Row {index+1} availability: {
                    s.map(rowCol => <li>{rowCol ? "Yes" : "No"}</li>)
                  }</li>
              </ul>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Flight;
