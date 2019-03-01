/*
usage borrowed from gitgraph.js issue 195
https://github.com/nicoespeon/gitgraph.js/issues/195
*/
import React from 'react';
import PropTypes from 'prop-types';
import "gitgraph.js";
import "gitgraph.js/build/gitgraph.css";

//import data from './data/metaData'

const author = "Kaiyuan <yangkaiyuan@u.nus.edu>"

// plot gitgraph
var gitGraph = window.GitGraph;



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
          displayAuthor: true, // later implement user control
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

  state = {
    finalCode: null,
  }

  static propTypes = {
    datasetSelected: PropTypes.string,
    branchesSelected: PropTypes.array,
    Response_Version_History: PropTypes.object,
    clearVersionHistory: PropTypes.func
  }

  onCommitSelection = (commit) => {
    console.log("You clicked on commit ", commit)
  }

  componentDidMount() {
    console.log("i am mounted, and i am olaf git graph")
    this.gitgraph = new gitGraph({
      template: this.myTemplateConfig,
      reverseArrow: false,
      canvas: this.$gitgraph.current,
      //orientation: "horizontal",
      //mode: "compact",
      author: author
    })

    this.gitgraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
      this.style.cursor = "pointer"
    })

    this.gitgraph.canvas.addEventListener("commit:mouseout", function (event) {
      this.style.cursor = "auto"
    })

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.datasetSelected) {
      const data = nextProps.Response_Version_History
      const datasetName = this.props.datasetSelected
      this.setState({finalCode: this.generatePlottingCode(data[datasetName])});
    }
  }

  componentWillUnmount() {
    console.log("olaf gitgraph unmount")
    this.props.clearVersionHistory()
  }

  plotGraph = () => {
    if(this.state.finalCode) {
      // eslint-disable-next-line
      const gitgraph = this.gitgraph;
      // eslint-disable-next-line
      eval(this.state.finalCode);
    }
  }

  generatePlottingCode = (dataset) => {
    let nodes = []

    for (let branch in dataset) {
      for (let node of dataset[branch]) {
        nodes.push({ ...node, Branch: branch });
      }
    }

    this.plottedVersions = [];
    const masterRoot = nodes.find(n => n.Branch === "master" && n.Parents[0] === "<null>")
    const finalCode = this.plotBranch("gitgraph", masterRoot, nodes)
    return finalCode
  }

  plotBranch = (branchingFrom, node, nodes) => {
    if (this.plottedVersions.includes(node["Version"]))
      return "";
    this.plottedVersions.push(node["Version"]);

    const branch = node["Branch"];

    //dedupe
    nodes = nodes.filter(n => n["Version"] !== node["Version"]);

    let code = "";

    if (branchingFrom) {
      code += `const _${branch} = ${branchingFrom}.branch("${branch}");\n`;
    }

    code += `_${branch}.commit({
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
        codeMiddle += this.plotBranch("_" + branch, child, nodes);
      else
        codeEnd += this.plotBranch(false, child, nodes);
    }
    code += (codeMiddle + codeEnd);

    return code;
  }

  render() {
    if(Object.keys(this.props.Response_Version_History).length > 0
      && this.props.datasetSelected)
    {
      console.log("OlafGitgraph received props: ", this.props)
      this.plotGraph()
    }
    return <canvas ref={this.$gitgraph} />;
  }
}
