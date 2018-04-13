import React, { Component } from 'react';
import { Link } from 'react-router';
import { activeRoute } from '../../../helpers/Helpers';
import { connect } from 'react-redux';
import { logout } from '../../../actions/commonActions';

const mapStateToProps = state => ({
  email: state.common.email
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const { menu } = this.refs;
    $(menu).metisMenu();
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <ul className="nav metismenu" id="side-menu" ref="menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              {' '}
              <span />
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear">
                  {' '}
                  <span className="block m-t-xs">
                    {' '}
                    <strong className="font-bold">{this.props.email}</strong>
                  </span>{' '}
                  <span className="text-muted text-xs block">
                    Admin
                    <b className="caret" />
                  </span>{' '}
                </span>{' '}
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a onClick={this.onLogout}> Logout</a>
                </li>
              </ul>
            </div>
            <div className="logo-element">BAP</div>
          </li>
          <li className={activeRoute(['/home'], this.props.location.pathname)}>
            <Link to="/home">
              <i className="fa fa-th-large" />{' '}
              <span className="nav-label">Dashboard</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              [
                '/users',
                '/user',
                '/log-user-coin-charge',
                '/log-discount-ticket',
                '/log-product-favorite',
                '/log-friend'
              ],
              this.props.location.pathname
            )}
          >
            <Link to="/users">
              <i className="fa fa-users" />{' '}
              <span className="nav-label">List Users</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              ['/auctions', '/auctions/create', '/auction'],
              this.props.location.pathname
            )}
          >
            <Link to="/auctions">
              <i className="fa fa-ticket" />{' '}
              <span className="nav-label">List Auctions</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              [
                '/campaigns',
                '/campaigns/create',
                '/campaign',
                '/campaigns/edit'
              ],
              this.props.location.pathname
            )}
          >
            <Link to="/campaigns">
              <i className="fa fa-picture-o" />{' '}
              <span className="nav-label">List Campaign</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              ['/products', '/products/create', '/products/edit', '/product'],
              this.props.location.pathname
            )}
          >
            <Link to="/products">
              <i className="fa fa-product-hunt" />{' '}
              <span className="nav-label">List Products</span>
            </Link>
          </li>

          {/*<li className={activeRoute(["/conditions", "/condition/create", "/conditions/edit"], this.props.location.pathname)}>*/}
          {/*<Link to="/conditions"><i className="fa fa-list-alt"></i> <span className="nav-label">*/}
          {/*調子ー一覧</span>*/}
          {/*</Link>*/}
          {/*</li>*/}

          <li
            className={activeRoute(['/reviews'], this.props.location.pathname)}
          >
            <Link to="/reviews">
              <i className="fa fa-comments-o" />{' '}
              <span className="nav-label">List Reviews</span>
            </Link>
          </li>
          {/*<li className={activeRoute(["/messages", "/messages/create", "/messages/edit"], this.props.location.pathname)}>*/}
          {/*<Link to="/messages"><i className="fa fa-comments-o"></i> <span className="nav-label">*/}
          {/*メッセージ一覧</span></Link>*/}
          {/*</li>*/}
          <li
            className={activeRoute(
              ['/contacts', '/contact', '/contact/reply'],
              this.props.location.pathname
            )}
          >
            <Link to="/contacts">
              <i className="fa fa-envelope-o" />{' '}
              <span className="nav-label">List Contacts</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              ['/winner-auctions'],
              this.props.location.pathname
            )}
          >
            <Link to="/winner-auctions">
              <i className="fa fa-bookmark-o" />{' '}
              <span className="nav-label">List Winner Auctions</span>
            </Link>
          </li>
          <li
            className={activeRoute(
              ['/comment-users'],
              this.props.location.pathname
            )}
          >
            <Link to="/comment-users">
              <i className="fa fa-commenting-o" />{' '}
              <span className="nav-label">List Comments</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              ['/type-product-categories', '/type-product-category/create'],
              this.props.location.pathname
            )}
          >
            <Link to="/type-product-categories">
              <i className="fa fa-list-alt" />{' '}
              <span className="nav-label">List Categories</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              ['/admins', '/admin/create', '/admin/edit'],
              this.props.location.pathname
            )}
          >
            <Link to="/admins">
              <i className="fa fa-user-circle" />{' '}
              <span className="nav-label">List Admin</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              [
                '/type-contact-categories',
                '/type-contact-category/create',
                '/type-contact-category/edit'
              ],
              this.props.location.pathname
            )}
          >
            <Link to="/type-contact-categories">
              <i className="fa fa-compress" />{' '}
              <span className="nav-label">List Contacts</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              '/report-users',
              this.props.location.pathname
            )}
          >
            <Link to="/report-users">
              <i className="fa fa-flag-checkered" />{' '}
              <span className="nav-label">List Report Users</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              ['/chance-buy-users', '/log-user-chance-buy'],
              this.props.location.pathname
            )}
          >
            <Link to="/chance-buy-users">
              <i className="fa fa-cart-arrow-down" />{' '}
              <span className="nav-label">Buy History</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              '/history-auction-by-product',
              this.props.location.pathname
            )}
          >
            <Link to="/history-auction-by-product">
              <i className="fa fa-history" />{' '}
              <span className="nav-label">History Auction</span>
            </Link>
          </li>

          <li
            className={activeRoute(
              '/log-user-point',
              this.props.location.pathname
            )}
          >
            <Link to="/log-user-point">
              <i className="fa fa-pinterest-square" />{' '}
              <span className="nav-label">History Point</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
