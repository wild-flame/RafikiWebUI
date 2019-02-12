import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';
import Checkbox from "@material-ui/core/Checkbox";


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


class RowEntryName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    EntryArray: PropTypes.array,
    checkedNewEntry: PropTypes.bool,
    entry: PropTypes.string,
    onHandleChange: PropTypes.func,
    RowEntryState: PropTypes.string,
    onHandleSwitch: PropTypes.func,
    disabled: PropTypes.bool,
    AllowNewEntry: PropTypes.bool
  }

  render() {
    const {
      classes,
      title,
      EntryArray,
      checkedNewEntry,
      entry,
      onHandleChange,
      RowEntryState,
      onHandleSwitch,
      disabled,
      AllowNewEntry
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom align="center">
          {title}
        </Typography>
        {AllowNewEntry &&
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={checkedNewEntry}
                    onChange={onHandleSwitch("checkedNewEntry")}
                    value="checkedNewEntry"
                  />
                }
                label="Create new entry"
              />
            </Grid>
          </Grid>
        }
          {checkedNewEntry
            ? (
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  id="new-entry-name"
                  label="New Row Entry"
                  className={classes.textField}
                  value={entry}
                  onChange={onHandleChange("entry")}
                  margin="normal"
                />              
              </Grid>
            </Grid>
            )
            : (
            <React.Fragment>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!disabled}
                      value="checkedRowEntriesLoaded"
                    />
                  }
                  disabled={false}
                  label="Row Entries Loaded"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  id="existing-entry-names"
                  select
                  label="Select row entry"
                  className={classes.textField}
                  value={!checkedNewEntry && entry}
                  onChange={onHandleChange(RowEntryState)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select from row entries"
                  margin="normal"
                  disabled={disabled}
                >
                  {EntryArray.map((entry, index) => (
                    <MenuItem key={index} value={entry}>
                      {entry}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            </React.Fragment>
            )
          }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RowEntryName)