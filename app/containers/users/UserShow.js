import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUser, onUnload } from '../../actions/userActions';
import { checkUndefined, formatDate } from '../../helpers/Helpers';

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  onGet: id => dispatch(getUser(id)),
  onUnload: () => dispatch(onUnload())
});

class UserShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onGet(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { user } = this.props;
    const marginTop = { 'margin-top': '15px' };
    const marginLeft = { 'margin-left': '15px' };

    if (!user) {
      return (
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      );
    }

    const checkVerified = user.isVerified ? (
      <i className="fa fa-check" aria-hidden />
    ) : (
      <i className="fa fa-times" aria-hidden />
    );
    const checkBlocked = user.isBlocked ? (
      <i className="fa fa-check" aria-hidden />
    ) : (
      <i className="fa fa-times" aria-hidden />
    );

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>Show</h1>
              <hr />
              <div className="col-lg-12 col-md-12">
                <div className="col-lg-8 col-md-8">
                  <ul className="list-group">
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Nickname:</label>{' '}
                      {checkUndefined(user.nickname)}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">UId:</label>{' '}
                      {checkUndefined(user.uid)}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Email:</label>{' '}
                      {checkUndefined(user.email)}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">CreatedAt:</label>{' '}
                      {formatDate(user.createdAt)}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">UpdatedAt:</label>{' '}
                      {formatDate(user.updatedAt)}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Verified:</label>{' '}
                      {checkVerified}
                    </li>
                    <li className="list-group-item text-center">
                      <label className="pull-left left">Block Status:</label>{' '}
                      {checkBlocked}
                    </li>
                  </ul>
                  {user.address ? (
                    <ul className="list-group">
                      <li className="list-group-item text-center">
                        <label>Address:</label>
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Address:</label>{' '}
                        {checkUndefined(user.address.address)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">District:</label>{' '}
                        {checkUndefined(user.address.district)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Fullname:</label>{' '}
                        {checkUndefined(user.address.fullname)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Note:</label>{' '}
                        {checkUndefined(user.address.note)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Postal Code:</label>{' '}
                        <p>{checkUndefined(user.address.postcode)}</p>
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">City:</label>{' '}
                        {checkUndefined(user.address.province)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Street:</label>{' '}
                        {checkUndefined(user.address.street)}
                      </li>
                      <li className="list-group-item text-center">
                        <label className="pull-left left">Town:</label>{' '}
                        {checkUndefined(user.address.town)}
                      </li>
                    </ul>
                  ) : null}

                  <ul className="list-group">
                    <li className="list-group-item text-center">
                      <label>Action:</label>
                    </li>
                    <li className="list-group-item text-center">
                      <Link
                        to={`/log-user-coin-charge/${user._id}`}
                        className="btn btn-md btn-primary"
                        style={marginLeft}
                      >
                        User Coin Charge
                      </Link>
                      <Link
                        to={`/log-discount-ticket/${user._id}`}
                        className="btn btn-md btn-primary"
                        style={marginLeft}
                      >
                        List Discount Ticket
                      </Link>
                      <Link
                        to={`/log-product-favorite/${user._id}`}
                        className="btn btn-md btn-primary"
                        style={marginLeft}
                      >
                        Products Favorite
                      </Link>
                      <Link
                        to={`/log-friend/${user._id}`}
                        className="btn btn-md btn-primary"
                        style={marginLeft}
                      >
                        List Friends
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <img
                    src={
                      user.avatar && user.avatar.thumb
                        ? user.avatar.thumb
                        : 'img/avatar.png'
                    }
                    className="img-responsive img-thumbnail"
                    width={250}
                    height={250}
                    alt="No Image"
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12" style={marginTop}>
                <div className="col-lg-12 col-md-12" style={marginTop}>
                  <Link to="/users" className="btn btn-md btn-default">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
