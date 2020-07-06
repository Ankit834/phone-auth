import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const alertTypes = {
  danger: "#dc3545",
  success: "#28a745",
};

export class Alert extends Component {
  render() {
    const { alerts } = this.props;
    return (
      <Fragment>
        {alerts &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <AlertContainer
              key={alert.id}
              style={{ background: alertTypes[alert.alertType] }}
            >
              {alert.msg}
            </AlertContainer>
          ))}
      </Fragment>
    );
  }
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export function mapStateToProps(state) {
  return {
    alerts: state.alert,
  };
}

export default connect(mapStateToProps)(Alert);

export const AlertContainer = styled.div`
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  background: #f4f4f4;
  color: #333;
  margin: 3% 10% 0 10%;
  text-align: center;
  border-radius: 5px;
`;
