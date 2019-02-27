/*
from https://github.com/iozbeyli/react-gitgraph/blob/master/src/GitGraph.js
*/
import React from 'react';
import PropTypes from 'prop-types';
import "gitgraph.js";
import "gitgraph.js/build/gitgraph.css";


var gitGraph = window.GitGraph;

export default class ReactGitGraph extends React.Component{
  constructor(props){
    super(props);
    this.state={
        gitgraph: null
    };
    this.commit = this.commit.bind(this);
  };

  componentDidMount() {
      // require('gitgraph.js/src/gitgraph.js');//For server side rendering
      let options = {
          ...this.props.options,
          canvas: this.canvas
      };
      let gitgraph = new gitGraph(options);
      this.props.initializeGraph(gitgraph);

      this.setState({
          gitgraph: gitgraph,
      });
  }

  getGitGraph(){
    return this.state.gitgraph;
  }

  initializeGraphInner(){
    let gitgraph = this.state.gitgraph;
    this.props.initializeGraph(gitgraph);
    this.setState({
      gitgraph: gitgraph
    })
  }

  commit(){
      let gitgraph = this.state.gitgraph;
      gitgraph.commit({
        onClick: function(commit) {
          console.log("Oh, you clicked my commit?!", commit);
        }
      });
      this.setState({
          gitgraph: gitgraph
      });
  }

  render(){
    return(
      <canvas id="gitGraph" ref={(canvas) => { this.canvas = canvas; }}  width="20" height="10" style={{width: 40, height: 30, border: "2px solid red"}}></canvas>
    );
  }
}

ReactGitGraph.propTypes = {
    options: PropTypes.object.isRequired,
    graph: PropTypes.object,
    gitgraph: PropTypes.object,
    initializeGraph: PropTypes.func.isRequired
};