import React from "react"
import { Dialog } from "@reach/dialog"

class ConfirmStatusChange extends React.Component {
  state = {
    open: false,
    callback: null
  }

  show = callback => event => {
    event.preventDefault()
    console.log("EVENT", event);
    console.log("ROW", event.target.attributes.therownumber.nodeValue);
    console.log("COL", event.target.attributes.thecolnumber.nodeValue);
    event = {
      ...event,
      target: { ...event.target, value: event.target.value }
    }

    this.setState({
      open: true,
      callback: () => callback(event)
    })
  }

  hide = () => this.setState({ open: false, callback: null })

  confirm = () => {
    this.state.callback()
    this.hide()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.show)}

        {this.state.open && (
          <Dialog>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>

            <button onClick={this.hide}>Cancel</button>
            <button onClick={this.confirm}>OK</button>
          </Dialog>
        )}
      </React.Fragment>
    )
  }
}

export default ConfirmStatusChange
