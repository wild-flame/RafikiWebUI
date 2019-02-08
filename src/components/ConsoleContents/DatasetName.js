import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';


const styles = theme => ({
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})


class DatasetName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    dsList: PropTypes.array,
    checkedNewDataset: PropTypes.bool,
    dataset: PropTypes.string,
    newDataset: PropTypes.string,
    onHandleChange: PropTypes.func,
    DatasetState: PropTypes.string,
    onHandleSwitch: PropTypes.func,
    AllowNewDataset: PropTypes.bool
  }

  render() {
    const {
      classes,
      title,
      dsList,
      checkedNewDataset,
      dataset,
      newDataset,
      onHandleChange,
      DatasetState,
      onHandleSwitch,
      AllowNewDataset
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom align="center">
          {title}
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <TextField
              id="existing-dataset-names"
              select
              label="Select from datasets"
              className={classes.textField}
              value={!checkedNewDataset && dataset}
              onChange={onHandleChange(DatasetState)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your dataset"
              margin="normal"
              disabled={checkedNewDataset}
            >
              {dsList.map(option => (
                <MenuItem key={option.dataset} value={option.dataset}>
                  {option.dataset}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {AllowNewDataset &&
          <React.Fragment>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkedNewDataset}
                    onChange={onHandleSwitch("checkedNewDataset")}
                    value="checkedNewDataset"
                  />
                }
                label="Create new dataset"
              />
            </Grid>
            <Grid item>
              <TextField
                id="new-dataset-name"
                label="New Dataset"
                className={classes.textField}
                value={newDataset}
                onChange={onHandleChange("newDataset")}
                margin="normal"
                disabled={!checkedNewDataset}
              />              
            </Grid>
          </React.Fragment>
          }
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(DatasetName)