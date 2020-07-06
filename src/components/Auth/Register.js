import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Redirect } from "react-router-dom";
import {
  Input,
  AuthContainer,
  AuthTitle,
  RedirectAuth,
  AuthAccount,
  LoadingContent,
  FormButton,
} from "../ui-common";
import OTPForm from "./OTPForm";
import firebase, { database } from "../../firebase";
import store from "../../store";
import { setAlert } from "../../store/actions/alert";
import { RegisterUser } from "../../store/actions/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export class Register extends Component {
  state = {
    name: "",
    phoneNumber: "",
    isEnabledForOTP: false,
    loading: false,
    confirmationResult: null,
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

  onPhoneChange = (phone) => {
    this.setState({ phoneNumber: "+" + phone });
  };

  onRegisterUser = (event) => {
    event.preventDefault();
    const { phoneNumber } = this.state;
    this.setState({ loading: true });

    database
      .collection("users")
      .where("phone", "==", phoneNumber)
      .get()
      .then((data) => {
        if (data.docs.length) {
          const errorMessage =
            "User with Phone Number already Exists. Either change Log In or Change Phone number";
          store.dispatch(setAlert(errorMessage, "danger", 5000));
          this.setState({ loading: false });
        } else {
          this.setUpRecaptcha();
          var appVerifier = window.recaptchaVerifier;
          firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              this.setState({
                confirmationResult: confirmationResult,
                phoneNumber: phoneNumber,
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
      });
  };

  onSubmitPhoneNumberCode = async (event) => {
    event.preventDefault();
    var code = event.target["OTP"].value;
    const { confirmationResult, name, phoneNumber } = this.state;
    confirmationResult
      .confirm(code)
      .then((result) => {
        var uid = result.user.uid;
        const userData = {
          name: name,
          phone: phoneNumber,
          uid: uid,
          lastSignIn: new Date(),
        };
        store.dispatch(RegisterUser(userData));
      })
      .catch((error) => {
        const errorMessage = "OTP is Invalid or Expired. Try Again";
        store.dispatch(setAlert(errorMessage, "danger", 7000));
        this.setState({
          phoneNumber: "",
          isEnabledForOTP: false,
          loading: false,
          confirmationResult: null,
        });
      });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { isEnabledForOTP, phoneNumber, name, loading } = this.state;
    return (
      <Fragment>
        {isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <AuthContainer>
            <AuthTitle>Sign Up</AuthTitle>
            <AuthAccount>
              <FontAwesomeIcon icon={faUser} size="1x" /> Create Your Account
            </AuthAccount>
            {!isEnabledForOTP ? (
              <form onSubmit={this.onRegisterUser}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                  required
                />
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
                  <FormButton type="submit">Register</FormButton>
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
              Already have an Account <NavLink to="/login">Sign In</NavLink>
            </RedirectAuth>
          </AuthContainer>
        )}
      </Fragment>
    );
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Register);
