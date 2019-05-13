import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
import LandingProductHero from "../../components/LandingProductHero/LandingProductHero"
import LandingProductValues from "../../components/LandingProductValues/LandingProductValues"
import LandingProductCategories from "../../components/LandingProductValues/LandingProductCategories"
import LandingProductCTA from '../../components/LandingProductCTA/LandingProductCTA'
import LandingFooter from '../../components/LandingFooter/LandingFooter'


class LandingPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object
  }

  componentDidMount() {
    //  Scrolling to top of page when component loads
    window.scrollTo(0,0);
  }

  render() {
    const { auth } = this.props
    return (
      <Fragment>
        <LandingNavBar auth={auth} />
        <LandingProductHero />
        <LandingProductValues />
        <LandingProductCategories />
        <LandingProductCTA />
        <LandingFooter />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(LandingPage)