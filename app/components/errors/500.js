import React, { Component } from 'react';
import { Link } from 'react-router';

class ServerError extends Component {
  render() {
    return (
      <div className="middle-box text-center animated fadeInDown">
        <h1>500</h1>
        <h3 className="font-bold">Internal Server Error</h3>

        <div className="error-desc">
          The server encountered something unexpected that didn't allow it to
          complete the request. We apologize.<br />
          You can go back to main page: <br />
          <Link to="/" className="btn btn-primary m-t">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default ServerError;
