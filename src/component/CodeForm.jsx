import React, { Component } from "react";

class CodeForm extends Component {
  incorrect() {
    if (this.props.isZero === "blocked") {
      return <p id="invalid">Too many invalid attempts</p>;
    } else if (this.props.isZero === 0) {
      return <p id="invalid">You have entered an invalid pin</p>;
    } else {
      return "";
    }
  }

  render() {
    return (
      <React.Fragment>
        <br />
        {this.incorrect()}

        <form onSubmit={this.props.handleSubmit}>
          <label>Full Name</label>
          <br />
          <input type="text" onKeyUp={this.props.handleName} required />
          <br />
          <br />
          <label>Email</label>
          <br />
          <input type="email" onKeyUp={this.props.handleEmail} required />
          <br />
          <br />
          <label>Mobile Number</label>
          <br />
          <input type="number" required />
          <br />
          <br />
          <label>Reward Code from Grab</label>
          <br />
          <input type="text" onKeyUp={this.props.handlePin} required />
          <br />
          <br />
          <center>
            <table>
              <tr>
                <td>
                  <input id="check" type="checkbox" required />
                </td>
                <td id="agree">
                  I agree to the&nbsp;
                  <a
                    role="button"
                    data-bs-toggle="modal"
                    data-bs-target="#mechs"
                  >
                    privacy policy and terms and conditions
                  </a>
                </td>
              </tr>
            </table>
          </center>
          <br />

          <input
            type="submit"
            value={this.props.btnValue}
            id="enter_pin"
            disabled={this.props.btnDisabled}
          />
        </form>
        <br />
      </React.Fragment>
    );
  }
}

export default CodeForm;
