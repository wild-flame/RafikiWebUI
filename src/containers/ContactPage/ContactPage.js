import React, { Fragment } from 'react';
import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
import LandingFooter from '../../components/LandingFooter/LandingFooter'


class DocsPage extends React.Component {
  render() {

    return (
      <Fragment>
        <LandingNavBar />
        <h1>HI</h1>
        <LandingFooter />
      </Fragment>
    )
  }
}


export default DocsPage