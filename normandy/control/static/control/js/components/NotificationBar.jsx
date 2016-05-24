import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../actions/ControlActions.js'

class NotificationBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { notification, dispatch } = this.props;
    if (notification && notification.message) {
      let notificationClasses = `notification ${notification.messageType}`;
      return (
        <div id="notification-bar">
          <p className={notificationClasses}>{notification.message} <i className="fa fa-lg fa-times" onClick={(e) => {
            dispatch(setNotification(null));
          }}></i></p>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return { notification: state.controlApp.notification }
}

export default connect(
  mapStateToProps
)(NotificationBar);
