import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "./actions"

import Button from "@material-ui/core/Button";

class BoilerPlate extends React.Component {
  static propTypes = {
    handleButtonClick: PropTypes.func.isRequired,
    tooMuchBoilerPlate: PropTypes.string.isRequired
  };

  render() {
    const {
      handleButtonClick,
      tooMuchBoilerPlate
    } = this.props;

    return (
      <Button
        color="primary"
        onClick={
          handleButtonClick
        }
        variant="contained"
      >
        BoilerPlate, {tooMuchBoilerPlate}
      </Button>
    )
  }
}

const mapStateToProps = state => ({
  tooMuchBoilerPlate: state.BoilerPlate.tooMuchBoilerPlate
})

const mapDispatchToProps = {
  handleButtonClick: actions.boilerplateActionDemo
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoilerPlate);
