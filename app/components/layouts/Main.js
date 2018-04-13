import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Navigation, Footer, TopHeader } from './partials/index';
import { correctHeight, detectBody } from '../../helpers/Helpers';
import agent from '../../agent';
import { appRedirect, appLoad } from '../../actions/commonActions';
import { getAuctions } from '../../actions/auctionActions';
import { getProducts } from '../../actions/productActions';
import { getUsers } from '../../actions/userActions';
import { getCampaigns } from '../../actions/campaignActions';
import { getReviews } from '../../actions/reviewActions';
import { getMessages } from '../../actions/messageActions';
import { getContacts } from '../../actions/contactActions';
import { getAuctionWinners } from '../../actions/auctionWinnerActions';
import { getUserComments } from '../../actions/userCommentActions';
import { getCategories } from '../../actions/productCategoryActions';
import { getConditions } from '../../actions/conditionActions';
import { getContactCategories } from '../../actions/contactCategoryActions';
import { getUserReports } from '../../actions/userReportActions';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  redirectTo: state.common.redirectTo,
  pageProduct: state.product.page,
  pageAuction: state.auctions.page,
  pageUser: state.users.page,
  pageCampaign: state.campaigns.page,
  pageReview: state.review.page,
  pageMessage: state.messages.page,
  pageContact: state.contact.page,
  pageUserComment: state.userComment.page,
  pageProductCategory: state.productCategory.page,
  pageCondition: state.conditions.page,
  pageContactCategory: state.contactCategory.page,
  pageUserReport: state.userReport.page,
  pageAuctionWinner: state.auctionWinner.page
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch(appRedirect()),
  onLoad: token => dispatch(appLoad(token)),
  onLoadProducts: page => dispatch(getProducts(page)),
  onLoadAuctions: page => dispatch(getAuctions(page)),
  onLoadUsers: page => dispatch(getUsers(page)),
  onLoadCampaigns: page => dispatch(getCampaigns(page)),
  onLoadReview: page => dispatch(getReviews(page)),
  onLoadMessages: page => dispatch(getMessages(page)),
  onLoadContacts: page => dispatch(getContacts(page)),
  onLoadAuctionWinner: page => dispatch(getAuctionWinners(page)),
  onLoadUserComment: page => dispatch(getUserComments(page)),
  onLoadProductCategory: page => dispatch(getCategories(page)),
  onLoadConditions: page => dispatch(getConditions(page)),
  onLoadContactCategory: page => dispatch(getContactCategories(page)),
  onLoadUserReport: page => dispatch(getUserReports(page))
});

class Main extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();

      if (nextProps.redirectTo === '/products') {
        this.props.onLoadProducts(nextProps.pageProduct);
      }
      if (nextProps.redirectTo === '/auctions') {
        this.props.onLoadAuctions(this.props.pageAuction);
      }

      if (nextProps.redirectTo === '/users') {
        this.props.onLoadUsers(this.props.pageUser);
      }

      if (nextProps.redirectTo === '/campaigns') {
        this.props.onLoadCampaigns(this.props.pageCampaign);
      }

      if (nextProps.redirectTo === '/reviews') {
        this.props.onLoadReview(this.props.pageReview);
      }

      if (nextProps.redirectTo === '/messages') {
        this.props.onLoadMessages(this.props.pageMessage);
      }

      if (nextProps.redirectTo === '/conditions') {
        this.props.onLoadConditions(this.props.pageCondition);
      }

      if (nextProps.redirectTo === '/contacts') {
        this.props.onLoadContacts(this.props.pageContact);
      }

      if (nextProps.redirectTo === '/auctionWinners') {
        this.props.onLoadAuctionWinner(this.props.pageAuctionWinner);
      }

      if (nextProps.redirectTo === '/user-comments') {
        this.props.onLoadUserComment(this.props.pageUserComment);
      }

      if (nextProps.redirectTo === '/product-categories') {
        this.props.onLoadProductCategory(this.props.pageProductCategory);
      }

      if (nextProps.redirectTo === '/contact-categories') {
        this.props.onLoadContactCategory(this.props.pageContactCategory);
      }

      if (nextProps.redirectTo === '/user-reports') {
        this.props.onLoadUserReport(this.props.pageUserReport);
      }
    }
  }

  render() {
    let wrapperClass = 'gray-bg ' + this.props.location.pathname;
    return (
      <div id="wrapper">
        <Progress />
        <Navigation location={this.props.location} />

        <div id="page-wrapper" className={wrapperClass}>
          <TopHeader />

          {this.props.children}

          <Footer />
        </div>
      </div>
    );
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
      this.props.onLoad(token);
    }
  }

  componentDidMount() {
    // Run correctHeight function on load and resize window event
    $(window).bind('load resize', function() {
      correctHeight();
      detectBody();
    });

    // Correct height of wrapper after metisMenu animation.
    $('.metismenu a').click(() => {
      setTimeout(() => {
        correctHeight();
      }, 300);
    });
  }
}

Main.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
