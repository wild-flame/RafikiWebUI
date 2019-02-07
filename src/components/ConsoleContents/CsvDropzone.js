import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Dropzone from 'react-dropzone'


const styles = theme => ({
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  contentWrapper: {
    margin: '10px 16px',
  }
})

// for file dropzone
const baseStyle = {
  width: 300,
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
  }

  render() {
    const {
      classes,
      onCsvDrop
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
                  {isDragAccept ? 'Drop' : 'Drag'} files here...
                </div>
                {isDragReject && <div>Unsupported file type...</div>}
              </div>
            )
          }}
        </Dropzone>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(CsvDropzone)
