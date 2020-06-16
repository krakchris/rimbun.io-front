import React from 'react';
import PropTypes from 'prop-types';
import errorImg from '../../images/error.png';


class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div align="center">
        <img src={errorImg} alt="Error" height="20%" width="30%"/>
        <h3>Sorry, a critical error occurred on this page. Please Try Again Later!</h3>
        <h5><a href="/app" >Click here</a> to visit Home page.</h5>
      </div>
    );
  }
}

export default ErrorPage;
