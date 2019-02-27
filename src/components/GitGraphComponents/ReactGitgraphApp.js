/*
from reat-gitgraph example
https://github.com/iozbeyli/react-gitgraph/blob/master/example/src/example.js
*/
import React, { Component } from 'react';

import ReactGitGraph from "./ReactGitGraph"
import OlafGitgraph from "./OlafGitgraph"


class App extends Component {
  constructor(props){
    super(props);
    this.initializeGraph = this.initializeGraph.bind(this);
    this.onChangeGraph = this.onChangeGraph.bind(this);
  }

  onChangeGraph(){
    this.gitgraph.getGitGraph().commit();
  }

  initializeGraph(gitgraph){
    let master = gitgraph.branch("master");
    gitgraph.commit().commit().commit();         // 3 commits upon HEAD
    let develop = gitgraph.branch("develop");    // New branch from HEAD
    let myfeature = develop.branch("myfeature"); // New branch from develop
    let hotfix = gitgraph.branch({
        parentBranch: develop,
        name: "hotfix",
        column: 2             // which column index it should be displayed in
    });
    gitgraph.commit({
      sha1: "666",
    }).commit().commit();
    master.commit({
      sha1: "666"
    }).commit().commit();
  };

  render() {
    return (
      <div style={{width: 50}}>
        <h2>try out gitgraph Jan 16th 2019</h2>
        <ReactGitGraph
          initializeGraph={this.initializeGraph}
          options={{
            template: "metro",
            reverseArrow: false,
            //orientation: "horizontal",
            //mode: "compact"
          }} 
        />
        <button onClick={this.onChangeGraph}>Change</button>
      </div>
    );
  }
}

export default App;
