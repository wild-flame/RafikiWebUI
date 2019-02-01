import React from 'react';
import PropTypes from 'prop-types';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from "../../HTTPConfig"
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/ConsoleHeader/Header';


const styles = theme => ({
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1', // light grey
  },
})

class ConsoleOverviewContent extends React.Component {
  state = {
    ResultLoading: false,
    apiRes: "",
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

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
    const { classes } = this.props;
    console.log(this.state.apiRes)
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.handleDrawerToggle}
          title={"Database Overview"}
          Tab1={"Info"}
          Tab2={""}
        />
        <main className={classes.mainContent}>
          <pre>{this.state.apiRes}</pre>
        </main>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(ConsoleOverviewContent)
