import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Layout/Navbar";
import Default from "./components/Layout/Default";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Alert from "./components/Layout/Alert";
import PrivateRoute from "./routing/PrivateRoute";
import firebase from "./firebase";
import { LoadUser } from "./store/actions/auth";

export class App extends Component {
  componentDidMount() {
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        store.dispatch(LoadUser(user.phoneNumber));
      }
    });
    //console.log(user);
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <RouteContainer>
              <Alert />
              <Switch>
                <Route exact path="/" component={Default} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
                <PrivateRoute exact path="/home" component={Home} />
              </Switch>
            </RouteContainer>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

const RouteContainer = styled.section``;
