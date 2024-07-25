import React, { Component } from "react";

class PinDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <h4>You have selected one (1) free ({this.props.promo})</h4>
        <p>Here is your free pin:</p>
        <br />
        <input
          type="text"
          id="my_pin"
          value={this.props.value}
          readOnly
          disabled
        />
        <br />
        <br />
        <p>We also sent the free pin to your provided email address</p>
        <br />
      </React.Fragment>
    );
  }
}

export default PinDisplay;
