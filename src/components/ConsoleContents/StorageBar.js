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
    // StorageSize comes from DBSize, initial value = "...loading"
    const { StorageSize, StorageBarStatus } = this.props

    // parse the StorgaeSize string (eg 1.45MB, or 763.9KB) into number and unit
    // const NumPart = Math.floor(parseFloat(StorageSize) / 10.24)
    const NumPart = parseFloat(StorageSize)
    const UnitPart = StorageSize.replace(/[0-9.]/g, '')
    console.log(NumPart, UnitPart) // MB KB

    let PercentNum = 1
    
    if (isNaN(NumPart) || NumPart === 0) {
      PercentNum = 1
    } else {
      switch(UnitPart) {
        case "B" :
        case "KB" :
          // concert to 100% scale from 1-1024
          PercentNum = NumPart < 10.24
            ? 1
            : Math.floor(NumPart / 10.24)
          break
        case "MB" :
          // re-scale for a total size of 10MB
          PercentNum = NumPart * 10
          break
        default :
          PercentNum = NumPart < 10.24
            ? 1
            : Math.floor(NumPart / 10.24)
          break
      }
    }

    return (
      <AppBar position="static" color="primary" style={{ zIndex: 1 }}>
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
                  {isNaN(NumPart)
                    ? StorageSize
                    : `${NumPart} ${UnitPart}`
                  }
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