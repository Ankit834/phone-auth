import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  FormButton,
  AuthContainer,
  AuthTitle,
  RedirectAuth,
  AuthAccount,
  LoadingContent,
} from "../ui-common";
import OTPForm from "./OTPForm";
import firebase from "../../firebase";
import { NavLink, Redirect } from "react-router-dom";
import store from "../../store";
import { setAlert } from "../../store/actions/alert";
import { CheckUserByPhone } from "../../store/actions/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export class Login extends Component {
  state = {
    phoneNumber: "",
    isEnabledForOTP: false,
    otpValue: "",
    confirmationResult: null,
    loading: false,
  };

  onPhoneChange = (phone) => {
    this.setState({ phoneNumber: "+" + phone });
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "re-captcha",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Catptcha Resolved");
          this.onSubmitPhoneNumber();
        },
      }
    );
  };

  onSubmitPhoneNumber = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { phoneNumber } = this.state;
    const isUserRegistered = CheckUserByPhone(phoneNumber);
    if (!isUserRegistered) {
      const errorMessage =
        "User with Phone Number Not Found. Please Sign Up or Re-Enter Phone Number";
      store.dispatch(setAlert(errorMessage, "danger", 5000));
      this.setState({ loading: false });
    } else {
      this.setUpRecaptcha();
      var appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.setState({
            confirmationResult: confirmationResult,
            isEnabledForOTP: true,
          });
        })
        .catch((error) => {
          const errorMessage =
            "Some problem with phone number. Error: " + error.message;
          store.dispatch(setAlert(errorMessage, "danger", 7000));
          this.setState({ loading: false });
        });
    }
  };

  onSubmitPhoneNumberCode = (event) => {
    event.preventDefault();
    console.log(event);
    var code = event.target["OTP"].value;
    const { confirmationResult } = this.state;
    confirmationResult
      .confirm(code)
      .then((result) => {
        store.dispatch(setAlert("Logged In Successfully", "success", 1000));
      })
      .catch((error) => {
        const errorMessage = "OTP is Invalid or Expired. Try Again";
        store.dispatch(setAlert(errorMessage, "danger", 7000));
      });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { phoneNumber, isEnabledForOTP, loading } = this.state;
    return (
      <Fragment>
        {isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <AuthContainer>
            <AuthTitle>Log In</AuthTitle>
            <AuthAccount>
              <FontAwesomeIcon icon={faUser} size="1x" />
              Sign Into Your Account
            </AuthAccount>
            {!isEnabledForOTP ? (
              <form onSubmit={this.onSubmitPhoneNumber}>
                <PhoneInput
                  country={"in"}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(phone) => this.onPhoneChange(phone)}
                  required
                />
                {loading ? (
                  <LoadingContent>
                    Verifying Phone!!! Please Wait . . .
                  </LoadingContent>
                ) : (
                  <FormButton type="submit">Get OTP</FormButton>
                )}
                <div id="re-captcha"></div>
              </form>
            ) : (
              <OTPForm
                phoneNumber={phoneNumber}
                sendConfirmationCode={this.onSubmitPhoneNumberCode}
              />
            )}
            <RedirectAuth>
              Don't have an account <NavLink to="/register">Sign Up</NavLink>
            </RedirectAuth>
          </AuthContainer>
        )}
      </Fragment>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
