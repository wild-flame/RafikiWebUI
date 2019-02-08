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


class BranchName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    dsList: PropTypes.array,
    checkedNewDataset: PropTypes.bool,
    checkedNewBranch: PropTypes.bool,
    dataset: PropTypes.string,
    branch: PropTypes.string,
    newBranch: PropTypes.string,
    referBranch: PropTypes.string,
    onHandleChange: PropTypes.func,
    BranchState: PropTypes.string,
    onHandleSwitch: PropTypes.func,
    AllowNewBranch: PropTypes.bool
  }

  render() {
    const {
      classes,
      title,
      dsList,
      checkedNewDataset,
      checkedNewBranch,
      dataset,
      branch,
      newBranch,
      referBranch,
      onHandleChange,
      BranchState,
      onHandleSwitch,
      AllowNewBranch
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
              id="existing-branch-names"
              select
              label="Default is master"
              className={classes.textField}
              value={!checkedNewBranch && branch}
              onChange={onHandleChange(BranchState)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your branch"
              margin="normal"
              disabled={checkedNewBranch}
            >
              {dataset
                ? (dsList.filter(item => item.dataset === dataset)[0]
                    .branches.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))
                )
                : (
                  <MenuItem value={"master"}>
                    {"master"}
                  </MenuItem>
                )
              }
            </TextField>
          </Grid>
          {AllowNewBranch &&
          <React.Fragment>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    disabled={checkedNewDataset}
                    checked={checkedNewBranch}
                    onChange={onHandleSwitch("checkedNewBranch")}
                    value="checkedNewBranch"
                  />
                }
                label="Create new branch"
              />
            </Grid>
            <Grid item>
              <TextField
                id="new-branch-name"
                label="New Branch"
                className={classes.textField}
                value={newBranch}
                onChange={onHandleChange("newBranch")}
                margin="normal"
                disabled={checkedNewDataset || !checkedNewBranch}
              />              
            </Grid>
            <Grid item>
              <TextField
                id="refer-branch-names"
                select
                label="Refer Branch"
                className={classes.textField}
                value={!checkedNewDataset && checkedNewBranch && referBranch}
                onChange={onHandleChange("referBranch")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select a refer branch"
                margin="normal"
                disabled={!checkedNewBranch}
              >
                {dataset
                  ? (dsList.filter(item => item.dataset === dataset)[0]
                      .branches.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))
                  )
                  : (
                    <MenuItem value={"master"}>
                      {"master"}
                    </MenuItem>
                  )
                }
              </TextField>
            </Grid>
          </React.Fragment>
          }
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(BranchName)