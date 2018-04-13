import React, { Component } from 'react';
import { Link } from 'react-router';

class BadRequest extends Component {
  render() {
    return (
      <div className="middle-box text-center animated fadeInDown">
        <h1>400</h1>
        <h3 className="font-bold">Page Bad Request</h3>

        <div className="error-desc">
          Sorry, bad request. Try checking the URL for error, then hit the
          refresh button on your browser or try found something else in our app.
          <br />
          <Link to="/" className="btn btn-primary m-t">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
}

export default BadRequest;
