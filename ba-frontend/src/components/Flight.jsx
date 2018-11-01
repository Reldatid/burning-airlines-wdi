import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
import Confirm from "./Confirm"
import "@reach/dialog/styles.css"
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
    setInterval(() => this.performQuery(searchUrl), 2000);
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
    console.log("BACK EVENT", event);
    const row = parseFloat(event.currentTarget.attributes.therownumber.nodeValue)
    const column = parseFloat(event.currentTarget.attributes.thecolnumber.nodeValue)
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

  // Getting the modal working
  saveReservationTEMP = () => {alert("Submitted")}

  render(){
    return (
      <div>
        <div className="reservationsTitleDiv">
        <hr/><hr/>
        <h2>Current reservations for flight id:  {this.props.match.params.id}</h2>
        <button className="btn btn-light btn-lg bookButtonEG noHover"> Bookable</button>
        <button className="btn btn-light btn-lg takenMeButtonEG noHover"> Taken (you)</button>
        <button className="btn btn-light btn-lg takenOtherButtonEG noHover"> Taken (other)</button>
        <hr/><hr/>
        </div>
          {this.state.seatAvailability.map((row,rowIndex) =>
            <div> {/*The whole map*/}
            <div className="row seatRow">
              <div className="rowTitle">Row {rowIndex +1}</div>
                  {/*Start first level ternary on rows*/}
                  {row.map((col,colIndex) =>
                  <div className="col">
                    {col===0
                    ?
                    /*Start of confirm dialogue calling*/
                    <Confirm title="Confirm" description="Are you sure?">
                      {confirm => (
                    <button data-toggle="modal" data-target="#exampleModalCenter"  onClick={confirm(this.saveReservation)} className="btn btn-light btn-lg bookButton" therownumber={rowIndex} thecolnumber={colIndex}> [{letterArray[colIndex]}]</button>
                      )}
                    </Confirm>
                    /*End of confirm dialogue calling*/

                    :
                    /*Start nested ternary on columns*/
                    /*If column is my user id, color to reflect it is already booked by me*/
                    (col === this.state.user_id
                      ?<button data-toggle="modal" data-target="#exampleModalCenter"  className="btn btn-light btn-lg takenMeButton noHover"> [{letterArray[colIndex]}]</button>
                      /*If column is not user id, color to reflect it is already booked by someone else*/
                      :<button data-toggle="modal" data-target="#exampleModalCenter"  className="btn btn-light btn-lg takenOtherButton noHover"> [{letterArray[colIndex]}] </button>)
                      /*End nested ternary on columns*/
                    } {/*End first level ternary on rows*/}
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
