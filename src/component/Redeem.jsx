import React, { Component } from "react";
import Nav from "./Nav";
import "./redeem.css";
import axios from "axios";
import CodeForm from "./CodeForm";
import PinDisplay from "./PinDisplay";

class Redeem extends Component {
  state = {
    name: "",
    code: "",
    email: "",
    redeem_code: "default",
    pin_set: {},
    btnValue: "CLAIM YOUR FREE PIN NOW",
    btnDisabled: false,
    result: "",
    type: "",
    promo: "",
  };

  // security code submittion
  handleSubmit = (e) => {
    e.preventDefault();

    // disable button while waiting for result
    this.setState({
      btnValue: "LOADING",
      btnDisabled: true,
    });

    // post data
    const post = {
      name: this.state.name,
      code: this.state.code,
      email: this.state.email,
    };

    // send request to api
    // axios.post("http://localhost/mega/sph_b1t1/", { post }).then((res) => {
    axios.post("https://streamingph.com/Validate", { post }).then((res) => {
      if (res.data.redeem_code !== 0 || res.data.redeem_code !== "blocked") {
        this.setState({
          redeem_code: res.data.redeem_code,
          pin_set: res.data.pin_set,
        });
      }

      // reset button
      if (res.data.redeem_code !== 0 || res.data.redeem_code !== "blocked") {
        this.resetSubmit();
      }
    });
  };

  // main form display
  display() {
    // invalid security pin
    if (
      this.state.redeem_code === "blocked" ||
      this.state.redeem_code === 0 ||
      this.state.redeem_code === "default"
    ) {
      return (
        <CodeForm
          handleSubmit={this.handleSubmit}
          handlePin={this.handlePin}
          handleEmail={this.handleEmail}
          handleName={this.handleName}
          isZero={this.state.redeem_code}
          btnStatus={this.sendForm}
          btnValue={this.state.btnValue}
          btnDisabled={this.state.btnDisabled}
        />
      );

      // valid security pin
    } else if (this.state.result === "") {
      let arr = Object.entries(this.state.pin_set);

      return (
        <React.Fragment>
          {arr.map((pin) =>
            pin[1].pin !== 0 ? (
              <div align="center">
                <button
                  class="pin-img"
                  onClick={() => this.handleSelect(pin[1].pin, pin[0])}
                >
                  <center>
                    <img src={pin[1].img} />
                  </center>
                </button>
              </div>
            ) : null
          )}
        </React.Fragment>
      );

      // show selected free pin
    } else {
      return <PinDisplay value={this.state.result} promo={this.state.promo} />;
    }
  }

  // select free pin
  handleSelect = (pin, type) => {
    this.setState({
      result: pin,
      type: type,
    });

    const validate = {
      redeem_code: this.state.redeem_code,
      free_pin: pin,
      name: this.state.name,
      email: this.state.email,
      platform: type,
    };

    // axios.post("http://localhost/mega/sph_b1t1/validate/usePin", {
    //   validate,
    // });

    axios.post("https://streamingph.com/Validate/usePin", {
      validate,
    });

    this.message(type);
  };

  message = (freebie) => {
    var promo_msg = "";
    switch (freebie) {
      case "viu":
        promo_msg = "VIU 3 Day subscription";
        break;
      case "tap_go":
        promo_msg = "TapGo TV 3 day subscription";
        break;

      case "viva_one":
        promo_msg = "Viva One 30 day subscription";
        break;
    }

    this.setState({
      promo: promo_msg,
    });
  };

  // reset submit button
  resetSubmit() {
    this.setState({
      btnValue: "CLAIM YOUR FREE PIN NOW",
      btnDisabled: false,
    });
  }

  // name input
  handleName = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  // security pin input
  handlePin = (e) => {
    e.preventDefault();
    this.setState({ code: e.target.value });
  };

  // email input
  handleEmail = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };

  subheader() {
    if (
      this.state.redeem_code === "blocked" ||
      this.state.redeem_code === 0 ||
      this.state.redeem_code === "default"
    ) {
      return <h5>Please enter your details below</h5>;
    } else {
      if (this.state.result === "") {
        return <h5>Select one (1) free pin</h5>;
      }
    }
  }

  render() {
    const bgOpaque = false;
    return (
      <React.Fragment>
        <Nav bgOpaque={bgOpaque} />;
        <center>
          <div id="thanks">
            <h2>
              THANK YOU FOR JOINING STREAMINGPH <br /> BUY 1 TAKE 1 PROMO ON
              GRAB
            </h2>
            {this.subheader()}
            <br />
            <div id="main_container">{this.display()}</div>
            <h5>
              Per DTI Fair Trade Permit No: FTEB-170007 Series of 2023 <br />
              Promo runs from July 1 to December 31, 2023
            </h5>
          </div>
        </center>
      </React.Fragment>
    );
  }
}

export default Redeem;
