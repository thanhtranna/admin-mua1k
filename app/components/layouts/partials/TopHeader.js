import React, { Component } from 'react';
import { smoothlyMenu } from '../../../helpers/Helpers';
import { connect } from 'react-redux';
import { logout } from '../../../actions/commonActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  toggleNavigation(e) {
    e.preventDefault();
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top white-bg"
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary "
              onClick={this.toggleNavigation}
              href="#"
            >
              <i className="fa fa-bars" />{' '}
            </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a onClick={this.onLogout}>
                <i className="fa fa-sign-out" /> Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
