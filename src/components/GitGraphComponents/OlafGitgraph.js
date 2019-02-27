/*
usage borrowed from gitgraph.js issue 195
https://github.com/nicoespeon/gitgraph.js/issues/195
*/
import React from 'react';
import PropTypes from 'prop-types';
import "gitgraph.js";
import "gitgraph.js/build/gitgraph.css";

import data from './data/metaData'

// plot gitgraph
var gitGraph = window.GitGraph;

// later read from props of the app
const datasetName = "ds-csv1"
const author = "Kaiyuan <yangkaiyuan@u.nus.edu>"

let nodes = []

for (let branch in data[datasetName]) {
  for (let node of data[datasetName][branch]) {
    nodes.push({ ...node, Branch: branch });
  }
}

var plottedVersions = [];

const plotBranch = (branchingFrom, node) => {
  if (plottedVersions.includes(node["Version"]))
    return "";
  plottedVersions.push(node["Version"]);

  const branch = node["Branch"];

  //dedupe
  nodes = nodes.filter(n => n["Version"] !== node["Version"]);

  let code = "";

  if (branchingFrom) {
    code += `const ${branch} = ${branchingFrom}.branch("${branch}");\n`;
  }

  code += `${branch}.commit({
    dotColor: "white",
    dotSize: 4,
    dotStrokeWidth: 8,
    message: '${node["Version"]}',
    onClick: (commit) => this.onCommitSelection(commit)
  });\n`;

  let children = nodes.filter(n => n["Parents"].includes(node["Version"]));

  let codeMiddle = "", codeEnd = "";
  for (const child of children) {
    const isDifferentBranch = child["Branch"] !== node["Branch"];
    if (isDifferentBranch)
      codeMiddle += plotBranch(branch, child);
    else
      codeEnd += plotBranch(false, child);
  }
  code += (codeMiddle + codeEnd);

  return code;
}

const masterRoot = nodes.find(n => n.Branch === "master" && n.Parents[0] === "<null>");
const finalCode = plotBranch("gitgraph", masterRoot);


export default class OlafGitgraph extends React.Component {
  constructor(props) {
    super(props);
    this.$gitgraph = React.createRef();

    this.myTemplateConfig = {
      // branches colors, 1 per column
      colors: [
        "#979797", // grey
        "#F85BB5", // pink
        "#008fb5", // cyan
        "#f1c109", // yellow
        "#8fb500" // green
      ],
      branch: {
        lineWidth: 4,
        spacingX: 50,
        showLabel: true,  // display branch names on graph
        labelRotation: 0
      },
      commit: {
        spacingY: -40,
        dot: {
          size: 10,
        },
        message: {
          display: true,
          displayAuthor: false, // later implement user control
          displayBranch: true,
          displayHash: false,
          font: "normal 10pt Arial"
        },
        /*
        shouldDisplayTooltipsInCompactMode: false, // default = true
        tooltipHTMLFormatter: function ( commit ) {
          return "[" + commit.sha1 + "]: " + commit.message;
        },
        */
      }
    }
  }

  onCommitSelection = (commit) => {
    alert("You clicked on commit " + commit.sha1)
  }

  componentDidMount() {
    const gitgraph = new gitGraph({
      template: this.myTemplateConfig,
      reverseArrow: false,
      canvas: this.$gitgraph.current,
      //orientation: "horizontal",
      //mode: "compact",
      author: author
    })

    gitgraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
      this.style.cursor = "pointer"
    })

    gitgraph.canvas.addEventListener("commit:mouseout", function (event) {
      this.style.cursor = "auto"
    })
    // eslint-disable-next-line
    eval(finalCode);
  }

  render() {
    return <canvas ref={this.$gitgraph} />;
  }
}
