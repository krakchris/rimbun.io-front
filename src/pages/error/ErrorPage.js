import React from 'react';
import errorImg from '../../images/error.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log('ERROR::',error);
    console.log('ERROR_INFO::', info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div align="center">
          <img src={errorImg} alt="Error" height="20%" width="30%" />
          <h3>Sorry, a critical error occurred on this page. Please Try Again Later!</h3>
          <h5><a href="/app" >Click here</a> to visit Home page.</h5>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
