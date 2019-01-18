import React, { Fragment } from 'react';
import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
import LandingProductHero from "../../components/LandingProductHero/LandingProductHero"

class LandingPage extends React.Component {
  render() {
    return (
      <Fragment>
        <LandingNavBar />
        <LandingProductHero />
      </Fragment>
    )
  }
}

export default LandingPage