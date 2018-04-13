import React, { Component } from 'react';
import { TableContactsRow } from '../../components/common/index';
import { connect } from 'react-redux';
import { getContacts, onUnLoad } from '../../actions/contactActions';
import Pagination from 'react-js-pagination';
import { RANGER_PAGINATION } from '../../constants/common';

const mapStateToProps = state => ({
  contacts: state.contact.contacts,
  total: state.contact.total,
  limit: state.contact.limit,
  page: state.contact.page,
  pages: state.contact.pages
});

const mapDispatchToProps = dispatch => ({
  onLoad: page => dispatch(getContacts(page)),
  onUnLoad: () => dispatch(onUnLoad())
});

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnLoad();
  }

  handlePageChange(pageNumber) {
    this.props.onLoad(pageNumber);
  }

  render() {
    const { contacts, limit, page } = this.props;

    if (!contacts) {
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

    const ListContacts = contacts.map((contact, index) => (
      <TableContactsRow
        key={contact._id}
        page={page}
        limit={limit}
        index={index}
        {...contact}
      />
    ));

    // paginate
    let Paginate = <h1>No Data.</h1>;
    if (contacts.length > 0) {
      Paginate = (
        <Pagination
          activePage={parseInt(this.props.page)}
          itemsCountPerPage={this.props.limit}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={
            this.props.pages > 10 ? RANGER_PAGINATION : this.props.pages
          }
          onChange={::this.handlePageChange}
        />
      );
    }

    return (
      <div className="wrapper wrapper-content animated">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center m-t-lg">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-condensed">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Contents</th>
                      <th className="text-center">CreatedAt</th>
                      <th className="text-center">DeletedAt</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{ListContacts}</tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-12 text-center">{Paginate}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
