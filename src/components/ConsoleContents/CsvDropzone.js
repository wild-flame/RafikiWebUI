import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// File List
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Typography from '@material-ui/core/Typography';

import Tooltip from '@material-ui/core/Tooltip';

import Dropzone from 'react-dropzone'


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: 15
  }
})

// for file dropzone
const baseStyle = {
  width: "100%",
  maxWidth: 360,
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5,
  margin: "0 auto"
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};


class CsvDropzone extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onCsvDrop: PropTypes.func,
    files: PropTypes.array,
    onRemoveCSV: PropTypes.func
  }

  render() {
    const {
      classes,
      files,
      onCsvDrop,
      onRemoveCSV
    } = this.props;

    return (
      <React.Fragment>
        <Dropzone
          accept={"*.csv, text/csv, application/vnd.ms-excel"}
          onDrop={onCsvDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
            let styles = {...baseStyle}
            styles = isDragActive ? {...styles, ...activeStyle} : styles
            styles = isDragReject ? {...styles, ...rejectStyle} : styles

            return (
              <div
                {...getRootProps()}
                style={styles}
              >
                <input {...getInputProps()} />
                <div>
                  <br />
                  <br />
                  <Typography variant="body1" gutterBottom align="center">
                    {isDragAccept ? 'Drop' : 'Drag'} files here...
                  </Typography>
                </div>
                {isDragReject && <div>Unsupported file type...</div>}
              </div>
            )
          }}
        </Dropzone>
        <List
         subheader={<ListSubheader>CSV File:</ListSubheader>}
         className={classes.root}
        >
          {files.map(file => (
            <ListItem key={file.name}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  file.name.length > 25
                    ? (
                      <Tooltip title={file.name}>
                        <span>{file.name.slice(0,20)+"..."}</span>
                      </Tooltip>
                    )
                    : file.name
                }
                secondary={file.size + " bytes"}
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Delete"
                  onClick={onRemoveCSV}  
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(CsvDropzone)
