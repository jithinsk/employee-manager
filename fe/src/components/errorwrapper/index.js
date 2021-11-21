import React, { Component } from "react";

class ErrorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="row pt-5 justify-content-center">
          <h1>Oops! Something went wrong</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorWrapper;
