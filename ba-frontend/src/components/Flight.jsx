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
    this.saveReservation = this.saveReservation.bind( this );
  }

  componentDidMount(){
    const searchUrl = GET_RESV_URL + this.props.match.params.id
    this.performQuery(searchUrl)
  }

  performQuery( url ){
    axios.get(url)
    .then( response => {
      this.setState({seatAvailability: response.data.bookings, user_id: response.data.user_id})
    })
    .catch( err => {
      console.warn(err);
    });
  }

  saveReservation(event){
    const row = parseFloat(event.target.attributes.therownumber.nodeValue)
    const column = parseFloat(event.target.attributes.thecolnumber.nodeValue)
    const reservationParams = {
      user_id: this.state.user_id,
      flight_id: parseFloat(this.props.match.params.id),
      row: row,
      column: column
    }
    axios.post(POST_RESV_URL, reservationParams)
    .then(response => {
      if (response.data.created) {
        const tempState = this.state
        tempState.seatAvailability[row][column] = this.state.user_id
        console.log("The temp state", tempState);
        console.log("row: ", row, "col: ", column);
        this.setState(tempState)
        //grab the state, grab the row-col, update and save again
      } else {
        console.log(response.data);
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
                        ? <button onClick={this.saveReservation} className="bookButton" therownumber={rowIndex} thecolnumber={colIndex} >Book me!</button>
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
