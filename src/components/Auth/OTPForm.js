import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, FormButton } from "../ui-common";

export class OTPForm extends Component {
  state = {
    otpValue: "",
  };

  onOTPChange = (event) => {
    this.setState({ otpValue: event.target.value });
  };

  render() {
    const { phoneNumber, sendConfirmationCode } = this.props;
    const { otpValue } = this.state;
    return (
      <OTPContainer>
        OTP Sent to Phone Number <PhoneNumber>{phoneNumber}</PhoneNumber>
        <form onSubmit={sendConfirmationCode}>
          <Input
            type="text"
            name="OTP"
            placeholder="Enter OTP"
            value={otpValue}
            onChange={(event) => this.onOTPChange(event)}
          />
          <FormButton type="submit">Login</FormButton>
        </form>
      </OTPContainer>
    );
  }
}

OTPForm.propTypes = {
  phoneNumber: PropTypes.string,
  sendConfirmationCode: PropTypes.func,
};

export default OTPForm;

const OTPContainer = styled.div`
  margin: 5%;
`;

const PhoneNumber = styled.h4`
  display: contents;
`;
