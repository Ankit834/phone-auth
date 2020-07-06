import React, { Component } from "react";
import styled from "styled-components";
import { TitleContainer, Title, Info } from "../ui-common";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Home extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <HomeContainer>
        {user && (
          <div>
            Hello <Content>{user.name}</Content>. Your Last Login Time was{" "}
            <Content>{user.lastSignIn.toString()}</Content>
          </div>
        )}
        <HomePageContent>
          <TitleContainer style={{ color: "black" }}>
            <Title> Firebase Phone Auth </Title>
            <Info>
              Application to Login User via Firebase Phone Authentication
            </Info>
          </TitleContainer>
        </HomePageContent>
      </HomeContainer>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
};

export function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Home);

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomePageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.h5`
  display: contents;
`;
