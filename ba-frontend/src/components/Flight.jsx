import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
const GET_RESV_URL = "http://localhost:3000/flights/"
const POST_RESV_URL = "http://localhost:3000/reservations/"

class Flight extends Component{

  constructor(){
    super();
    this.state = {
      seatAvailability: [],
      user_id: ''
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
      this.setState({seatAvailability: response.data.bookings, user_id: response.data.user_id})
    })
    .catch( err => {
      console.warn(err);
    });
  }

  saveReservation(){
    const reservationParams = {
      user_id: 1,
      flight_id: this.props.match.params.id,
      row: 1,
      column: 2
    }
    axios.post(POST_RESV_URL, {params:reservationParams})
    .then(response => {
      if (response.data.created) {
        //grab the state, grab the row-col, update and save again
      }
    })
    .catch(console.warn)
  }

  render(){
    return (
      <div>
        <br/>
        <hr/><hr/>
        <h2>The search results for flight id:  {this.props.match.params.id}!</h2>
        <ul>
          {this.state.seatAvailability.map((row,rowIndex) =>
              <ul>
                <li>Row {rowIndex+1} availability:
                  <ul>
                  {
                    row.map((col,colIndex) =>
                    <li>{col===0
                        ? <button className="bookButton" >Book me!</button>
                        :
                        (col === this.state.user_id
                          ?<button className="takenMeButton">Taken by me!</button>
                          : <button className="takenOtherButton">Taken by someone else!</button>
                        )
                        }
                    </li>)}
                  </ul>
                </li>
              </ul>
            )}
        </ul>
      </div>
    );
  }
}

export default Flight;
