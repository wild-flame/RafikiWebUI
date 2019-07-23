import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from 'react-router-dom'

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import ConsoleForm from "../../components/ConsoleForms/Form"

const styles = theme => ({
    block: {
        display: 'block',
    },
    addDS: {
        marginRight: theme.spacing.unit,
    },
    contentWrapper: {
        margin: '40px 16px',
        //position: "relative",
        minHeight: 200,
    },
})


class ListDataSet extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleHeaderTitleChange: PropTypes.func,
    }

    state = {}

    componentDidMount() {
        this.props.handleHeaderTitleChange("Dataset > New Dataset")
    }


    componentWillUnmount() {
        this.props.resetLoadingBar()
    }

    render() {
        const {
            classes,
        } = this.props;

        return (
            <React.Fragment>
                <MainContent>
                    <ContentBar>
                        <Toolbar>
                            <Grid container spacing={16} justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h5" gutterBottom> New Dataset </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </ContentBar>
                    <div className={classes.contentWrapper}>
                        <ConsoleForm>
                            
                        </ConsoleForm> 
                    </div>
                </MainContent>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    DatasetList: state.DatasetsReducer.DatasetList,
})

const mapDispatchToProps = {
    handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
    requestListDS: actions.requestListDS,
    resetLoadingBar: ConsoleActions.resetLoadingBar,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ListDataSet)
