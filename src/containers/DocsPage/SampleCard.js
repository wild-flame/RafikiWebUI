import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const styles = {
  card: {
    maxWidth: "100%",
  },
};

function MediaCard(props) {
  const { classes } = props;
  const codeString = 'ustore list-dataset';
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h1">
          List Dataset
        </Typography>
        <Typography component="p">
          Displays the datasets in list form
        </Typography>
        <br />
        <Typography variant="subtitle2" gutterBottom>
          Syntax
        </Typography>
        <Typography component="p">
          Displays the datasets in list form
        </Typography>
        <SyntaxHighlighter language='javascript' style={gruvboxDark}>
          {codeString}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
