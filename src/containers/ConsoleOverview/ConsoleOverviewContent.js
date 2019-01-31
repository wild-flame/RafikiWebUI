import React from 'react';
import PropTypes from 'prop-types';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from "../../HTTPConfig"


class ConsoleOverviewContent extends React.Component {
  state = {
    ResultLoading: false,
    apiRes: ""
  }

  async componentDidMount() {
    await this.loadDBInfo()
  }

  async loadDBInfo() {
    await this.setState({
      ResultLoading: true,
    });
    // send a GET request
    try {
      const DBInfo = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}api/info`,
      });
      await this.setState({
        ResultLoading: false,
        apiRes: DBInfo.data.DBInfo,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        ResultLoading: false,
      });
    }
  }

  render() {
    console.log(this.state.apiRes)
    return (
      <React.Fragment>
        <pre>{this.state.apiRes}</pre>
      </React.Fragment>
    )
  }
}


export default ConsoleOverviewContent
