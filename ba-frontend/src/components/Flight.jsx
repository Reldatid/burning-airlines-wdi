import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
const GET_RESV_URL = "http://localhost:3000/flights/"
const POST_RESV_URL = "http://localhost:3000/reservations/"
const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

class Flight extends Component{

  constructor(){
    super();
    this.state = {
      seatAvailability: [],
      user_id: ''
    };
    this.performQuery = this.performQuery.bind( this );
    this.saveReservation = this.saveReservation.bind( this );
    this.goBack = this.goBack.bind(this);
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

  goBack(){
      this.props.history.goBack();
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
        <div className="reservationsTitleDiv">
        <hr/><hr/>
        <h2>Current reservations for flight id:  {this.props.match.params.id}</h2>
        <hr/><hr/>
        </div>
          {this.state.seatAvailability.map((row,rowIndex) =>
            <div> {/*The whole map*/}
            <div className="row seatRow">
              <div className="rowTitle">Row {rowIndex +1}</div>
                  {row.map((col,colIndex) =>
                  <div className="col">
                    {col===0
                    ? <button onClick={this.saveReservation} className="btn btn-light btn-lg bookButton" therownumber={rowIndex} thecolnumber={colIndex}> [{letterArray[colIndex]}] Book me!</button>
                    :
                    (col === this.state.user_id
                      ?<button className="btn btn-light btn-lg takenMeButton"> [{letterArray[colIndex]}] Taken by me!</button>
                      : <button className="btn btn-light btn-lg takenOtherButton"> [{letterArray[colIndex]}] Taken (other) </button>
                    )
                    }
                  </div>)} {/*end col map*/}
              </div> {/*end div for row number*/}
            </div>  /*end the whole map*/
            )}

          <div className="flightBackButtonDiv">
              <button className="btn btn-light btn-lg goBackButton" onClick={this.goBack}>Go Back</button>
          </div>

      </div>
    ); /*end of return*/
  } /*end of render*/
}

export default Flight;
