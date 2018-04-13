import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div className="middle-box text-center animated fadeInDown">
        <h1>404</h1>
        <h3 className="font-bold">Page Not Found</h3>

        <div className="error-desc">
          Sorry, but the page you are looking for has note been found. Try
          checking the URL for error, then hit the refresh button on your
          browser or try found something else in our app.
          <br />
          <Link to="/" className="btn btn-primary m-t">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
