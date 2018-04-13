import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getLogFriend, onUnLoadLogFriend } from '../../actions/userActions';
import { checkUndefined } from '../../helpers/Helpers';
import TableLogFriendRows from '../../components/common/TableLogFriendRows';

const mapStateToProps = state => ({
  friends: state.users.friends
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getLogFriend(id)),
  onUnload: () => dispatch(onUnLoadLogFriend())
});

class LogUserFriend extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoad(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { friends } = this.props;
    const marginTop = { 'margin-top': '15px' };

    if (!friends) {
      return (
        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>I have no friends.</h1>
            </div>
          </div>
        </div>
      );
    }

    let ListLogFriend = null;
    if (
      friends.friends !== undefined &&
      friends.friends !== null &&
      Array.isArray(friends.friends) === true
    ) {
      ListLogFriend = friends.friends.map((friend, index) => (
        <TableLogFriendRows key={index} index={index} {...friend.user} />
      ));
    }

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <h1>
                {friends.user ? checkUndefined(friends.user.nickname) : null}
              </h1>
              <hr />

              <div className="col-lg-6 col-md-6 col-xs-12">
                <label>Total Normal Friend:</label>
                <p>{checkUndefined(friends.totalNormalFriend)}</p>
              </div>

              <div className="col-lg-6 col-md-6 col-xs-12">
                <label>Total Good Friend:</label>
                <p>{checkUndefined(friends.totalGoodFriend)}</p>
              </div>

              <div className="col-lg-6 col-md-6 col-xs-12">
                <label>Total Best Friend:</label>
                <p>{checkUndefined(friends.totalBestFriend)}</p>
              </div>

              <div className="col-lg-6 col-md-6 col-xs-12" style={marginTop}>
                <label>Total Friend:</label>
                <p>{checkUndefined(friends.totalFriend)}</p>
              </div>

              <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                  <tr>
                    <th className="text-center">No.</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Nickname</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Vefiried</th>
                    <th className="text-center">Block Status</th>
                    <th className="text-center">DeletedAt</th>
                  </tr>
                </thead>
                <tbody>{ListLogFriend}</tbody>
              </table>

              <div className="col-lg-12 col-md-12" style={marginTop}>
                <Link
                  to={`/user/${friends.user._id}`}
                  className="btn btn-md btn-default"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFriend);
