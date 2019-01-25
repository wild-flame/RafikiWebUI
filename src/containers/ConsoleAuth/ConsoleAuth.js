import React from 'react';
// import PropTypes from 'prop-types';
import axios from "axios"
import AddUserCard from "../../components/ConsoleAddUserCard/AddUserCard"


class ConsoleAuth extends React.Component {
  state = {
    apiRes: ""
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/api/list_key").then(res => {
      this.setState({
        apiRes: res.data
      });
    });

  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.apiRes.list_key_output}</h1>
        <AddUserCard />
      </React.Fragment>

    )
  }
}


export default ConsoleAuth
