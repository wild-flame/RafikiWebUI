import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";



class StorageBar extends React.Component {
  static propTypes = {
    StorageSize: PropTypes.string,
    StorageBarStatus: PropTypes.string
  }

  render() {
    const { StorageSize, StorageBarStatus } = this.props

    const NumPart = Math.floor(parseFloat(StorageSize) / 10.24)

    let PercentNum = 1
    
    if (isNaN(NumPart) || NumPart === 0) {
      PercentNum = 1
    } else {
      PercentNum = NumPart
    }

    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container direction="row" spacing={16} justify="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6" color="inherit">
                Storage Size:
              </Typography>
            </Grid>
            <Grid item xs={9} container direction="row" spacing={16}>
              <Grid item xs={8}>
                <Progress
                  theme={
                    {
                      error: {
                        symbol: " ",
                        trailColor: 'pink',
                        color: 'red'
                      },
                      active: {
                        symbol: " ",
                        //trailColor: 'yellow',
                        color: 'orange'
                      },
                      success: {
                        symbol: " ",
                        //trailColor: 'lime',
                        color: 'green'
                      }
                    }
                  }
                  percent={PercentNum}
                  status={isNaN(NumPart) ? "active" : StorageBarStatus}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" color="inherit">
                  {StorageSize}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default StorageBar