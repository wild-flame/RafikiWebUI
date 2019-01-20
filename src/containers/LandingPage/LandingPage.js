import React, { Fragment } from 'react';
import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
import LandingProductHero from "../../components/LandingProductHero/LandingProductHero"
import LandingProductValues from "../../components/LandingProductValues/LandingProductValues"
import LandingProductCategories from "../../components/LandingProductCategories/LandingProductCategories"
import LandingProductHowItWorks from "../../components/LandingProductHowItWorks/LandingProductHowItWorks"

class LandingPage extends React.Component {
  render() {
    return (
      <Fragment>
        <LandingNavBar />
        <LandingProductHero />
        <LandingProductValues />
        <LandingProductCategories />
        <LandingProductHowItWorks />
      </Fragment>
    )
  }
}

export default LandingPage