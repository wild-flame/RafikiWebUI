import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LayoutBody from '../LandingComponents/LayoutBody';
import Typography from '../LandingComponents/Typography';

import '../LandingMainPage/Overview.css'


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
  },
})


function PubPage(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <LayoutBody className={classes.root} component="section" width="large">
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Publications
        </Typography>
        <div className="section_center">
          <div className="center__description">
          <p className="description__text">
<b>ForkBase: An Efficient Storage Engine for Blockchain and Forkable Applications </b>
Sheng Wang, Tien Tuan Anh Dinh, Qian Lin, Zhongle Xie, Meihui Zhang, Qingchao Cai, Gang Chen, Beng Chin Ooi, Pingcheng Ruan.
Int'l Conference on Very Large Data Bases (VLDB), 2018. [<a href="http://www.vldb.org/pvldb/vol11/p1137-wang.pdf" target="_blank" rel="noopener noreferrer"> paper </a>]
            </p>
          </div>
          <div className="center__description">
            <p className="description__text">
<b>UStore: A Distributed Storage With Rich Semantics </b>
Anh Dinh, Ji Wang, Sheng Wang, Gang Chen, Wei-Ngan Chin, Qian Lin, Beng Chin Ooi, Pingcheng Ruan, Kian-Lee Tan, Zhongle Xie, Hao Zhang, Meihui Zhang.
CoRR abs/1702.02799, 2017. [<a href="https://arxiv.org/pdf/1702.02799.pdf" target="_blank" rel="noopener noreferrer"> paper </a>]
            </p>
          </div>
        </div>
      </LayoutBody>
    </React.Fragment>
  );
}

export default withStyles(styles)(PubPage);
