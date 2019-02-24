import React from 'react';
import PropTypes from 'prop-types';

//import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";



class UploadProgressBar extends React.Component {
  static propTypes = {
    percentCompleted: PropTypes.number,
    fileName: PropTypes.string
  }

  render() {
    const {
      percentCompleted,
      fileName
    } = this.props

    return (
      <React.Fragment>
        {percentCompleted !== 0 &&
          <Grid container direction="row" spacing={16} justify="space-between" alignItems="center">
            <Grid item xs={9} container direction="row" spacing={16}>
              <Progress
                theme={
                  {
                    error: {
                      symbol: " ",
                      trailColor: 'pink',
                      color: 'red'
                    },
                    active: {
                      symbol: "",
                      //trailColor: 'yellow',
                      color: 'orange'
                    },
                    success: {
                      symbol: "",
                      //trailColor: 'lime',
                      color: 'green'
                    }
                  }
                }
                percent={percentCompleted}
                //status={isNaN(NumPart) ? "active" : StorageBarStatus}
              />
              <p>{fileName} uploaded!!!</p>
            </Grid>
          </Grid>
        }
      </React.Fragment>
    )
  }
}

export default UploadProgressBar 
